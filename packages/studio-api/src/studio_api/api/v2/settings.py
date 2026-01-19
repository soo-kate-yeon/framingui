"""API v2 routes for project settings.

Design-TAG: SPEC-MCP-001 natural language screen generation Settings API
Function-TAG: Settings router with active preset and project settings endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from studio_api.core.database import get_db
from studio_api.repositories.curated_theme import CuratedThemeRepository
from studio_api.repositories.project_settings import ProjectSettingsRepository
from studio_api.schemas.curated_theme import CuratedThemeResponse
from studio_api.schemas.project_settings import (
    ActiveThemeResponse,
    ProjectSettingsResponse,
    ProjectSettingsSuccessResponse,
    SetActiveThemeRequest,
)

router = APIRouter(prefix="/api/v2/settings", tags=["settings"])


@router.get("/active-theme", response_model=ActiveThemeResponse)
async def get_active_theme(
    project_path: str = Query(..., description="Path to the project directory"),
    db: AsyncSession = Depends(get_db),
) -> ActiveThemeResponse:
    """Get the currently active theme for a project.

    Returns the active theme if set, or null if no theme is configured
    for the specified project.

    Parameters:
    - project_path: Path to the project directory (required)

    Returns:
    - success: Always true for this endpoint
    - active_theme: The active theme or null
    """
    repository = ProjectSettingsRepository(db)
    theme = await repository.get_active_theme(project_path)

    if theme is None:
        return ActiveThemeResponse(success=True, active_theme=None)

    return ActiveThemeResponse(
        success=True,
        active_theme=CuratedThemeResponse.model_validate(theme),
    )


@router.put("/active-theme", response_model=ActiveThemeResponse)
async def set_active_theme(
    request: SetActiveThemeRequest,
    db: AsyncSession = Depends(get_db),
) -> ActiveThemeResponse:
    """Set the active theme for a project.

    Creates project settings if they don't exist, then sets the active theme.

    Parameters:
    - theme_id: ID of the theme to set as active
    - project_path: Path to the project directory

    Returns:
    - success: True if the operation succeeded
    - active_theme: The newly active theme

    Raises:
    - 404: Theme not found or inactive
    """
    # Verify theme exists and is active
    theme_repository = CuratedThemeRepository(db)
    theme = await theme_repository.get_by_id(request.theme_id)

    if theme is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Theme with id {request.theme_id} not found or inactive",
        )

    # Set the active theme
    settings_repository = ProjectSettingsRepository(db)
    await settings_repository.set_active_theme(request.project_path, request.theme_id)

    return ActiveThemeResponse(
        success=True,
        active_theme=CuratedThemeResponse.model_validate(theme),
    )


@router.get("/project", response_model=ProjectSettingsSuccessResponse)
async def get_project_settings(
    project_path: str = Query(..., description="Path to the project directory"),
    db: AsyncSession = Depends(get_db),
) -> ProjectSettingsSuccessResponse:
    """Get project settings for a specific project.

    Returns the full project settings including active theme, framework type,
    and timestamps.

    Parameters:
    - project_path: Path to the project directory (required)

    Returns:
    - success: Always true for this endpoint
    - settings: The project settings or null if not found
    """
    repository = ProjectSettingsRepository(db)
    settings = await repository.get_by_project_path(project_path)

    if settings is None:
        return ProjectSettingsSuccessResponse(success=True, settings=None)

    # Build response with nested preset
    settings_response = ProjectSettingsResponse.model_validate(settings)
    if settings.active_theme:
        settings_response.active_theme = CuratedThemeResponse.model_validate(
            settings.active_theme
        )

    return ProjectSettingsSuccessResponse(success=True, settings=settings_response)
