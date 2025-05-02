import { useState, ChangeEvent, FormEvent, ReactElement } from 'react';
import { storeMedia } from '@/common/services/MediaService.ts';
import { ProductDto } from '@/admin/dtos/ProductDto.ts';
import { storeProduct } from '@/admin/services/ProductService.ts';
import FileUploadComponent from '@/components/FileUploadComponent.tsx';
import MultiSelectComponent from '@/components/MultiSelectComponent.tsx';
import type { Product } from '@/models/Product.ts';
import { useCategories } from '@/admin/hooks/useCategories.ts';

interface IProductForm {
    name: string;
    description: string;
    price: number;
    quantity: number;
    medias: IMediaForm[];
    newMedias: File[];
    categories: number[];
}

interface IMediaForm {
    id: number;
    url: string;
}

interface Props {
    success: (product: Product) => void;
}

export default function ProductForm({ success }: Props): ReactElement {
    const { loadCategories } = useCategories();
    const [productForm, setProductForm] = useState<IProductForm>({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        medias: [],
        newMedias: [],
        categories: [],
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.type === 'file') {
            const target = e.target as HTMLInputElement;
            setProductForm(prev => ({
                ...prev,
                newMedias: Array.from(target.files || []),
            }));
            return;
        }

        setProductForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const mediaIds: number[] = [];
            if (productForm.newMedias.length > 0) {
                const medias = await storeMedia(productForm.newMedias);
                mediaIds.push(...medias.map(media => media.id));
            }
            // Если вдруг есть уже выбранные изображения (что маловероятно при создании),
            // добавляем их id
            mediaIds.push(...productForm.medias.map(media => media.id));

            const newProduct = await storeProduct(
                new ProductDto(
                    productForm.name,
                    productForm.description,
                    productForm.price,
                    productForm.quantity,
                    mediaIds,
                    productForm.categories.length === 0 ? null : productForm.categories
                )
            );
            success(newProduct);
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
                    value={productForm.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded p-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Описание</label>
                <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded p-2"
                    rows={4}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Цена (RUB)</label>
                    <input
                        name="price"
                        type="number"
                        value={productForm.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Количество</label>
                    <input
                        name="quantity"
                        type="number"
                        value={productForm.quantity}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Категории</label>
                    <MultiSelectComponent<number>
                        selected={productForm.categories}
                        onChange={(newSelectedIds) => {
                            setProductForm(prev => ({
                                ...prev,
                                categories: newSelectedIds,
                            }));
                        }}
                        placeholder="Выберите категории"
                        loadOptions={loadCategories}
                    />
                </div>
                <FileUploadComponent
                    label="Изображения"
                    accept="image/*"
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