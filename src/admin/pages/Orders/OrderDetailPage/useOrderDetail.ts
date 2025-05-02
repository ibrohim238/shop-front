import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getOrderById } from '@/admin/services/OrderService';
import { Order } from '@/models/Order';

export function useOrderDetail(orderId: number) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(orderId)) {
      setError('Некорректный ID заказа');
      setLoading(false);
      return;
    }
    getOrderById(orderId)
      .then(o => setOrder(o))
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить данные заказа');
      })
      .finally(() => setLoading(false));
  }, [orderId, navigate]);

  return { order, setOrder, loading, error } as const;
}