import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { tv } from 'tailwind-variants';
import Box from '../ui/Box';
import CodeBlock from './CodeBlock';
import { textComponents } from '../../utils/tinaComponents';

type Width = 'full' | '3/4' | '2/3' | '1/2';
type Align = 'left' | 'center';

interface Props {
  content?: TinaMarkdownContent | React.ReactNode;
  width?: Width;
  align?: Align;
  boxStyle?: 'default' | 'secondary';
}

const wrapper = tv({
  base: 'my-8',
  variants: {
    width: {
      'full': 'w-full',
      '3/4': 'max-w-[75%]',
      '2/3': 'max-w-[66.667%]',
      '1/2': 'max-w-[50%]',
    },
    align: {
      center: 'mx-auto',
      left: 'mr-auto',
    },
  },
  defaultVariants: {
    width: 'full',
    align: 'center',
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

export default function OneColumn({ content, width = 'full', align = 'center', boxStyle = 'default' }: Props) {
  return (
    <div className={wrapper({ width, align })}>
      <Box noMargin variant={boxStyle}>{renderContent(content)}</Box>
    </div>
  );
}
