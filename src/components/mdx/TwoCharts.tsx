import ChartBar from '../ui/ChartBar';
import ChartPie from '../ui/ChartPie';
import { tv } from 'tailwind-variants';

type Ratio = '1/2-1/2' | '1/3-2/3' | '2/3-1/3';
type ChartType = 'chartPie' | 'chartBar';

interface ChartData {
  label: string;
  value: number;
}

interface Props {
  ratio?: Ratio;
  leftType?: ChartType;
  leftTitle: string;
  leftInsight: string;
  leftInsightPopinContent?: string;
  leftDatas?: ChartData[];
  rightType?: ChartType;
  rightTitle: string;
  rightInsight: string;
  rightInsightPopinContent?: string;
  rightDatas?: ChartData[];
}

const grid = tv({
  base: 'my-8 grid gap-8',
  variants: {
    ratio: {
      '1/2-1/2': 'grid-cols-1 md:grid-cols-2',
      '1/3-2/3': 'grid-cols-1 md:grid-cols-[1fr_2fr]',
      '2/3-1/3': 'grid-cols-1 md:grid-cols-[2fr_1fr]',
    },
  },
  defaultVariants: { ratio: '1/2-1/2' },
});

function renderChart(
  type: ChartType = 'chartPie',
  title: string,
  insight: string,
  insightPopinContent?: string,
  datas?: ChartData[],
) {
  if (!datas?.length) return null;
  const props = { title, insight, insightPopinContent, datas, noMargin: true };
  return type === 'chartBar' ? (
    <ChartBar {...props} />
  ) : (
    <ChartPie {...props} />
  );
}

export default function TwoCharts({
  ratio = '1/2-1/2',
  leftType,
  leftTitle,
  leftInsight,
  leftInsightPopinContent,
  leftDatas,
  rightType,
  rightTitle,
  rightInsight,
  rightInsightPopinContent,
  rightDatas,
}: Props) {
  return (
    <div className={grid({ ratio })}>
      <div>
        {renderChart(
          leftType,
          leftTitle,
          leftInsight,
          leftInsightPopinContent,
          leftDatas,
        )}
      </div>
      <div>
        {renderChart(
          rightType,
          rightTitle,
          rightInsight,
          rightInsightPopinContent,
          rightDatas,
        )}
      </div>
    </div>
  );
}
