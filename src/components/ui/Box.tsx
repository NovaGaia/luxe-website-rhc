import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

interface Props {
  children: ReactNode;
  noMargin?: boolean;
  variant?: 'default' | 'secondary';
}

const box = tv({
  base: 'h-full overflow-hidden rounded border border-border p-8',
  variants: {
    noMargin: {
      false: 'my-8',
      true: '',
    },
    variant: {
      default: '',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
  defaultVariants: {
    noMargin: false,
    variant: 'default',
  },
});

export default function Box({ children, noMargin = false, variant = 'default' }: Props) {
  return (
    <div className={box({ noMargin, variant })}>
      {children}
    </div>
  );
}
