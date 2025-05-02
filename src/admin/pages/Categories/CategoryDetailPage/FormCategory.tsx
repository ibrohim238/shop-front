import { useState, ChangeEvent, FormEvent, ReactElement } from 'react';
import { CategoryDto } from '@/admin/dtos/CategoryDto';
import { updateCategory } from '@/admin/services/CategoryService';
import { storeMedia } from '@/common/services/MediaService';
import type { Category } from '@/models/Category';
import FileUploadComponent from '@/components/FileUploadComponent';
import SelectComponent from '@/components/SelectComponent';
import { useCategories } from '@/admin/hooks/useCategories';

interface IMediaForm {
  id: number;
  url: string;
}

interface ICategoryForm {
  name: string;
  description: string;
  media: IMediaForm | null;
  newMedia: File | null;
  parentId: number | null;
}

interface Props {
  category: Category;
  success: (category: Category) => void;
}

export default function FormCategory({ category, success }: Props): ReactElement {
  const [categoryForm, setCategoryForm] = useState<ICategoryForm>({
    name: category.name,
    description: category.description,
    media: category.media ? { id: category.media.id, url: category.media.url } : null,
    newMedia: null,
    parentId: category.parent_id,
  });
  const [saving, setSaving] = useState(false);
  const { loadCategories } = useCategories();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.type === 'file') {
      const target = e.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;
      setCategoryForm(prev => ({
        ...prev,
        newMedia: file,
      }));
      return;
    }
    setCategoryForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let mediaId: number | null = null;
      if (categoryForm.newMedia) {
        const medias = await storeMedia([categoryForm.newMedia]);
        if (medias.length > 0) {
          mediaId = medias[0].id;
        }
      } else if (categoryForm.media) {
        mediaId = categoryForm.media.id;
      }

      const updatedCategory = await updateCategory(
        category.slug,
        new CategoryDto(
          categoryForm.name,
          categoryForm.description,
          mediaId,
          categoryForm.parentId
        )
      );

      success(updatedCategory);
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
          value={categoryForm.name}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Описание</label>
        <textarea
          name="description"
          value={categoryForm.description}
          onChange={handleChange}
          className="mt-1 block w-full border rounded p-2"
          rows={4}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Родительская категория
        </label>
        <SelectComponent<number>
          selected={categoryForm.parentId}
          onChange={(value) =>
            setCategoryForm(prev => ({
              ...prev,
              parentId: value,
            }))
          }
          placeholder="Без родительской категории"
          loadOptions={loadCategories}
        />
      </div>
      
      <div>
        <FileUploadComponent
          label="Изображение"
          accept="image/*"
          multiple={false}
          onSelect={handleChange}
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