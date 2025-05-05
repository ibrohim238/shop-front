import { useCallback } from 'react'
import { getCategories } from "@/admin/services/CategoryService.ts"
import type { Option, AsyncResult } from "@/components/MultiSelectComponent.tsx"

export function useCategories() {
  const limit = 15

  const loadCategories = useCallback(
    async (
      inputValue: string,
      _loadedOptions: Option<number>[],
      additional: { page: number }
    ): Promise<AsyncResult<number>> => {
      try {
        const res = await getCategories(
          additional.page,
          limit,
          { name: inputValue }
        )
        return {
          options: res.data?.map(item => ({
            value: item.id,
            label: `${item.id} - ${item.name}`,
          })) || [],
          hasMore: additional.page < res.meta.last_page,
          additional: { page: additional.page + 1 },
        }
      } catch {
        return {
          options: [],
          hasMore: false,
          additional: { page: additional.page },
        }
      }
    },
    [] // ссылка на функцию теперь стабильна и не меняется между рендерами
  )

  return { loadCategories }
}