import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { PageQuery, PageQueryVariables } from '../../tina/__generated__/types';

interface Props {
  data: { page: PageQuery['page'] };
  query: string;
  variables: PageQueryVariables;
}

export default function PageContent({ data, query, variables }: Props) {
  const { data: tinaData } = useTina({ data, query, variables });

  return (
    <div>
      <TinaMarkdown content={tinaData.page.body} />
    </div>
  );
}
