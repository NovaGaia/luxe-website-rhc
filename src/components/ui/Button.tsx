import { tv } from 'tailwind-variants';

export type ButtonStyle = 'primary' | 'secondary';

type LinkProps = {
  href: string;
  label: string;
  style?: ButtonStyle;
  target?: '_self' | '_blank';
  rel?: string;
  onClick?: never;
};

type ActionProps = {
  href?: never;
  label: string;
  style?: ButtonStyle;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export type ButtonProps = LinkProps | ActionProps;

export const button = tv({
  base: 'inline-block cursor-pointer px-8 py-3 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
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

export default function Button(props: ButtonProps) {
  const { label, style = 'primary' } = props;

  if (props.href !== undefined) {
    const resolvedRel = props.target === '_blank' ? (props.rel ?? 'noopener noreferrer') : props.rel;
    return (
      <a href={props.href} target={props.target ?? '_self'} rel={resolvedRel} className={button({ style })}>
        {label}
      </a>
    );
  }

  return (
    <button type={props.type ?? 'button'} onClick={props.onClick} className={button({ style })}>
      {label}
    </button>
  );
}
