import Caption from '../ui/Caption';

interface Props {
  url?: string;
  title?: string;
  caption?: string;
}

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);

    // YouTube : youtube.com/watch?v=ID ou youtu.be/ID
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    // Vimeo : vimeo.com/ID
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.slice(1);
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

export default function VideoEmbed({ url, title, caption }: Props) {
  if (!url || !title) return null;

  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <figure className="my-8">
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}
