import { useState, useEffect } from 'react'
import { getAvg } from '@/admin/services/OrderItemReporterService'

export function useOrderAvg(
    productId: number,
    dateRange: string[]|null,
) {
  const [value, setValue] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAvg('product', { model_id: productId, date: dateRange?.join(',') ?? null })
        .then(r => setValue(r.quantity))
        .catch(e => setError(e.message || 'Ошибка'))
        .finally(() => setLoading(false))
  }, [productId, dateRange])

  return { value, loading, error }
}