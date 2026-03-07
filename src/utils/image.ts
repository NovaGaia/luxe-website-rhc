/**
 * Génère une séquence de largeurs pour les images responsives.
 * Progression géométrique entre first et last, avec `size` valeurs.
 *
 * Exemple : responsiveSequence(400, 1200, 8)
 *   → [400, 478, 572, 684, 818, 978, 1170, 1200]
 */
export function responsiveSequence(first: number, last: number, size = 8): number[] {
  if (size <= 0) return [];
  if (size === 1) return [first];
  if (size === 2) return [first, last];
  if (first >= last) return [first];

  const ratio = (last / first) ** (1 / (size - 1));
  const seq: number[] = [first];
  for (let i = 1; i < size - 1; i++) {
    seq.push(Math.round(seq[i - 1] * ratio));
  }
  seq.push(last);
  return seq;
}
