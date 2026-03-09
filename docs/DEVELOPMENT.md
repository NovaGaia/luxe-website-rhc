# Guide développeur

## Prérequis

- Node.js 22+
- pnpm (`npm install -g pnpm`)

## Installation

```bash
pnpm install
```

## Développement local

```bash
pnpm dev
```

Lance simultanément :
- **Astro** sur `http://localhost:4321`
- **TinaCMS** sur `http://localhost:4001` (GraphQL)
- **Admin TinaCMS** sur `http://localhost:4321/admin`

> En mode dev, un bouton "Éditer cette page" apparaît en bas à droite de chaque page pour accéder directement à l'édition dans TinaCMS. Le contenu s'actualise en temps réel grâce à `useTina`.

---

## Architecture

```
src/
├── assets/
│   └── images/              # Images optimisées au build (srcset AVIF/WebP)
├── content.config.ts        # Schéma des collections Astro
├── utils/
│   ├── url.ts               # withBase() — chemins d'assets GitHub Pages
│   └── image.ts             # responsiveSequence() — génération des srcset
├── components/
│   ├── ui/                  # Composants atomiques réutilisables
│   │   ├── Box.astro        # Version Astro (build)
│   │   ├── Box.tsx          # Version React (dev / useTina)
│   │   ├── Button.astro     # Version Astro (build)
│   │   ├── Button.tsx       # Version React (dev / useTina)
│   │   ├── Caption.astro    # Version Astro (build)
│   │   └── Caption.tsx      # Version React (dev / useTina)
│   ├── mdx/                 # Composants custom TinaCMS
│   │   ├── CTABlock.astro   # Version Astro (build)
│   │   ├── CTABlock.tsx     # Version React (dev / useTina)
│   │   ├── CustomImage.astro# Version Astro avec srcset (build)
│   │   ├── CustomImage.tsx  # Version React simple (dev / useTina)
│   │   ├── GlobalCTABlock.astro # Version Astro (build) — lit le singleton via getEntry
│   │   ├── GlobalCTABlock.tsx   # Version React (dev) — fetch GraphQL localhost:4001
│   │   ├── Quote.astro      # Version Astro (build)
│   │   ├── Quote.tsx        # Version React (dev / useTina)
│   │   ├── Separator.astro  # Version Astro (build)
│   │   ├── Separator.tsx    # Version React (dev / useTina)
│   │   ├── TwoColumns.tsx   # React uniquement (reçoit du JSX en prop, gère les deux modes)
│   │   ├── VideoEmbed.astro # Version Astro (build)
│   │   └── VideoEmbed.tsx   # Version React (dev / useTina)
│   ├── ResponsiveImage.astro# Composant image responsive avec srcset (build)
│   ├── Header.astro
│   ├── Footer.astro
│   └── PageContent.tsx      # Wrapper React avec useTina (dev uniquement)
├── config/
│   └── images.ts            # IMAGE_BREAKPOINTS — tailles srcset générées au build
├── content/
│   ├── pages/               # Pages du site (fichiers MDX)
│   │   └── home.mdx         # → route /
│   ├── cta/
│   │   └── global.json      # CTA global (singleton TinaCMS)
│   └── seo/
│       └── global.json      # SEO global (singleton TinaCMS)
├── layouts/
│   └── Layout.astro         # Layout principal (head, skip link, header, footer)
├── pages/
│   └── [...slug].astro      # Route dynamique — double voie de rendu
└── styles/
    └── global.css           # Tokens design + typographie de base
tina/
├── config.ts                # Schéma TinaCMS (collections, templates MDX)
└── __generated__/           # Généré par pnpm dev — committer après changement de schéma
```

---

## Double voie de rendu

Le fichier `[...slug].astro` utilise deux chemins distincts selon le contexte :

| Mode | Condition | Rendu | Images |
|---|---|---|---|
| **Build** (`astro build`) | `import.meta.env.PROD = true` | Astro content collections + composants `.astro` | srcset WebP, 8 tailles |
| **Dev** (`tinacms dev -c "astro dev"`) | `import.meta.env.PROD = false` | React + `useTina` + composants `.tsx` | img simple |

Résultat : **quasiment zéro React dans le HTML de production**, preview temps réel conservé en édition locale.

> **Exception : `TwoColumns`** — ce composant reste React dans les deux chemins (build et dev). Il reçoit du contenu riche (JSX) en prop depuis TinaMarkdown, ce qui est incompatible avec un composant `.astro`.

> **Note importante** : `tinacms dev` définit `NODE_ENV=development`, ce qui rend `import.meta.env.PROD` **toujours faux** pendant cette commande. C'est pourquoi `pnpm build` utilise directement `astro build`, pas `tinacms dev -c "astro build"`.

---

## Gestion du contenu (TinaCMS)

### Créer une page

1. Lancer `pnpm dev`
2. Aller sur `http://localhost:4321/admin`
3. **Pages** → **Nouvelle page**
4. Le nom du fichier devient le slug URL (`about` → `/about`)
5. `home` est réservé pour la page d'accueil (`/`)

### Collections disponibles

| Collection | Format | Description |
|---|---|---|
| **Pages** | MDX | Pages du site |
| **SEO global** | JSON | Paramètres SEO par défaut du site |
| **CTA global** | JSON | Appel à l'action insérable dans les pages via le bloc MDX "CTA global" |

#### Champs du singleton CTA global (`src/content/cta/global.json`)

| Champ | Type | Requis | Description |
|---|---|---|---|
| `title` | string | non | Titre du bloc |
| `text` | string | non | Texte descriptif |
| `buttonLabel` | string | **oui** | Texte du bouton |
| `buttonEmoji` | string | non | Emoji préfixé au label du bouton |
| `buttonHref` | string | **oui** | URL cible du bouton |
| `buttonStyle` | `primary` \| `secondary` | **oui** | Variante visuelle du bouton |

#### Mécanique de `GlobalCTABlock`

Le composant s'affiche sans aucune configuration dans la page — il lit toujours le singleton `cta/global` :

- **Build** (`GlobalCTABlock.astro`) : `getEntry('cta', 'global')` via les Astro content collections
- **Dev** (`GlobalCTABlock.tsx`) : fetch GraphQL sur `http://localhost:4001/graphql` (serveur TinaCMS local)

Pour mettre à jour le CTA affiché sur tout le site : modifier le singleton dans TinaCMS (`/admin` → **CTA global**).

### Composants MDX disponibles dans l'éditeur

| Composant | Description | Enveloppé dans `Box` |
|---|---|---|
| **Image** | Image avec position (full/left/right) et largeur configurable, srcset auto au build | Non (décoratif) |
| **Deux colonnes** | Bloc à deux colonnes avec ratio et alignement configurables. Chaque colonne est une `<Box noMargin>` | Oui (colonnes internes) |
| **Appel à l'action** | Titre + texte + bouton | Oui |
| **Citation** | Blockquote avec auteur et rôle | Oui |
| **Vidéo** | Embed YouTube ou Vimeo | Oui |
| **Séparateur** | Ligne, points ou espace | Non (décoratif) |
| **CTA global** | Bloc sans configuration — affiche le CTA défini dans le singleton "CTA global" | Oui |

### Formatage inline dans le contenu TinaCMS

TinaCMS ne supporte pas nativement les balises HTML `<sup>` et `<sub>` dans son éditeur riche. Pour contourner cette limitation, deux balises pseudo-HTML sont reconnues et converties au rendu :

| Syntaxe dans TinaCMS | Rendu HTML | Exemple |
|---|---|---|
| `[sup]texte[/sup]` | `<sup>texte</sup>` | `m[sup]2[/sup]` → m² |
| `[sub]texte[/sub]` | `<sub>texte</sub>` | `H[sub]2[/sub]O` → H₂O |

**Implémentation** : `src/utils/tinaComponents.tsx` — composant `text` de TinaMarkdown avec regex `/(sup|sub)/` + backreference.

### Composant TwoColumns — détails

`TwoColumns` est le seul composant MDX qui reste React dans les deux modes (build et dev). Il utilise un `display: grid` avec `align-items: stretch` pour que les deux colonnes aient la même hauteur.

- Chaque colonne est rendue dans une `<Box noMargin>` — la `Box` occupe toute la hauteur disponible de la cellule grid.
- La prop `align` (`top` | `center` | `bottom`) contrôle l'alignement **du contenu à l'intérieur** de chaque colonne via flexbox.
- La prop `ratio` (`1/2-1/2` | `1/3-2/3` | `2/3-1/3`) définit les fractions de la grille.

### Images dans le contenu

Les images sont stockées dans `src/assets/images/` (pas `public/`). TinaCMS les référence comme `/images/nom.ext` dans les MDX.

- **En dev** : un plugin Vite (`devImagesPlugin` dans `astro.config.mjs`) sert `src/assets/images/` à l'URL `/images/`, pour que `CustomImage.tsx` puisse y accéder.
- **Au build** : `CustomImage.astro` génère des variantes **AVIF + WebP** via `getImage()` d'Astro. Le `<picture>` HTML choisit automatiquement AVIF si le navigateur le supporte, WebP sinon.

### Configuration des breakpoints images (`src/config/images.ts`)

Les breakpoints générés au build sont définis dans `src/config/images.ts` :

```ts
export const IMAGE_BREAKPOINTS = [320, 480, 640, 768, 1024, 1280, 1440, 1920];
```

Les tailles sont calculées automatiquement selon le contexte (position + width de l'image) :
- Image `full` (display max 1200px) → breakpoints jusqu'à retina 2400px : 8 tailles
- Image `left/right 1/2` (display max 600px) → retina 1200px : 6 tailles
- Image `left/right 1/4` (display max 300px) → retina 600px : 4 tailles

### Override par image (`customSizes`)

Pour une image spécifique, ajouter `customSizes` dans le MDX :

```mdx
<CustomImage
  src="/images/hero.jpg"
  alt="Hero"
  customSizes={[640, 1280, 1920]}
/>
```

> **Note** : `customSizes` n'est pas dans le schéma TinaCMS — l'éditeur visuel ne le gère pas. À utiliser directement dans le MDX ou les composants Astro.

---

## Système de design

### Couleurs

Les couleurs sont définies comme variables CSS dans `src/styles/global.css` et exposées comme classes Tailwind.

```html
bg-background      text-foreground
bg-primary         text-primary-foreground
bg-secondary       text-secondary-foreground
bg-muted           text-muted-foreground
bg-accent          text-accent-foreground
bg-destructive     text-destructive-foreground
border-border      ring-ring
```

Le dark mode est géré automatiquement via `prefers-color-scheme`.

Pour mettre à jour les couleurs de la marque, modifier les variables dans `:root` dans `global.css`.

### Composants UI

Les composants atomiques réutilisables sont dans `src/components/ui/`. Chaque composant existe en version `.astro` (build) et `.tsx` (dev/useTina).

| Composant | Description |
|---|---|
| **Button** | Lien stylisé, variants `primary` / `secondary` |
| **Caption** | Légende sous image ou vidéo |
| **Box** | Conteneur avec bordure `border-border`, `rounded`, `p-8`, `my-8`. Prop `noMargin` pour désactiver `my-8` (usage dans grilles — ex : colonnes de `TwoColumns`). |

```astro
// Astro (build)
import Box from '@/components/ui/Box.astro';
<Box>contenu</Box>
<Box noMargin>contenu sans marge externe</Box>
```

```tsx
// React (dev)
import Box from '@/components/ui/Box';
<Box>contenu</Box>
<Box noMargin>contenu sans marge externe</Box>
```

### Conventions

- **`tailwind-variants`** (`tv()`) : usage maximal — obligatoire pour tout composant, même sans variante (utiliser `base`). Ne jamais construire des classes avec concaténation de strings.
- **Pas de `style=""` inline** : toujours des classes Tailwind
- **Composants atomiques** → `src/components/ui/`
- **Composants MDX** → `src/components/mdx/` (deux versions : `.astro` build + `.tsx` dev)
- **Accessibilité WCAG 2.2 AA** minimum sur tout le code
- **Images** → `src/assets/images/` (jamais `public/images/`)

---

## Build et déploiement

### Build local

```bash
pnpm build   # = astro build
```

Génère le site dans `dist/` avec images optimisées (srcset WebP, 8 tailles).

### GitHub Pages

Le déploiement est automatique sur push sur `main` via `.github/workflows/deploy.yml`.

Le `base` est conditionnel : actif uniquement en CI (`GITHUB_ACTIONS=true`).

### Chemins d'assets (withBase)

Tout chemin absolu vers un asset (favicon, etc.) doit passer par `withBase()` pour être compatible avec le base path de GitHub Pages :

```ts
import { withBase } from '../utils/url';
<link href={withBase('/favicon.svg')} />
```

Les images dans le contenu (`CustomImage`) utilisent `import.meta.glob` + `getImage()` d'Astro — `withBase()` n'est pas nécessaire pour elles.

### Bouton d'édition

Affiché uniquement hors CI via `!import.meta.env.GITHUB_ACTIONS`.

### Domaine custom

Quand un domaine custom est configuré dans GitHub Pages :
1. Supprimer `base: isCI ? '/luxe-website-rhc' : undefined` dans `astro.config.mjs`
2. Mettre à jour `site` avec le vrai domaine

---

## Régénérer les types TinaCMS

Les types GraphQL dans `tina/__generated__/` sont regénérés automatiquement à chaque `pnpm dev`. Après un changement de schéma (`tina/config.ts`), committer les fichiers regénérés.

```bash
pnpm dev  # régénère tina/__generated__/
# puis committer tina/__generated__/
```
