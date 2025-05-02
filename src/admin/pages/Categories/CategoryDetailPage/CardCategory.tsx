import type { ReactElement } from 'react';
import type { Category } from '@/models/Category';

interface Props {
  category: Category;
}

export default function CardCategory({ category }: Props): ReactElement {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Категория #{category.id}: {category.name}
        </h1>
      </div>
      <div>
        <h2 className="text-sm text-gray-500">Описание</h2>
        <p className="text-gray-800">{category.description}</p>
      </div>
      {category.media && (
        <div>
          <h2 className="text-sm text-gray-500">Изображение</h2>
          <img
            src={category.media.url}
            alt={category.name}
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
      <div className="flex gap-6 text-sm text-gray-500">
        <div>
          Создана:{' '}
          {category.created_at.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
        <div>
          Обновлена:{' '}
          {category.updated_at.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}