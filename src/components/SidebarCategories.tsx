// src/components/SidebarCategories.tsx
import { useState, useEffect, ReactElement } from 'react';
import { useSearchParams } from 'react-router';
import { getCategories } from '@/client/services/CategoryService.ts';
import type { Category } from '@/models/Category.ts';

export default function SidebarCategories(): ReactElement {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category');

    useEffect(() => {
        getCategories(1, 100)
            .then(p => setCategories(p.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const selectCategory = (id: number | null) => {
        setSearchParams(id == null ? {} : { category: String(id) });
    };

    if (loading) {
        return <div className="p-4 text-gray-500">Загрузка категорий...</div>;
    }

    return (
        <aside className="w-64 bg-white rounded-lg shadow p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Категории</h2>
            <ul className="space-y-2">
                <li>
                    <button
                        onClick={() => selectCategory(null)}
                        className={`flex items-center p-2 w-full text-left rounded transition ${
                            selectedCategory === null
                                ? 'bg-blue-100 font-medium'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        Все категории
                    </button>
                </li>
                {categories.map(cat => (
                    <li key={cat.id}>
                        <button
                            onClick={() => selectCategory(cat.id)}
                            className={`flex items-center justify-between p-2 w-full rounded transition ${
                                selectedCategory === String(cat.id)
                                    ? 'bg-blue-100 font-medium'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                {cat.media ? (
                                    <img
                                        src={cat.media.url}
                                        alt={cat.name}
                                        className="w-6 h-6 rounded"
                                    />
                                ) : (
                                    <div className="w-6 h-6 bg-gray-200 rounded" />
                                )}
                                <span>{cat.name}</span>
                            </div>
                            <span className="text-gray-400">&gt;</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
