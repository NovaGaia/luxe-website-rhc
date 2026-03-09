import ChartBar from '../ui/ChartBar';
import ChartPie from '../ui/ChartPie';

export default function CodeBlock({ value, lang }: { value: string; lang?: string }) {
  if (lang === 'json') {
    try {
      const data = JSON.parse(value);
      if (data.type === 'chartPie') return <ChartPie {...data} />;
      if (data.type === 'chartBar') return <ChartBar {...data} />;
    } catch {
      // JSON invalide → fallback
    }
  }
  return (
    <pre>
      <code>{value}</code>
    </pre>
  );
}
