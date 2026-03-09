import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { PageQuery, PageQueryVariables } from '../../tina/__generated__/types';
import { textComponents } from '../utils/tinaComponents';
import CTABlock from './mdx/CTABlock';
import CodeBlock from './mdx/CodeBlock';
import CustomImage from './mdx/CustomImage';
import TwoCharts from './mdx/TwoCharts';
import GlobalCTABlock from './mdx/GlobalCTABlock';
import Quote from './mdx/Quote';
import Separator from './mdx/Separator';
import TwoColumns from './mdx/TwoColumns';
import OneColumn from './mdx/OneColumn';
import VideoEmbed from './mdx/VideoEmbed';

interface Props {
  data: { page: PageQuery['page'] };
  query: string;
  variables: PageQueryVariables;
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

export default function PageContent({ data, query, variables }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });

  return (
    <main id="main-content" className="flow-root">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <TinaMarkdown content={tinaData.page.body} components={components as any} />
    </main>
  );
}
