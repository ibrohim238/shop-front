import { getCategories } from "@/admin/services/CategoryService.ts";
import type { Option } from "@/components/MultiSelectComponent.tsx";

export function useCategories() {
  const limit = 15;

  const loadCategories = async (
    inputValue: string,
    _loadedOptions: Option<number>[],
    additional: { page: number }
  ): Promise<{
    options: Option<number>[];
    hasMore: boolean;
    additional: { page: number };
  }> => {
    try {
      const res = await getCategories(additional.page, limit, { name: inputValue });
      return {
        options:
          res.data?.map(item => ({
            value: item.id,
            label: `${item.id} - ${item.name}`,
          })) || [],
        hasMore: additional.page < res.meta.last_page,
        additional: { page: additional.page + 1 },
      };
    } catch {
      return {
        options: [],
        hasMore: false,
        additional: { page: additional.page },
      };
    }
  };

  return { loadCategories };
}