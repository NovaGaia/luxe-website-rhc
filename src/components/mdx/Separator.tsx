import { tv } from 'tailwind-variants';

type Style = 'line' | 'dots' | 'space';

interface Props {
  style?: Style;
}

const wrapper = tv({
  variants: {
    style: {
      line: 'my-12 border-t border-current opacity-20',
      dots: 'my-12 flex justify-center gap-2',
      space: 'my-16',
    },
  },
  defaultVariants: {
    style: 'line',
  },
});

const dot = tv({
  base: 'block h-1.5 w-1.5 rounded-full bg-current opacity-40',
});

export default function Separator({ style = 'line' }: Props) {
  if (style === 'line') {
    return <hr className={wrapper({ style })} />;
  }

  if (style === 'dots') {
    return (
      <div className={wrapper({ style })} role="separator" aria-hidden="true">
        <span className={dot()} />
        <span className={dot()} />
        <span className={dot()} />
      </div>
    );
  }

  return <div className={wrapper({ style })} role="separator" aria-hidden="true" />;
}
