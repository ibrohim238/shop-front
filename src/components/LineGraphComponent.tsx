import { ReactElement } from 'react';
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line
} from 'recharts';

interface LineGraphComponentProps<T extends Record<string, string | number>> {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  color?: string;
  height?: string | number;
  xTickAngle?: number;
}

export default function LineGraphComponent<
  T extends Record<string, string | number>
>({
  data,
  xKey,
  yKey,
  color = '#3B82F6',
  height = '100%',
  xTickAngle = -45
}: LineGraphComponentProps<T>): ReactElement {
  // Преобразуем значения yKey в числа, чтобы они точно были number
  const preparedData = data.map(item => ({
    ...item,
    [yKey]: Number(item[yKey])
  }));

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart
          data={preparedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={String(xKey)}
            tick={{ fontSize: 14, fill: '#4A5568' }}
            angle={xTickAngle}
            textAnchor="end"
            height={60}
          />
          <YAxis
            type="number"
            tick={{ fontSize: 14, fill: '#4A5568' }}
            // от нуля (или ниже, если есть отрицательные) до максимума
            domain={[
              (dataMin: number) => Math.min(0, dataMin),
              (dataMax: number) => dataMax
            ]}
            padding={{ top: 20 }}
          />
          <Tooltip formatter={(value: string | number) => String(value)} />
          <Line
            type="monotone"
            dataKey={String(yKey)}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}