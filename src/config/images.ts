/**
 * Configuration site-wide des images responsives.
 *
 * IMAGE_BREAKPOINTS : liste des largeurs (px) générées au build pour chaque image.
 * Ces valeurs correspondent aux vraies largeurs d'écran courantes.
 * Modifier cette liste pour changer la stratégie pour tout le site.
 *
 * La stratégie par défaut :
 *   - Filtre les breakpoints jusqu'à 2× la largeur d'affichage max (support retina)
 *   - Inclut le premier breakpoint au-dessus du seuil retina (évite le gap)
 *   - customSizes sur un composant <CustomImage> override la config site-wide
 */
export const IMAGE_BREAKPOINTS: readonly number[] = [
  320,  // Mobile S (portrait)
  480,  // Mobile M
  640,  // Mobile L / tablette portrait petit
  768,  // Tablette portrait
  1024, // Tablette paysage / desktop S
  1280, // Desktop M
  1440, // Desktop L
  1920, // Desktop XL / retina desktop M
];

/**
 * Calcule les tailles srcset pour un contexte donné.
 *
 * @param maxDisplayWidth  Largeur d'affichage max en px (ex. 600 pour une image 1/2)
 * @param customSizes      Override par image — prioritaire sur IMAGE_BREAKPOINTS
 * @returns                Tableau de largeurs à générer
 *
 * Exemples :
 *   getSizes(1200)        → [320, 480, 640, 768, 1024, 1280, 1440, 1920]
 *   getSizes(600)         → [320, 480, 640, 768, 1024, 1280]  (1280 = 1er au-dessus de retina 1200px)
 *   getSizes(300)         → [320, 480, 640, 768]
 *   getSizes(600, [400, 800, 1200]) → [400, 800, 1200]        (override)
 */
export function getSizes(maxDisplayWidth: number, customSizes?: number[]): number[] {
  if (customSizes && customSizes.length > 0) return [...customSizes];

  const retinaMax = maxDisplayWidth * 2;

  // Tous les breakpoints en dessous du seuil retina
  const sizes = (IMAGE_BREAKPOINTS as number[]).filter((s) => s <= retinaMax);

  // Ajouter le premier breakpoint au-dessus du seuil retina
  // pour ne pas manquer le cas exact (ex. retina 1200px → inclure 1280px)
  const nextAbove = (IMAGE_BREAKPOINTS as number[]).find((s) => s > retinaMax);
  if (nextAbove) sizes.push(nextAbove);

  return sizes.length > 0 ? sizes : [maxDisplayWidth];
}
