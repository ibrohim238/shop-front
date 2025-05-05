import { ReactElement, useState, useEffect } from 'react'
import { Link } from 'react-router'
import PaginatorComponent from '@/components/PaginatorComponent.tsx'
import { getProducts } from '@/client/services/ProductService.ts'
import type { Product } from '@/models/Product.ts'
import type { PaginationMeta } from '@/types/Response.ts'
import type { FilterParams } from '@/types/Params.ts'

type ProductSectionProps = {
  selectedCategories: number[]
}

export default function ProductSection({
  selectedCategories,
}: ProductSectionProps): ReactElement {
  const [products, setProducts] = useState<Product[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  // сбрасываем страницу при смене фильтра
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories])

  useEffect(() => {
    setLoading(true)
    const filter: FilterParams = {}
    if (selectedCategories.length) {
      filter.category_id = selectedCategories.join(',')
    }

    getProducts(currentPage, 15, filter)
      .then(res => {
        setProducts(res.data)
        setMeta(res.meta)
      })
      .finally(() => setLoading(false))
  }, [currentPage, selectedCategories])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">Загрузка товаров…</span>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-semibold mb-6">Товары</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {products.map(p => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="group block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {p.medias[0]?.url ? (
              <img
                src={p.medias[0].url}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Нет изображения</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-medium mb-2">{p.name}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {p.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  {p.price.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                  })}
                </span>
                <span className="text-sm text-gray-500">
                  {p.quantity ?? 'N/A'} шт.
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {meta && (
        <PaginatorComponent
          currentPage={currentPage}
          lastPage={meta.last_page}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}