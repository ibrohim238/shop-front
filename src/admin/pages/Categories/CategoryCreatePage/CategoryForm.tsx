import { useState, ChangeEvent, FormEvent, ReactElement } from 'react'
import axios, { AxiosError } from 'axios'
import { CategoryDto } from '@/admin/dtos/CategoryDto'
import { storeCategory } from '@/admin/services/CategoryService'
import type { Category } from '@/models/Category'
import FileUploadComponent from '@/components/FileUploadComponent'
import SelectComponent from '@/components/SelectComponent'
import { useCategories } from '@/admin/hooks/useCategories'
import { storeMedia } from '@/common/services/MediaService'
import { IErrorsResponse } from '@/types/Response'

interface ICategoryFormData {
  name: string
  description: string
  newMedia: File | null
  parentId: number | null
}

interface Props {
  success: (category: Category) => void
}

type FormErrors = Partial<Record<keyof ICategoryFormData, string>>

export default function CategoryForm({ success }: Props): ReactElement {
  const [formData, setFormData] = useState<ICategoryFormData>({
    name: '',
    description: '',
    newMedia: null,
    parentId: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const { loadCategories } = useCategories()

  const inputClass = (field: keyof ICategoryFormData) =>
    `mt-1 block w-full border rounded p-2 ${
      errors[field] ? 'border-red-500' : ''
    }`

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      const target = e.target as HTMLInputElement
      const file = target.files ? target.files[0] : null
      setFormData(prev => ({ ...prev, newMedia: file }))
      setErrors(prev => ({ ...prev, newMedia: undefined }))
      return
    }
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleParentChange = (value: number | null) => {
    setFormData(prev => ({ ...prev, parentId: value }))
    setErrors(prev => ({ ...prev, parentId: undefined }))
  }

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!formData.name.trim()) {
      errs.name = 'Название обязательно'
    }
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
      let mediaId: number | null = null
      if (formData.newMedia) {
        const medias = await storeMedia([formData.newMedia])
        if (medias.length > 0) {
          mediaId = medias[0].id
        }
      }

      const dto = new CategoryDto(
        formData.name,
        formData.description,
        mediaId,
        formData.parentId
      )
      const newCategory = await storeCategory(dto)
      success(newCategory)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<IErrorsResponse>
        const data = axiosErr.response?.data
        if (data?.errors) {
          const serverErrors: FormErrors = {}
          for (const key in data.errors) {
            const msgs = data.errors[key] || []
            serverErrors[key as keyof ICategoryFormData] = msgs[0]
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

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Название</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={inputClass('name')}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={inputClass('description')}
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Родительская категория
        </label>
        <SelectComponent<number>
          selected={formData.parentId}
          onChange={handleParentChange}
          placeholder="Без родительской категории"
          loadOptions={loadCategories}
        />
        {errors.parentId && (
          <p className="text-red-500 text-sm mt-1">{errors.parentId}</p>
        )}
      </div>

      <div>
        <FileUploadComponent
          label="Изображение"
          accept="image/*"
          multiple={false}
          onSelect={handleChange}
        />
        {errors.newMedia && (
          <p className="text-red-500 text-sm mt-1">{errors.newMedia}</p>
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