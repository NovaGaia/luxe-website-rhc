import React from 'react';

function parseInlineTags(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\[(sup|sub)\](.*?)\[\/\1\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
    const Tag = match[1] as 'sup' | 'sub';
    parts.push(React.createElement(Tag, { key: i++ }, match[2]));
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.substring(lastIndex));
  return parts;
}

export const textComponents = {
  text: ({ children }: { children: string }) => {
    if (!children?.includes('[sup]') && !children?.includes('[sub]')) return <>{children}</>;
    return <>{parseInlineTags(children)}</>;
  },
};
