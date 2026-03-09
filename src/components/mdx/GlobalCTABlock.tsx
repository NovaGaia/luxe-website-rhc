import { useState, useEffect } from 'react';
import Box from '../ui/Box';
import Button from '../ui/Button';

interface CtaData {
  title?: string;
  text?: string;
  buttonLabel: string;
  buttonEmoji?: string;
  buttonHref: string;
  buttonStyle?: 'primary' | 'secondary';
}

export default function GlobalCTABlock() {
  const [cta, setCta] = useState<CtaData | null>(null);

  useEffect(() => {
    fetch('http://localhost:4001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query {
          cta(relativePath: "global.json") {
            title text buttonLabel buttonEmoji buttonHref buttonStyle
          }
        }`,
      }),
    })
      .then((r) => r.json())
      .then((r) => setCta(r.data?.cta ?? null))
      .catch(() => null);
  }, []);

  if (!cta) return null;

  const { title, text, buttonLabel, buttonEmoji, buttonHref, buttonStyle = 'primary' } = cta;
  const label = buttonEmoji ? `${buttonEmoji} ${buttonLabel}` : buttonLabel;

  return (
    <Box>
      <div className="text-center">
        {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
        {text && <p className="mb-6 text-muted-foreground">{text}</p>}
        <Button href={buttonHref} label={label} style={buttonStyle} />
      </div>
    </Box>
  );
}
