import { apiClient } from './client';
import type {
  Preset,
  PresetList,
  PresetCreate,
  PresetUpdate,
  PresetListParams,
} from './types';

const PRESETS_ENDPOINT = '/api/v2/themes';

export async function fetchThemes(params: PresetListParams = {}): Promise<PresetList> {
  const queryParams: Record<string, string | number | undefined> = {
    skip: params.skip,
    limit: params.limit,
    category: params.category,
    tags: params.tags,
  };
  return apiClient.get<PresetList>(PRESETS_ENDPOINT, { params: queryParams });
}

export async function fetchTheme(id: number): Promise<Preset> {
  return apiClient.get<Preset>(`${PRESETS_ENDPOINT}/${id}`);
}

export async function createTheme(data: PresetCreate): Promise<Preset> {
  return apiClient.post<Preset>(PRESETS_ENDPOINT, data);
}

export async function updateTheme(
  id: number,
  data: PresetUpdate
): Promise<Preset> {
  return apiClient.patch<Preset>(`${PRESETS_ENDPOINT}/${id}`, data);
}

export async function deleteTheme(id: number): Promise<void> {
  return apiClient.delete(`${PRESETS_ENDPOINT}/${id}`);
}

export async function fetchPresetSuggestions(
  context?: string
): Promise<Preset[]> {
  const params: Record<string, string | undefined> = context ? { context } : {};
  return apiClient.get<Preset[]>(`${PRESETS_ENDPOINT}/suggestions`, { params });
}
