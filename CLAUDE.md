## Methodologie APEX

Appliquer systematiquement la methode **APEX** pour chaque tache de developpement :

| Phase | Action |
|-------|--------|
| **A**nalyze | Lire/explorer le code concerne, comprendre le contexte et les contraintes |
| **P**lan | Presenter le plan d'action et attendre validation avant d'implementer |
| **E**xecute | Implementer la solution uniquement apres accord |
| e**X**amine | Tester/valider le resultat, verifier qu'il n'y a pas de regression |

### Regles

- Ne jamais coder sans avoir d'abord analyse et planifie
- Toujours attendre la validation du plan avant d'executer
- Toujours verifier le resultat apres implementation

### Commandes de verification (eXamine)

```bash
pnpm build   # Build complet — verifie types + compilation
```

---

## Projet

- **Framework** : Astro 5 (static output)
- **CMS** : TinaCMS (mode local — pas de TinaCloud)
- **Styling** : Tailwind CSS 4 + tailwind-variants
- **React** : charge uniquement pendant l'edition TinaCMS
- **Package manager** : pnpm (obligatoire)
- **Deploiement** : GitHub Pages via GitHub Actions
- **Accessibilite** : WCAG 2.2 AA minimum sur tout le code

## Conventions (OBLIGATOIRES)

- **tailwind-variants** (`tv()`) : utiliser des que variants ou classes conditionnelles
- **Composants atomiques** → `src/components/ui/` (Button, Caption, etc.)
- **Composants MDX** → `src/components/mdx/` (utilises dans TinaCMS)
- **Jamais de `style=""` inline** : toujours des classes Tailwind
- **Couleurs** : utiliser les tokens (`bg-primary`, `text-foreground`, etc.) pas les couleurs Tailwind directes
- **Chemins d'assets** : utiliser `withBase()` (`src/utils/url.ts`) pour favicon et assets statiques. Les images MDX utilisent `import.meta.glob` + `getImage()` dans `CustomImage.astro`
- **Bouton d'edition** : conditionne avec `!import.meta.env.GITHUB_ACTIONS` (pas `import.meta.env.DEV`)
- **Images** : stockees dans `src/assets/images/` (pas `public/`). TinaCMS les reference en `/images/...`. En dev, un plugin Vite sert ce dossier a `/images/` (`astro.config.mjs`). Formats generes au build : AVIF + WebP (`<picture>`)
- **Breakpoints images** : configures dans `src/config/images.ts` (IMAGE_BREAKPOINTS). Override par image via prop `customSizes={[...]}` sur `<CustomImage>`
- **Composants MDX** : double version — `.astro` pour le build (srcset, zero React), `.tsx` pour le dev (useTina, preview temps reel). `TwoColumns.tsx` gere les deux modes via `React.isValidElement()`
- **Build script** : `pnpm build` = `astro build` (pas `tinacms dev`). `tinacms dev` force `NODE_ENV=development` ce qui rend `import.meta.env.PROD` faux
- **tina/__generated__/** : committer apres changement de schema (ne pas ignorer dans git)
- **Docs** : toujours mettre a jour `docs/DEVELOPMENT.md` avant de committer
- **WCAG** : aria, alt obligatoires, focus visible, ordre DOM logique, contraste 4.5:1 min

## Architecture cle

- Pages = MDX dans `src/content/pages/` — `home.mdx` → `/`, autres → `/{slug}`
- Routing : `src/pages/[...slug].astro` via client TinaCMS GraphQL
- SEO global : singleton `src/content/seo/global.json` (collection TinaCMS)
- Visual editing : `PageContent.tsx` avec `useTina` + `client:load`
- `pnpm build` = `tinacms dev -c "astro build"` (serveur GraphQL requis)
- `base` conditionnel dans `astro.config.mjs` : actif uniquement via `GITHUB_ACTIONS`

## Documentation

Voir `docs/DEVELOPMENT.md` pour le guide complet.
