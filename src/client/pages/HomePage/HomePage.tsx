import { ReactElement } from 'react'
import { useSearchParams } from 'react-router'
import SidebarCategories from '@/components/SidebarCategories.tsx'
import ProductSection from '@/client/pages/HomePage/ProductSection.tsx'

export default function HomePage(): ReactElement {
  const [searchParams] = useSearchParams()
  const raw = searchParams.get('categories') || ''
    const selectedCategories = raw
    .split(',')
    .filter(s => s !== '')
    .map(s => Number(s))
    .filter(n => !isNaN(n))

    return (
    <div className="container mx-auto p-6 flex gap-6">
      <SidebarCategories />
      <ProductSection selectedCategories={selectedCategories} />
    </div>
  )
}