import { useState, ChangeEvent, FormEvent, ReactElement } from 'react'
import axios, { AxiosError } from 'axios'
import { CouponDto } from '@/admin/dtos/CouponDto'
import { storeCoupon } from '@/admin/services/CouponService'
import type { Coupon } from '@/models/Coupon'
import { IErrorsResponse } from '@/types/Response'
import SelectComponent, { Option } from '@/components/SelectComponent'

interface ICouponForm {
  code: string
  description: string
  type: number | null
  amount: number
  minPrice: number
  quantityAllowed: number | null
  expiresDate: string
}

interface Props {
  success: (coupon: Coupon) => void
}

type FormErrors = Partial<Record<keyof ICouponForm, string>>

export default function CouponForm({ success }: Props): ReactElement {
  const [form, setForm] = useState<ICouponForm>({
    code: '',
    description: '',
    type: null,
    amount: 0,
    minPrice: 0,
    quantityAllowed: null,
    expiresDate: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)

  const inputClass = (field: keyof ICouponForm) =>
    `mt-1 block w-full border rounded p-2 ${
      errors[field] ? 'border-red-500' : ''
    }`

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]:
        type === 'number'
          ? (value === '' ? null : Number(value))
          : value,
    }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!form.code.trim()) {
      errs.code = 'Код обязателен'
    }
    if (form.type === null) {
      errs.type = 'Тип обязателен'
    }
    if (form.amount <= 0) {
      errs.amount = 'Сумма должна быть больше нуля'
    }
    if (form.minPrice < 0) {
      errs.minPrice = 'Минимальная цена не может быть меньше нуля'
    }
    // если поле заполнено, проверяем положительное число
    if (form.quantityAllowed !== null && form.quantityAllowed <= 0) {
      errs.quantityAllowed = 'Количество должно быть больше нуля или оставьте пустым'
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
      const dto = new CouponDto(
        form.code,
        form.description,
        form.type!,
        form.amount,
        form.minPrice,
        form.quantityAllowed,
        form.expiresDate ? new Date(form.expiresDate) : null
      )
      const newCoupon = await storeCoupon(dto)
      success(newCoupon)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = (err as AxiosError<IErrorsResponse>).response?.data
        if (data?.errors) {
          const srv: FormErrors = {}
          for (const key in data.errors) {
            const msgs = data.errors[key] || []
            srv[key as keyof ICouponForm] = msgs[0]
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
      {/* ... остальные поля ... */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Код</label>
        <input
          name="code"
          type="text"
          value={form.code}
          onChange={handleChange}
          className={inputClass('code')}
          required
        />
        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Тип</label>
          <SelectComponent<number>
            selected={form.type}
            onChange={value => {
              setForm(prev => ({ ...prev, type: value }))
              setErrors(prev => ({ ...prev, type: undefined }))
            }}
            placeholder="Выберите тип..."
            loadOptions={async (input, _, { page }) => {
              const all: Option<number>[] = [
                { value: 0, label: 'Фиксированная скидка' },
                { value: 1, label: 'Процентная скидка' },
              ]
              const filtered = all.filter(o =>
                o.label.toLowerCase().includes(input.toLowerCase())
              )
              return {
                options: filtered,
                hasMore: false,
                additional: { page },
              }
            }}
          />
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Сумма</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className={inputClass('amount')}
            required
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Мин. цена</label>
          <input
            name="minPrice"
            type="number"
            value={form.minPrice}
            onChange={handleChange}
            className={inputClass('minPrice')}
          />
          {errors.minPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.minPrice}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Кол-во разрешённо
          </label>
          <input
            name="quantityAllowed"
            type="number"
            value={form.quantityAllowed ?? ''}
            onChange={handleChange}
            className={inputClass('quantityAllowed')}
          />
          {errors.quantityAllowed && (
            <p className="text-red-500 text-sm mt-1">{errors.quantityAllowed}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Дата истечения</label>
          <input
            name="expiresDate"
            type="date"
            value={form.expiresDate}
            onChange={handleChange}
            className={inputClass('expiresDate')}
          />
          {errors.expiresDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiresDate}</p>
          )}
        </div>
      </div>
      {/* ... кнопки ... */}

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