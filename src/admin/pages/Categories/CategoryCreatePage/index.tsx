import { useNavigate } from 'react-router';
import FormCategory from '@/admin/pages/Categories/CategoryCreatePage/CategoryForm';
import type { Category } from '@/models/Category';

export default function Index() {
  const navigate = useNavigate();

  const handleSuccess = (newCategory: Category) => {
    navigate(`/admin/categories/${newCategory.slug}`);
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate('/admin/categories')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Назад к списку
      </button>
      <FormCategory success={handleSuccess} />
    </div>
  );
}