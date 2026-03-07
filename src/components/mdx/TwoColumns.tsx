import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { tv } from 'tailwind-variants';

type Ratio = '1/2-1/2' | '1/3-2/3' | '2/3-1/3';
type Align = 'top' | 'center' | 'bottom';

interface Props {
  left?: TinaMarkdownContent | React.ReactNode;
  right?: TinaMarkdownContent | React.ReactNode;
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

// Gère les deux cas : React element (build via content collections)
// ou TinaCMS AST (dev via useTina + TinaMarkdown)
function renderContent(content: TinaMarkdownContent | React.ReactNode) {
  if (!content) return null;
  if (React.isValidElement(content)) return content;
  return <TinaMarkdown content={content as TinaMarkdownContent} />;
}

export default function TwoColumns({ left, right, ratio = '1/2-1/2', align = 'top' }: Props) {
  return (
    <div className={grid({ ratio, align })}>
      <div>{renderContent(left)}</div>
      <div>{renderContent(right)}</div>
    </div>
  );
}
