interface Props {
  quote?: string;
  author?: string;
  role?: string;
}

export default function Quote({ quote, author, role }: Props) {
  if (!quote) return null;

  return (
    <figure className="my-8">
      <blockquote className="border-l-4 border-primary pl-6">
        <p className="text-xl italic leading-relaxed">{quote}</p>
      </blockquote>
      {author && (
        <figcaption className="mt-4 pl-6 text-sm font-semibold">
          <cite className="not-italic">{author}</cite>
          {role && (
            <span className="ml-1 font-normal text-muted-foreground">— {role}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
