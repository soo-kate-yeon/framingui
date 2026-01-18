import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTheme } from '@/lib/api/presets';
import type { PresetUpdate } from '@/lib/api/types';
import { PRESETS_QUERY_KEY } from './useThemes';

export function useUpdateTheme(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PresetUpdate) => updateTheme(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRESETS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PRESETS_QUERY_KEY, id] });
    },
  });
}
