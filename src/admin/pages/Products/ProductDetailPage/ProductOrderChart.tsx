import { ReactElement, useState } from 'react'
import { Card, Title } from '@tremor/react'
import LoadingComponent from '@/components/LoadingComponent'
import ErrorComponent from '@/components/ErrorComponent'
import LineGraphComponent from '@/components/LineGraphComponent'
import { useProductOrderCharts } from './useProductOrderCharts'

interface Props {
  productId: number
}

interface ChartData {
  [key: string]: string | number
  date: string
  quantity: number
}

type Period = 'day' | 'week' | 'month' | 'year';

const PERIODS: { label: string; value: Period }[] = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Год', value: 'year' },
];

export default function ProductOrderChart({ productId }: Props): ReactElement {
  const [period, setPeriod] = useState<Period>('day')
  const { charts, loading, error } = useProductOrderCharts(
    productId,
    period,
    'product',
  )

  if (loading) return <LoadingComponent />
  if (error) return <ErrorComponent message={error} />

  const data: ChartData[] = charts.map((c) => ({
    date: c.date.toLocaleDateString('ru-RU'),
    quantity: c.quantity,
  }))

  return (
    <Card className="mt-6">
      <Title>График заказов по продукту</Title>

      <div className="mt-4 flex space-x-2">
        {PERIODS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setPeriod(value)}
            className={`px-3 py-1 rounded ${
              period === value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="h-60 mt-4">
        <LineGraphComponent<ChartData>
          data={data}
          xKey="date"
          yKey="quantity"
          color="#3B82F6"
          height="100%"
          xTickAngle={-45}
        />
      </div>
    </Card>
  )
}