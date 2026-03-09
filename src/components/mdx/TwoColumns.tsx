import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { tv } from 'tailwind-variants';
import Box from '../ui/Box';
import CodeBlock from './CodeBlock';
import { textComponents } from '../../utils/tinaComponents';

type Ratio = '1/2-1/2' | '1/3-2/3' | '2/3-1/3';
type Align = 'top' | 'center' | 'bottom';
type BoxVariant = 'default' | 'secondary';

interface Props {
  left?: TinaMarkdownContent | React.ReactNode;
  right?: TinaMarkdownContent | React.ReactNode;
  ratio?: Ratio;
  align?: Align;
  leftStyle?: BoxVariant;
  rightStyle?: BoxVariant;
}

const grid = tv({
  base: 'grid gap-8',
  variants: {
    ratio: {
      '1/2-1/2': 'grid-cols-1 md:grid-cols-2',
      '1/3-2/3': 'grid-cols-1 md:grid-cols-[1fr_2fr]',
      '2/3-1/3': 'grid-cols-1 md:grid-cols-[2fr_1fr]',
    },
  },
  defaultVariants: {
    ratio: '1/2-1/2',
  },
});

const column = tv({
  base: 'flex flex-col h-full',
  variants: {
    align: {
      top: 'justify-start',
      center: 'justify-center',
      bottom: 'justify-end',
    },
  },
  defaultVariants: {
    align: 'top',
  },
});

// Gère les deux cas : React element (build via content collections)
// ou TinaCMS AST (dev via useTina + TinaMarkdown)
function renderContent(content: TinaMarkdownContent | React.ReactNode) {
  if (!content) return null;
  if (React.isValidElement(content)) return content;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TinaMarkdown content={content as TinaMarkdownContent} components={{ ...textComponents, code_block: CodeBlock } as any} />;
}

export default function TwoColumns({ left, right, ratio = '1/2-1/2', align = 'top', leftStyle = 'default', rightStyle = 'default' }: Props) {
  return (
    <div className={`my-8 ${grid({ ratio })}`}>
      <Box noMargin variant={leftStyle}><div className={column({ align })}>{renderContent(left)}</div></Box>
      <Box noMargin variant={rightStyle}><div className={column({ align })}>{renderContent(right)}</div></Box>
    </div>
  );
}
