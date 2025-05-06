import { ReactElement, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import { useCategoryDetail } from './useCategoryDetail';
import CardCategory from './CardCategory';
import FormCategory from './FormCategory';
import { Category } from '@/models/Category';
import { deleteCategory } from '@/admin/services/CategoryService';
import CategoryOrderChart from './CategoryOrderChart';
import CategoryOrderMetrics from "@/admin/pages/Categories/CategoryDetailPage/CategoryOrderMetrics";

export default function Index(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const categorySlug = String(slug);
  const navigate = useNavigate();
  const { category, setCategory, loading, error } = useCategoryDetail(categorySlug);
  const [editMode, setEditMode] = useState(false);

  const redirect = () => navigate('/admin/categories');
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} onRetry={redirect} />;
  if (!category) return <ErrorComponent message="Категория не существует" onRetry={redirect} />;

  const handleDelete = async () => {
    if (!window.confirm('Вы действительно хотите удалить эту категорию?')) return;
    try {
      await deleteCategory(category.slug);
      redirect();
    } catch {
      alert('Ошибка при удалении категории');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button onClick={redirect} className="mb-4 text-blue-600 hover:underline">
        ← Назад к списку категорий
      </button>

      {editMode ? (
        <FormCategory
          category={category}
          success={(updated: Category) => {
            setCategory(updated);
            setEditMode(false);
          }}
        />
      ) : (
        <>
          <CardCategory category={category} />
          <CategoryOrderChart categoryId={category.id} />
          <CategoryOrderMetrics categoryId={category.id}/>
        </>
      )}

      {!editMode && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => setEditMode(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Редактировать
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}