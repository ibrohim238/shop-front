// src/admin/components/ProductDetailCard.tsx
import type { ReactElement } from 'react';
import type { Product } from '@/models/Product';

interface Props {
    product: Product;
}

export default function ProductDetailCard({ product }: Props): ReactElement {
    return (
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h1 className="text-2xl font-semibold mb-2">
                Товар #{product.id}: {product.name}
            </h1>
            <div>
                <h2 className="text-sm text-gray-500">Описание</h2>
                <p className="text-gray-800">{product.description}</p>
            </div>
            <div className="flex gap-6">
                <div>
                    <h2 className="text-sm text-gray-500">Цена</h2>
                    <p className="text-gray-800">
                        {product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                    </p>
                </div>
                <div>
                    <h2 className="text-sm text-gray-500">Количество</h2>
                    <p className="text-gray-800">{product.quantity ?? '—'}</p>
                </div>
            </div>
            {product.categories && product.categories.length > 0 && (
                <div>
                    <h2 className="text-sm text-gray-500">Категории</h2>
                    <ul className="list-disc list-inside text-gray-800">
                        {product.categories.map(c => (
                            <li key={c.id}>{c.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {product.medias.length > 0 && (
                <div>
                    <h2 className="text-sm text-gray-500">Изображения</h2>
                    <div className="flex gap-4">
                        {product.medias.map(m => (
                            <img
                                key={m.id}
                                src={m.url}
                                alt={product.name}
                                className="w-32 h-32 object-cover rounded"
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className="flex gap-6 text-sm text-gray-500">
                <div>
                    Создано:{' '}
                    {product.created_at.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </div>
                <div>
                    Обновлено:{' '}
                    {product.updated_at.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </div>
            </div>
        </div>
    );
}