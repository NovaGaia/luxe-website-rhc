import Box from '../ui/Box';
import Button from '../ui/Button';
import type { ButtonStyle } from '../ui/Button';

interface Props {
  title?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonStyle?: ButtonStyle;
}

export default function CTABlock({
  title,
  text,
  buttonLabel,
  buttonHref,
  buttonStyle = 'primary',
}: Props) {
  if (!buttonHref || !buttonLabel) return null;

  return (
    <Box>
      <div aria-label={title ?? "Appel à l'action"} className='text-center'>
        {title && <h2 className='mb-4 text-2xl font-bold'>{title}</h2>}
        {text && <p className='mb-6 text-muted-foreground'>{text}</p>}
        <Button href={buttonHref} label={buttonLabel} style={buttonStyle} />
      </div>
    </Box>
  );
}
