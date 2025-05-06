import { ReactElement } from 'react'
import LoadingComponent from '@/components/LoadingComponent'
import ErrorComponent from '@/components/ErrorComponent'
import { useOrderSum } from '@/admin/pages/Categories/CategoryDetailPage/CategoryOrderMetrics/useOrderSum'
import { useOrderAvg } from '@/admin/pages/Categories/CategoryDetailPage/CategoryOrderMetrics/useOrderAvg'
import { useOrderMax } from '@/admin/pages/Categories/CategoryDetailPage/CategoryOrderMetrics/useOrderMax'
import { useOrderMin } from '@/admin/pages/Categories/CategoryDetailPage/CategoryOrderMetrics/useOrderMin'

interface Props {
    categoryId: number
}

export default function CategoryOrderMetrics({ categoryId }: Props): ReactElement {
    const sum = useOrderSum(categoryId)
    const avg = useOrderAvg(categoryId)
    const max = useOrderMax(categoryId)
    const min = useOrderMin(categoryId)

    const cards = [
        { title: 'Суммарное количество заказов', ...sum },
        { title: 'Среднее количество заказов', ...avg },
        { title: 'Максимальное количество заказов', ...max },
        { title: 'Минимальное количество заказов', ...min },
    ]

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