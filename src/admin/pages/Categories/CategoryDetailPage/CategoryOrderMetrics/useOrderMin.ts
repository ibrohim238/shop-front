import { useState, useEffect } from 'react'
import { getMin } from '@/admin/services/OrderItemReporterService'

export function useOrderMin(categoryId: number) {
  const [value, setValue] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getMin('category', { model_id: categoryId })
      .then(res => setValue(res.quantity))
      .catch(e => setError(e.message || 'Ошибка при загрузке минимума'))
      .finally(() => setLoading(false))
  }, [categoryId])

  return { value, loading, error }
}