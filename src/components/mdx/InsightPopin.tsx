import { useEffect, useId, useRef, useState } from 'react';
import Button from '../ui/Button';

interface InsightPopinProps {
  insight: string;
  insightPopinContent?: string;
}

export default function InsightPopin({ insight, insightPopinContent }: InsightPopinProps) {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const titleId = `${id}-insight-title`;

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setTimeout(() => openButtonRef.current?.focus(), 0);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => openButtonRef.current?.focus(), 0);
  };

  return (
    <>
      {insightPopinContent ? (
        <div className="mt-4">
          <Button
            label={`💡 INSIGHT – ${insight}`}
            style="secondary"
            onClick={() => setOpen(true)}
            type="button"
          />
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
          <span aria-hidden="true">💡</span>
          <span>
            <span className="font-semibold">INSIGHT</span> – {insight}
          </span>
        </div>
      )}

      {open && insightPopinContent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-lg rounded-lg bg-background p-6 shadow-xl">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span aria-hidden="true">✕</span>
            </button>
            <h3 id={titleId} className="mb-4 pr-10 text-base font-semibold">
              <span aria-hidden="true">💡</span>{' '}
              <span className="text-muted-foreground">INSIGHT</span> – {insight}
            </h3>
            <p className="text-sm leading-relaxed text-foreground">{insightPopinContent}</p>
          </div>
        </div>
      )}
    </>
  );
}
