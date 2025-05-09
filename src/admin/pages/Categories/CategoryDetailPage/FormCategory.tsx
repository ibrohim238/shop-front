import { useState, ChangeEvent, FormEvent, ReactElement } from 'react'
import axios, { AxiosError } from 'axios'
import { CategoryDto } from '@/admin/dtos/CategoryDto'
import { updateCategory } from '@/admin/services/CategoryService'
import { storeMedia } from '@/common/services/MediaService'
import type { Category } from '@/models/Category'
import FileUploadComponent from '@/components/FileUploadComponent'
import SelectComponent from '@/components/SelectComponent'
import { useCategories } from '@/admin/hooks/useCategories'
import { IErrorsResponse } from '@/types/Response'

interface IMediaForm {
  id: number
  url: string
}

interface ICategoryForm {
  name: string
  description: string
  media: IMediaForm | null
  newMedia: File | null
  parentId: number | null
}

interface Props {
  category: Category
  success: (category: Category) => void
}

type FormErrors = Partial<Record<keyof ICategoryForm, string>>

export default function FormCategory({ category, success }: Props): ReactElement {
  const [form, setForm] = useState<ICategoryForm>({
    name: category.name,
    description: category.description,
    media: category.media ? { id: category.media.id, url: category.media.url } : null,
    newMedia: null,
    parentId: category.parentId,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const { loadCategories } = useCategories()

  const inputClass = (field: keyof ICategoryForm) =>
    `mt-1 block w-full border rounded p-2 ${
      errors[field] ? 'border-red-500' : ''
    }`

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null
      setForm(prev => ({ ...prev, newMedia: file }))
      setErrors(prev => ({ ...prev, newMedia: undefined }))
      return
    }
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleParentChange = (value: number | null) => {
    setForm(prev => ({ ...prev, parentId: value }))
    setErrors(prev => ({ ...prev, parentId: undefined }))
  }

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!form.name.trim()) {
      errs.name = 'Название обязательно'
    }
    return errs
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const clientErr = validate()
    if (Object.keys(clientErr).length) {
      setErrors(clientErr)
      return
    }

    setSaving(true)
    setErrors({})

    try {
      let mediaId: number | null = null
      if (form.newMedia) {
        const uploaded = await storeMedia([form.newMedia])
        if (uploaded.length) mediaId = uploaded[0].id
      } else if (form.media) {
        mediaId = form.media.id
      }

      const dto = new CategoryDto(
        form.name,
        form.description,
        mediaId,
        form.parentId
      )
      const updated = await updateCategory(category.slug, dto)
      success(updated)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = (err as AxiosError<IErrorsResponse>).response?.data
        if (data?.errors) {
          const srv: FormErrors = {}
          for (const key in data.errors) {
            const msgs = data.errors[key] || []
            srv[key as keyof ICategoryForm] = msgs[0]
          }
          setErrors(srv)
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
          value={form.name}
          onChange={handleChange}
          className={inputClass('name')}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Описание</label>
        <textarea
          name="description"
          value={form.description}
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
          selected={form.parentId}
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