import { tv } from 'tailwind-variants';

interface Props {
  children: React.ReactNode;
}

const caption = tv({
  base: 'mt-2 text-sm text-center text-muted-foreground',
});

export default function Caption({ children }: Props) {
  return <figcaption className={caption()}>{children}</figcaption>;
}
