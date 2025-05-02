import { ReactElement } from 'react';
import { Card, Title } from '@tremor/react';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import LineGraphComponent from '@/components/LineGraphComponent';
import { useProductOrderCharts } from './useProductOrderCharts';

interface Props { productId: number; }

interface ChartData {
  [key: string]: string | number;
  date: string;
  quantity: number;
}

export default function ProductOrderChart({ productId }: Props): ReactElement {
  const { charts, loading, error } = useProductOrderCharts(productId, 'daily', 'product');

  if (loading) return <LoadingComponent />;
  if (error)   return <ErrorComponent message={error} />;

  const data: ChartData[] = charts.map(c => ({
    date: c.date.toLocaleDateString('ru-RU'),
    quantity: c.quantity,
  }));

  return (
    <Card className="mt-6">
      <Title>График заказов по продукту</Title>
      <div className="h-60 mt-4">
        <LineGraphComponent<ChartData>
          data={data}
          xKey="date"
          yKey="quantity"
          color="#3B82F6"
          height="100%"
          xTickAngle={-45}
        />
      </div>
    </Card>
  );
}