import { useState, useEffect } from 'react';
import { getCategoryBySlug } from '@/admin/services/CategoryService';
import { Category } from '@/models/Category';

export function useCategoryDetail(categorySlug: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCategoryBySlug(categorySlug)
      .then(data => {
        setCategory(data);
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка при загрузке категории');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categorySlug]);

  return { category, loading, error };
}