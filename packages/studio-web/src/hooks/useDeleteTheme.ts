import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTheme } from '@/lib/api/presets';
import { PRESETS_QUERY_KEY } from './useThemes';

export function useDeleteTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTheme(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRESETS_QUERY_KEY] });
    },
  });
}
