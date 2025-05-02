import { useState, ChangeEvent, FormEvent, ReactElement } from 'react';
import { CategoryDto } from '@/admin/dtos/CategoryDto';
import { storeCategory } from '@/admin/services/CategoryService';
import type { Category } from '@/models/Category';

interface ICategoryFormData {
  name: string;
  description: string;
}

interface Props {
  success: (category: Category) => void;
}

export default function CategoryForm({ success }: Props): ReactElement {
  const [formData, setFormData] = useState<ICategoryFormData>({
    name: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const newCategory = await storeCategory(new CategoryDto(formData.name, formData.description));
      success(newCategory);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Название</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
          rows={4}
        />
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
  );
}