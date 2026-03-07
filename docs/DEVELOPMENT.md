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

> En mode dev, un bouton "Éditer cette page" apparaît en bas à droite de chaque page pour accéder directement à l'édition dans TinaCMS.

---

## Architecture

```
src/
├── utils/
│   └── url.ts               # Utilitaire withBase() pour les chemins d'assets
├── components/
│   ├── ui/                  # Composants atomiques réutilisables
│   │   ├── Button.tsx
│   │   └── Caption.tsx
│   ├── mdx/                 # Composants custom utilisables dans TinaCMS
│   │   ├── CTABlock.tsx
│   │   ├── CustomImage.tsx
│   │   ├── Quote.tsx
│   │   ├── Separator.tsx
│   │   ├── TwoColumns.tsx
│   │   └── VideoEmbed.tsx
│   ├── Header.astro
│   ├── Footer.astro
│   └── PageContent.tsx      # Wrapper React avec useTina (visual editing)
├── content/
│   ├── pages/               # Pages du site (fichiers MDX)
│   │   └── home.mdx         # → route /
│   └── seo/
│       └── global.json      # SEO global (singleton TinaCMS)
├── layouts/
│   └── Layout.astro         # Layout principal (head, skip link, header, footer)
├── pages/
│   └── [...slug].astro      # Route dynamique — toutes les pages
└── styles/
    └── global.css           # Tokens design + typographie de base
tina/
├── config.ts                # Schéma TinaCMS (collections, templates MDX)
└── __generated__/           # Généré automatiquement — ne pas modifier
```

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

### Composants MDX disponibles dans l'éditeur

| Composant | Description |
|---|---|
| **Image** | Image avec position (full/left/right) et largeur configurable |
| **Deux colonnes** | Bloc à deux colonnes avec ratio et alignement configurables |
| **Appel à l'action** | Titre + texte + bouton |
| **Citation** | Blockquote avec auteur et rôle |
| **Vidéo** | Embed YouTube ou Vimeo |
| **Séparateur** | Ligne, points ou espace |

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

Les composants atomiques réutilisables sont dans `src/components/ui/`. Ils utilisent `tailwind-variants` (`tv()`) pour la gestion des variantes.

```tsx
import Button from '@/components/ui/Button';
// style: 'primary' | 'secondary'
<Button href="/contact" label="Nous contacter" style="primary" />
```

### Conventions

- **`tailwind-variants`** (`tv()`) : obligatoire pour tout composant avec des variantes
- **Pas de `style=""` inline** : toujours des classes Tailwind
- **Composants atomiques** → `src/components/ui/`
- **Composants MDX** → `src/components/mdx/`
- **Accessibilité WCAG 2.2 AA** minimum sur tout le code

---

## Build et déploiement

### Build local

```bash
pnpm build
```

Lance le serveur TinaCMS, build Astro, puis s'arrête. Le résultat est dans `dist/`.

### GitHub Pages

Le déploiement est automatique sur push sur `main` via `.github/workflows/deploy.yml`.

Le `base` est conditionnel : actif uniquement en CI (`GITHUB_ACTIONS=true`).

### Chemins d'assets (withBase)

Tout chemin absolu vers un asset (image, favicon, etc.) doit passer par `withBase()` pour être compatible avec le base path de GitHub Pages :

```ts
import { withBase } from '../utils/url';

// ✅ Correct
<img src={withBase('/images/photo.jpg')} />
<link href={withBase('/favicon.svg')} />

// ❌ Incorrect — chemin cassé sur GitHub Pages
<img src="/images/photo.jpg" />
```

`withBase()` laisse les URLs absolutes (`https://...`) et les chemins relatifs inchangés.

### Bouton d'édition

Le bouton "Éditer cette page" s'affiche uniquement hors CI. Il est contrôlé par `!import.meta.env.GITHUB_ACTIONS` (et non `import.meta.env.DEV`, car `tinacms dev` positionne `NODE_ENV=development` même pendant le build de production).

### Domaine custom

Quand un domaine custom est configuré dans GitHub Pages :
1. Supprimer `base: isCI ? '/luxe-website-rhc' : undefined` dans `astro.config.mjs`
2. Mettre à jour `site` avec le vrai domaine

---

## Régénérer les types TinaCMS

Les types GraphQL sont générés automatiquement lors de `pnpm dev`. Si besoin de les régénérer manuellement (hors dev) :

```bash
pnpm tinacms build --local
```
