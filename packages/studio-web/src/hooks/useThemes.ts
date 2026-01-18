import { useQuery } from '@tanstack/react-query';
import { fetchThemes } from '@/lib/api/presets';
import type { PresetListParams } from '@/lib/api/types';

export const PRESETS_QUERY_KEY = 'presets';

export function useThemes(params: PresetListParams = {}) {
  return useQuery({
    queryKey: [PRESETS_QUERY_KEY, params],
    queryFn: () => fetchThemes(params),
  });
}
