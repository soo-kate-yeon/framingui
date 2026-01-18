import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTheme } from '@/lib/api/presets';
import type { PresetCreate } from '@/lib/api/types';
import { PRESETS_QUERY_KEY } from './useThemes';

export function useCreateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PresetCreate) => createTheme(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRESETS_QUERY_KEY] });
    },
  });
}
