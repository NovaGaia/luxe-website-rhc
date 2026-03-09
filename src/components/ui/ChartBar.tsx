import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Box from '../ui/Box';
import { CHART_COLORS } from './chartColors';
import InsightPopin from '../mdx/InsightPopin';

interface ChartData {
  title: string;
  insight: string;
  insightPopinContent?: string;
  datas: { label: string; value: number }[];
  noMargin?: boolean;
}

export default function ChartBar({ title, insight, insightPopinContent, datas, noMargin }: ChartData) {
  if (!datas?.length) return null;

  const chartData = datas.map((d) => ({ name: d.label, value: d.value }));
  const maxValue = Math.max(...datas.map((d) => d.value));
  // Add 15% padding so the label outside the bar fits
  const xMax = Math.min(100, Math.ceil(maxValue * 1.15));
  const barHeight = 40;
  const chartHeight = datas.length * (barHeight + 16) + 40;
  const isSSR = typeof window === 'undefined';

  return (
    <Box noMargin={noMargin}>
    <figure role="img" aria-label={title}>
      <h3 className="mb-4 text-base font-semibold text-foreground">{title}</h3>

      {!isSSR && <div aria-hidden="true">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 48, left: 8, bottom: 4 }}
          >
            <XAxis
              type="number"
              domain={[0, xMax]}
              hide
            />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              tick={{ fontSize: 13, fill: 'currentColor' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, '']}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={barHeight}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number) => `${v}%`}
                style={{ fontSize: 13, fontWeight: 600, fill: 'currentColor' }}
                aria-hidden="true"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>}

      {/* Accessible text legend for screen readers */}
      <figcaption className="sr-only">
        <p>{title}</p>
        <ul>
          {datas.map((d) => (
            <li key={d.label}>
              {d.label} : {d.value}%
            </li>
          ))}
        </ul>
      </figcaption>

      <InsightPopin insight={insight} insightPopinContent={insightPopinContent} />
    </figure>
    </Box>
  );
}
