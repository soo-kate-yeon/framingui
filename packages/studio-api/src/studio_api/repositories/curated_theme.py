"""Repository for CuratedTheme database operations."""

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from studio_api.models.curated_theme import CuratedTheme
from studio_api.schemas.curated_theme import CuratedThemeCreate, CuratedThemeUpdate


class CuratedThemeRepository:
    """Repository for managing CuratedTheme database operations."""

    def __init__(self, session: AsyncSession):
        """Initialize repository with database session."""
        self.session = session

    async def get_by_id(self, theme_id: int) -> CuratedTheme | None:
        """
        Get a theme by ID (only active themes).

        Args:
            theme_id: The ID of the theme to retrieve.

        Returns:
            The theme if found and active, None otherwise.
        """
        result = await self.session.execute(
            select(CuratedTheme)
            .where(CuratedTheme.id == theme_id)
            .where(CuratedTheme.is_active == True)  # noqa: E712
        )
        return result.scalar_one_or_none()

    async def list(
        self,
        skip: int = 0,
        limit: int = 100,
        category: str | None = None,
        tags: str | None = None,
    ) -> tuple[list[CuratedTheme], int]:
        """
        List themes with optional filtering and pagination.

        Args:
            skip: Number of items to skip for pagination.
            limit: Maximum number of items to return.
            category: Optional category filter.
            tags: Optional tag filter (single tag string).

        Returns:
            Tuple of (list of themes, total count matching filters).
        """
        # Build base query for active themes only
        query = select(CuratedTheme).where(CuratedTheme.is_active == True)  # noqa: E712

        # Apply category filter
        if category:
            query = query.where(CuratedTheme.category == category)

        # Execute query to get all matching themes
        result = await self.session.execute(query)
        all_items = list(result.scalars().all())

        # Apply tag filter in Python (database-agnostic approach)
        if tags:
            all_items = [item for item in all_items if tags in (item.tags or [])]

        # Get total count after filtering
        total = len(all_items)

        # Apply pagination in Python
        items = all_items[skip : skip + limit]

        return items, total

    async def create(self, theme_data: CuratedThemeCreate) -> CuratedTheme:
        """
        Create a new theme.

        Args:
            theme_data: The theme data to create.

        Returns:
            The created theme with generated ID and timestamps.
        """
        theme = CuratedTheme(**theme_data.model_dump())
        self.session.add(theme)
        await self.session.refresh(theme)
        return theme

    async def update(
        self, theme_id: int, theme_data: CuratedThemeUpdate
    ) -> CuratedTheme | None:
        """
        Update an existing theme.

        Args:
            theme_id: The ID of the theme to update.
            theme_data: The update data (only provided fields will be updated).

        Returns:
            The updated theme if found, None otherwise.
        """
        theme = await self.get_by_id(theme_id)
        if not theme:
            return None

        # Update only provided fields
        update_dict = theme_data.model_dump(exclude_unset=True)
        for field, value in update_dict.items():
            setattr(theme, field, value)

        await self.session.commit()
        await self.session.refresh(theme)
        return theme

    async def delete(self, theme_id: int) -> bool:
        """
        Soft delete a theme by setting is_active=False.

        Returns True if theme was found and deleted, False otherwise.
        """
        theme = await self.get_by_id(theme_id)
        if not theme:
            return False

        theme.is_active = False
        await self.session.commit()
        return True
