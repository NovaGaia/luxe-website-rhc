# luxe-website-rhc

Site vitrine statique généré avec Astro, éditable via TinaCMS en local.

## Stack

| Outil | Version | Rôle |
|---|---|---|
| [Astro](https://astro.build) | 5 | Framework SSG |
| [TinaCMS](https://tina.io) | 3 | CMS Git local |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Styling |
| [tailwind-variants](https://www.tailwind-variants.org) | 3 | Variants de composants |
| React | 18 | Rendu des composants éditables |
| pnpm | — | Package manager (obligatoire) |

## Commandes

```bash
pnpm install       # Installation des dépendances
pnpm dev           # Serveur de développement + TinaCMS (localhost:4321)
pnpm build         # Build de production (GitHub Pages)
pnpm preview       # Prévisualisation du build
```

## Déploiement

Le site est déployé automatiquement sur **GitHub Pages** à chaque push sur `main` via GitHub Actions.

URL : https://novagaia.github.io/luxe-website-rhc

> Quand un domaine custom sera configuré dans GitHub Pages, mettre à jour `site` dans `astro.config.mjs` et supprimer le `base` conditionnel.

## Documentation

- [Guide développeur](./docs/DEVELOPMENT.md)
