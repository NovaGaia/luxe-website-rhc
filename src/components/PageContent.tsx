import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { PageQuery, PageQueryVariables } from '../../tina/__generated__/types';
import CTABlock from './mdx/CTABlock';
import CustomImage from './mdx/CustomImage';
import Quote from './mdx/Quote';
import Separator from './mdx/Separator';
import TwoColumns from './mdx/TwoColumns';
import VideoEmbed from './mdx/VideoEmbed';

interface Props {
  data: { page: PageQuery['page'] };
  query: string;
  variables: PageQueryVariables;
}

const components = {
  CustomImage,
  TwoColumns,
  CTABlock,
  Quote,
  VideoEmbed,
  Separator,
};

export default function PageContent({ data, query, variables }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });

  return (
    <main id="main-content" className="flow-root">
      <TinaMarkdown content={tinaData.page.body} components={components} />
    </main>
  );
}
