import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { textComponents } from '../utils/tinaComponents';
import CodeBlock from './mdx/CodeBlock';
import CustomImage from './mdx/CustomImage';
import TwoColumns from './mdx/TwoColumns';
import OneColumn from './mdx/OneColumn';
import TwoCharts from './mdx/TwoCharts';
import CTABlock from './mdx/CTABlock';
import Quote from './mdx/Quote';
import VideoEmbed from './mdx/VideoEmbed';
import Separator from './mdx/Separator';
import GlobalCTABlock from './mdx/GlobalCTABlock';

interface Props {
  body: TinaMarkdownContent;
}

const components = {
  ...textComponents,
  CustomImage,
  TwoColumns,
  OneColumn,
  TwoCharts,
  CTABlock,
  Quote,
  VideoEmbed,
  Separator,
  GlobalCTA: GlobalCTABlock,
  code_block: CodeBlock,
};

export default function StaticPageContent({ body }: Props) {
  return (
    <main id="main-content" className="flow-root">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <TinaMarkdown content={body} components={components as any} />
    </main>
  );
}
