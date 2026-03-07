import { tv } from 'tailwind-variants';

export type ButtonStyle = 'primary' | 'secondary';

export interface ButtonProps {
  href: string;
  label: string;
  style?: ButtonStyle;
  target?: '_self' | '_blank';
  rel?: string;
}

const button = tv({
  base: 'inline-block px-8 py-3 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  variants: {
    style: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    },
  },
  defaultVariants: {
    style: 'primary',
  },
});

export default function Button({ href, label, style = 'primary', target = '_self', rel }: ButtonProps) {
  const resolvedRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel;

  return (
    <a href={href} target={target} rel={resolvedRel} className={button({ style })}>
      {label}
    </a>
  );
}
