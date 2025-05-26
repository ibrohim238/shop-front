import { ReactElement } from 'react'
import LoadingComponent from '@/components/LoadingComponent'
import ErrorComponent from '@/components/ErrorComponent'
import { useOrderSum } from '@/admin/pages/Products/ProductDetailPage/ProductOrderMetrics/useOrderSum'
import { useOrderAvg } from '@/admin/pages/Products/ProductDetailPage/ProductOrderMetrics/useOrderAvg'
import { useOrderMax } from '@/admin/pages/Products/ProductDetailPage/ProductOrderMetrics/useOrderMax'
import { useOrderMin } from '@/admin/pages/Products/ProductDetailPage/ProductOrderMetrics/useOrderMin'

interface Props {
  productId: number,
  dateRange: string[]|null,
}

export default function ProductOrderMetrics({ productId, dateRange }: Props): ReactElement {
  const sum = useOrderSum(productId, dateRange);
  const avg = useOrderAvg(productId, dateRange);
  const max = useOrderMax(productId, dateRange);
  const min = useOrderMin(productId, dateRange);

  const cards = [
    { title: 'Суммарное количество', ...sum },
    { title: 'Среднее количество', ...avg },
    { title: 'Максимальное количество', ...max },
    { title: 'Минимальное количество', ...min },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {cards.map(({ title, value, loading, error }) => {
        if (loading) {
          return <LoadingComponent key={title} />
        }
        if (error) {
          return <ErrorComponent key={title} message={error} />
        }
        return (
          <div
            key={title}
            className="p-4 bg-white rounded-lg shadow flex flex-col items-center"
          >
            <div className="text-sm text-gray-500">{title}</div>
            <div className="mt-2 text-3xl font-bold">{value}</div>
          </div>
        )
      })}
    </div>
  )
}