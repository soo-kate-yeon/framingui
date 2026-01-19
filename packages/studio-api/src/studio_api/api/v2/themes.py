"""API v2 routes for curated presets."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from studio_api.core.database import get_db
from studio_api.repositories.curated_theme import CuratedThemeRepository
from studio_api.schemas.curated_theme import (
    CuratedThemeCreate,
    CuratedThemeList,
    CuratedThemeResponse,
    CuratedThemeUpdate,
)
from studio_api.services.mcp_client import MCPClient

router = APIRouter(prefix="/api/v2/themes", tags=["themes"])


@router.get("/suggestions", response_model=list[CuratedThemeResponse])
async def get_theme_suggestions(
    context: str | None = Query(None, description="Optional context for suggestions"),
) -> list[CuratedThemeResponse]:
    """
    Get intelligent theme suggestions from MCP server.

    Falls back to default themes if MCP server unavailable.

    Parameters:
    - context: Optional context string to guide suggestions

    Returns:
    - List of suggested themes
    """
    try:
        async with MCPClient() as mcp_client:
            suggestions = await mcp_client.get_suggestions(context=context)
    except Exception:
        # Fallback to default themes on any error
        async with MCPClient() as mcp_client:
            suggestions = await mcp_client.get_default_themes()

    # Convert to response models
    return [CuratedThemeResponse.model_validate(theme) for theme in suggestions]


@router.get("", response_model=CuratedThemeList)
async def list_themes(
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum number of items to return"),
    category: str | None = Query(None, description="Filter by category"),
    tags: str | None = Query(None, description="Filter by tag"),
    db: AsyncSession = Depends(get_db),
) -> CuratedThemeList:
    """
    List all active curated themes with optional filtering and pagination.

    Parameters:
    - skip: Number of items to skip (for pagination)
    - limit: Maximum number of items to return
    - category: Optional category filter
    - tags: Optional tag filter
    """
    repository = CuratedThemeRepository(db)
    items, total = await repository.list(
        skip=skip, limit=limit, category=category, tags=tags
    )

    return CuratedThemeList(items=items, total=total, skip=skip, limit=limit)


@router.get("/{theme_id}", response_model=CuratedThemeResponse)
async def get_theme(
    theme_id: int,
    db: AsyncSession = Depends(get_db),
) -> CuratedThemeResponse:
    """
    Get a single curated theme by ID.

    Raises:
    - 404: Theme not found or inactive
    """
    repository = CuratedThemeRepository(db)
    theme = await repository.get_by_id(theme_id)

    if not theme:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Theme with id {theme_id} not found",
        )

    return CuratedThemeResponse.model_validate(theme)


@router.post("", response_model=CuratedThemeResponse, status_code=status.HTTP_201_CREATED)
async def create_theme(
    theme_data: CuratedThemeCreate,
    db: AsyncSession = Depends(get_db),
) -> CuratedThemeResponse:
    """
    Create a new curated theme.

    Parameters:
    - theme_data: Theme creation data

    Returns:
    - The created theme with generated ID and timestamps
    """
    repository = CuratedThemeRepository(db)
    theme = await repository.create(theme_data)

    return CuratedThemeResponse.model_validate(theme)


@router.patch("/{theme_id}", response_model=CuratedThemeResponse)
async def update_theme(
    theme_id: int,
    theme_data: CuratedThemeUpdate,
    db: AsyncSession = Depends(get_db),
) -> CuratedThemeResponse:
    """
    Update an existing curated theme.

    Only provided fields will be updated.

    Raises:
    - 404: Theme not found or inactive
    """
    repository = CuratedThemeRepository(db)
    theme = await repository.update(theme_id, theme_data)

    if not theme:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Theme with id {theme_id} not found",
        )

    return CuratedThemeResponse.model_validate(theme)


@router.delete("/{theme_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_theme(
    theme_id: int,
    db: AsyncSession = Depends(get_db),
) -> None:
    """
    Delete a curated theme (soft delete by setting is_active=False).

    Raises:
    - 404: Theme not found or already inactive
    """
    repository = CuratedThemeRepository(db)
    deleted = await repository.delete(theme_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Theme with id {theme_id} not found",
        )
