import { useState, useEffect } from 'react'
import { getAvg } from '@/admin/services/OrderItemReporterService'

export function useOrderAvg(categoryId: number) {
  const [value, setValue] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAvg('category', { model_id: categoryId })
      .then(res => setValue(res.quantity))
      .catch(e => setError(e.message || 'Ошибка при загрузке среднего'))
      .finally(() => setLoading(false))
  }, [categoryId])

  return { value, loading, error }
}