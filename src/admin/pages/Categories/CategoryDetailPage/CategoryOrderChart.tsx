import { ReactElement } from 'react';
import { Card, Title } from '@tremor/react';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import LineGraphComponent from '@/components/LineGraphComponent';
import { useCategoryOrderCharts } from './useCategoryOrderCharts';

interface Props {
  categoryId: number;
  format?: string;
}

interface ChartData extends Record<string, string | number> {
  date: string;
  quantity: number;
}

export default function CategoryOrderChart({
  categoryId,
  format = 'daily',
}: Props): ReactElement {
  const { charts, loading, error } = useCategoryOrderCharts(categoryId, format, 'category');

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error} />;

  const data: ChartData[] = charts.map(c => ({
    date: c.date.toLocaleDateString('ru-RU'),
    quantity: c.quantity,
  }));

  return (
    <Card className="mt-6">
      <Title>График заказов по категории</Title>
      <div className="h-60 mt-4">
        <LineGraphComponent
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