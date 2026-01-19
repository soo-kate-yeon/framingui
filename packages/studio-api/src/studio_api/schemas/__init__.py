"""API schemas package."""

from studio_api.schemas.curated_theme import (
    CuratedThemeBase,
    CuratedThemeCreate,
    CuratedThemeList,
    CuratedThemeResponse,
    CuratedThemeUpdate,
)
from studio_api.schemas.project import (
    LayoutBreakpointCreate,
    LayoutBreakpointResponse,
    LayoutBreakpointUpdate,
    ProjectCreate,
    ProjectListResponse,
    ProjectResponse,
    ProjectSummary,
    ProjectUpdate,
)
from studio_api.schemas.project_settings import (
    ActiveThemeResponse,
    ProjectSettingsResponse,
    ProjectSettingsSuccessResponse,
    SetActiveThemeRequest,
)

__all__ = [
    "CuratedThemeBase",
    "CuratedThemeCreate",
    "CuratedThemeUpdate",
    "CuratedThemeResponse",
    "CuratedThemeList",
    "LayoutBreakpointCreate",
    "LayoutBreakpointResponse",
    "LayoutBreakpointUpdate",
    "ProjectCreate",
    "ProjectListResponse",
    "ProjectResponse",
    "ProjectSummary",
    "ProjectUpdate",
    "SetActiveThemeRequest",
    "ActiveThemeResponse",
    "ProjectSettingsResponse",
    "ProjectSettingsSuccessResponse",
]
