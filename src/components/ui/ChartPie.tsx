import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
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

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const RADIAN = Math.PI / 180;

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) {
  if (percent < 0.05) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight="600"
      aria-hidden="true"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function ChartPie({ title, insight, insightPopinContent, datas, noMargin }: ChartData) {
  if (!datas?.length) return null;

  const chartData = datas.map((d) => ({ name: d.label, value: d.value }));
  const total = datas.reduce((sum, d) => sum + d.value, 0);
  const isSSR = typeof window === 'undefined';

  return (
    <Box noMargin={noMargin}>
    <figure role="img" aria-label={title}>
      <h3 className="mb-4 text-base font-semibold text-foreground">{title}</h3>

      {!isSSR && <div aria-hidden="true">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>}

      {/* Accessible text legend for screen readers */}
      <figcaption className="sr-only">
        <p>{title}</p>
        <ul>
          {datas.map((d) => (
            <li key={d.label}>
              {d.label} : {d.value} ({((d.value / total) * 100).toFixed(1)}%)
            </li>
          ))}
        </ul>
      </figcaption>

      <InsightPopin insight={insight} insightPopinContent={insightPopinContent} />
    </figure>
    </Box>
  );
}
