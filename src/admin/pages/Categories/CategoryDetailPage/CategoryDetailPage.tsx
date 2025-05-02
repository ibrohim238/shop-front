import { ReactElement, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import { useCategoryDetail } from '@/admin/pages/Categories/CategoryDetailPage/useCategoryDetail';
import CardCategory from '@/admin/pages/Categories/CategoryDetailPage/CardCategory';
import FormCategory from '@/admin/pages/Categories/CategoryDetailPage/FormCategory';
import { Category } from '@/models/Category';
import { deleteCategory } from '@/admin/services/CategoryService';

export default function CategoryDetailPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const categorySlug = String(slug);
  const navigate = useNavigate();
  const { category, loading, error } = useCategoryDetail(categorySlug);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(category);

  // Обновляем состояние currentCategory, когда данные загружены
  if (!currentCategory && category) {
    setCurrentCategory(category);
  }

  const redirect = () => navigate('/admin/categories');

  const handleDelete = async () => {
    if (!window.confirm('Вы действительно хотите удалить эту категорию?')) {
      return;
    }
    try {
      if (currentCategory) {
        await deleteCategory(currentCategory.slug);
      }
      navigate('/admin/categories');
    } catch (err) {
      console.error(err);
      alert('Ошибка при удалении категории');
    }
  };

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} onRetry={redirect} />;
  if (!currentCategory)
    return <ErrorComponent message="Категория не существует" onRetry={redirect} />;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate('/admin/categories')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Назад к списку категорий
      </button>

      {editMode ? (
        <FormCategory
          category={currentCategory}
          success={(updatedCategory: Category) => {
            setCurrentCategory(updatedCategory);
            setEditMode(false);
          }}
        />
      ) : (
        <CardCategory category={currentCategory} />
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