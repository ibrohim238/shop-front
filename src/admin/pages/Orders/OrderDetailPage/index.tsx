import { ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import { useOrderDetail } from '@/admin/pages/Orders/OrderDetailPage/useOrderDetail';
import CardOrder from '@/admin/pages/Orders/OrderDetailPage/CardOrder';

export default function Index(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);
  const navigate = useNavigate();
  const { order, loading, error } = useOrderDetail(orderId);

  const goBack = () => navigate('/admin/orders');

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error!} onRetry={goBack} />;
  if (!order) return <ErrorComponent message="Заказ не найден" onRetry={goBack} />;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={goBack}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Назад к списку
      </button>
      <CardOrder order={order} />
    </div>
  );
}