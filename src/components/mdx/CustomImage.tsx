import { tv } from 'tailwind-variants';
import Caption from '../ui/Caption';
import { withBase } from '../../utils/url';

type Position = 'full' | 'left' | 'right';
type Width = '1/4' | '1/2' | '2/3' | '3/4';

interface Props {
  src?: string;
  alt?: string;
  caption?: string;
  position?: Position;
  width?: Width;
  imgWidth?: number;
  imgHeight?: number;
  href?: string;
}

const figure = tv({
  base: 'w-full',
  variants: {
    position: {
      full: 'my-6',
      left: 'my-4 md:float-left md:clear-left md:mr-6 md:mb-2',
      right: 'my-4 md:float-right md:clear-right md:ml-6 md:mb-2',
    },
    width: {
      '1/4': 'md:w-1/4',
      '1/2': 'md:w-1/2',
      '2/3': 'md:w-2/3',
      '3/4': 'md:w-3/4',
    },
  },
  compoundVariants: [
    { position: 'full', class: 'md:w-full' },
  ],
  defaultVariants: {
    position: 'full',
    width: '1/2',
  },
});

export default function CustomImage({
  src,
  alt,
  caption,
  position = 'full',
  width = '1/2',
  imgWidth,
  imgHeight,
  href,
}: Props) {
  if (!src) return null;

  const img = (
    <img
      src={withBase(src)}
      alt={alt ?? ''}
      width={imgWidth}
      height={imgHeight}
      loading="lazy"
      decoding="async"
      className="w-full h-auto"
    />
  );

  return (
    <figure className={figure({ position, width })}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {img}
        </a>
      ) : (
        img
      )}
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}
