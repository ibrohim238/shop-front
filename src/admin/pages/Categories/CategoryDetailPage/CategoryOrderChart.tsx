import { ReactElement, useState } from 'react'
import { Card, Title } from '@tremor/react'
import LoadingComponent from '@/components/LoadingComponent'
import ErrorComponent from '@/components/ErrorComponent'
import LineGraphComponent from '@/components/LineGraphComponent'
import { useCategoryOrderCharts } from './useCategoryOrderCharts'

interface Props {
  categoryId: number
  /** Диапазон дат [начальная, конечная], если null – будет вычислен по периоду */
  dateRange: string[] | null
}

interface ChartData {
  [key: string]: string | number
  date: string
  quantity: number
}

type Period = 'day' | 'week' | 'month' | 'year'

const PERIODS: { label: string; value: Period }[] = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Год', value: 'year' },
]

export default function CategoryOrderChart({
  categoryId,
  dateRange,
}: Props): ReactElement {
  const [period, setPeriod] = useState<Period>('day')

  // вычисляем дефолтный диапазон дат по выбранному периоду
  const computeDateRange = (date: string[] | null, format: Period): string[] => {
    if (date && date.length === 2) {
      return date
    }
    const now = new Date()
    const nowStr = now.toISOString().slice(0, 10)
    const past = new Date(now)
    switch (format) {
      case 'week':
        past.setMonth(past.getMonth() - 3)
        break
      case 'month':
        past.setMonth(past.getMonth() - 12)
        break
      case 'year':
        past.setFullYear(past.getFullYear() - 6)
        break
      default:
        past.setDate(past.getDate() - 30)
    }
    const pastStr = past.toISOString().slice(0, 10)
    return [pastStr, nowStr]
  }

  // если dateRange не передан, используем вычисленный
  dateRange = computeDateRange(dateRange, period)

  const { charts, loading, error } = useCategoryOrderCharts(
    categoryId,
    period,
    'category',
    dateRange,
  )

  if (loading) return <LoadingComponent />
  if (error) return <ErrorComponent message={error} />

  const data: ChartData[] = charts.map((c) => ({
    date: c.date.toLocaleDateString('ru-RU'),
    quantity: c.quantity,
  }))

  return (
    <Card className="mt-6">
      <Title>График заказов по категории</Title>

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

      <div className="h-80 mt-4">
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