import { useState, ChangeEvent, FormEvent, ReactElement } from 'react'
import axios, { AxiosError } from 'axios'
import { storeMedia } from '@/common/services/MediaService.ts'
import { ProductDto } from '@/admin/dtos/ProductDto.ts'
import { storeProduct } from '@/admin/services/ProductService.ts'
import FileUploadComponent from '@/components/FileUploadComponent.tsx'
import MultiSelectComponent from '@/components/MultiSelectComponent.tsx'
import type { Product } from '@/models/Product.ts'
import { useCategories } from '@/admin/hooks/useCategories.ts'

interface IProductForm {
  name: string
  description: string
  price: number
  quantity: number
  medias: IMediaForm[]
  newMedias: File[]
  categories: number[]
}

interface IMediaForm {
  id: number
  url: string
}

interface Props {
  success: (product: Product) => void
}

type FormErrors = Partial<Record<keyof IProductForm, string>>

export default function ProductForm({ success }: Props): ReactElement {
  const { loadCategories } = useCategories()
  const [productForm, setProductForm] = useState<IProductForm>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    medias: [],
    newMedias: [],
    categories: [],
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files || []
      setProductForm(prev => ({
        ...prev,
        newMedias: Array.from(files),
      }))
      setErrors(prev => ({ ...prev, newMedias: undefined }))
      return
    }
    setProductForm(prev => ({
      ...prev,
      [name]:
        type === 'number'
          ? Number(value)
          : value,
    }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!productForm.name.trim()) {
      errs.name = 'Название обязательно'
    }
    if (productForm.price <= 0) {
      errs.price = 'Цена должна быть больше 0'
    }
    if (productForm.quantity < 0) {
      errs.quantity = 'Количество не может быть отрицательным'
    }
    // добавить другие проверки по необходимости
    return errs
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const clientErrors = validate()
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors)
      return
    }

    setSaving(true)
    setErrors({})

    try {
      const mediaIds: number[] = []
      if (productForm.newMedias.length) {
        const medias = await storeMedia(productForm.newMedias)
        mediaIds.push(...medias.map(m => m.id))
      }
      mediaIds.push(...productForm.medias.map(m => m.id))

      const dto = new ProductDto(
        productForm.name,
        productForm.description,
        productForm.price,
        productForm.quantity,
        mediaIds,
        productForm.categories.length ? productForm.categories : null
      )
      const newProduct = await storeProduct(dto)
      success(newProduct)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ errors?: Record<string, string[]> }>
        const data = axiosErr.response?.data
        if (data?.errors) {
          // преобразуем массивы ошибок в строку
          const serverErrors: FormErrors = {}
          for (const key in data.errors) {
            serverErrors[key as keyof IProductForm] =
              data.errors[key]?.join(' ') || 'Ошибка'
          }
          setErrors(serverErrors)
        }
      } else {
        console.error(err)
      }
    } finally {
      setSaving(false)
    }
  }

  const inputClass = (field: keyof IProductForm) =>
    `mt-1 block w-full border rounded p-2 ${
      errors[field] ? 'border-red-500' : ''
    }`

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Название</label>
        <input
          name="name"
          type="text"
          value={productForm.name}
          onChange={handleChange}
          className={inputClass('name')}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Описание</label>
        <textarea
          name="description"
          value={productForm.description}
          onChange={handleChange}
          className={inputClass('description')}
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Цена (RUB)</label>
          <input
            name="price"
            type="number"
            value={productForm.price}
            onChange={handleChange}
            className={inputClass('price')}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Количество</label>
          <input
            name="quantity"
            type="number"
            value={productForm.quantity}
            onChange={handleChange}
            className={inputClass('quantity')}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Категории</label>
          <MultiSelectComponent<number>
            selected={productForm.categories}
            onChange={values => {
              setProductForm(prev => ({ ...prev, categories: values }))
              setErrors(prev => ({ ...prev, categories: undefined }))
            }}
            placeholder="Выберите категории"
            loadOptions={loadCategories}
          />
          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
          )}
        </div>
        <FileUploadComponent
          label="Изображения"
          accept="image/*"
          onSelect={handleChange}
        />
        {errors.newMedias && (
          <p className="text-red-500 text-sm mt-1">{errors.newMedias}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          disabled={saving}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {saving ? 'Сохраняю...' : 'Сохранить!'}
        </button>
      </div>
    </form>
  )
}