import { useState, useEffect } from 'react'
import { getAvg } from '@/admin/services/OrderItemReporterService'

export function useOrderAvg(productId: number) {
  const [value, setValue] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getAvg('product', { model_id: productId })
      .then(r => setValue(r.quantity))
      .catch(e => setError(e.message || 'Ошибка'))
      .finally(() => setLoading(false))
  }, [productId])

  return { value, loading, error }
}