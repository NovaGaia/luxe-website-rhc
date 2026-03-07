import { tv } from 'tailwind-variants';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';

type Ratio = '1/2-1/2' | '1/3-2/3' | '2/3-1/3';
type Align = 'top' | 'center' | 'bottom';

interface Props {
  left?: TinaMarkdownContent;
  right?: TinaMarkdownContent;
  ratio?: Ratio;
  align?: Align;
}

const grid = tv({
  base: 'grid gap-8 my-6',
  variants: {
    ratio: {
      '1/2-1/2': 'grid-cols-1 md:grid-cols-2',
      '1/3-2/3': 'grid-cols-1 md:grid-cols-[1fr_2fr]',
      '2/3-1/3': 'grid-cols-1 md:grid-cols-[2fr_1fr]',
    },
    align: {
      top: 'items-start',
      center: 'items-center',
      bottom: 'items-end',
    },
  },
  defaultVariants: {
    ratio: '1/2-1/2',
    align: 'top',
  },
});

export default function TwoColumns({ left, right, ratio = '1/2-1/2', align = 'top' }: Props) {
  return (
    <div className={grid({ ratio, align })}>
      <div>{left && <TinaMarkdown content={left} />}</div>
      <div>{right && <TinaMarkdown content={right} />}</div>
    </div>
  );
}
