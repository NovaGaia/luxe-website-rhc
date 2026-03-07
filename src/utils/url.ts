/**
 * Préfixe un chemin absolu avec BASE_URL (défini par Astro selon l'environnement).
 * Utile pour les assets dont le chemin vient d'une source externe (TinaCMS, etc.)
 *
 * Exemples :
 *   withBase('/images/photo.jpg') → '/luxe-website-rhc/images/photo.jpg' (CI)
 *   withBase('/images/photo.jpg') → '/images/photo.jpg'                  (local)
 *   withBase('https://example.com/img.jpg') → inchangé
 */
export function withBase(path: string): string {
  if (!path || !path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
