import type { CSSProperties } from 'react';

export const sharedTooltipProps: {
  cursor: object;
  contentStyle: CSSProperties;
  itemStyle: CSSProperties;
  labelStyle: CSSProperties;
} = {
  cursor: { fill: 'rgba(255,255,255,0.05)' },
  contentStyle: {
    backgroundColor: '#1a1a2e',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '6px',
    padding: '6px 10px',
    fontSize: '12px',
    color: '#fff',
  },
  itemStyle: { color: '#fff', padding: 0 },
  labelStyle: { color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginBottom: '2px' },
};
