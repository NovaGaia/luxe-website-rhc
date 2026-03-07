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
# Build complet (verifie types Astro + compilation)
pnpm build

# Build avec generation des types TinaCMS (local)
pnpm build:local
```

---

## Projet

- **Framework** : Astro 5 (static output)
- **CMS** : TinaCMS (mode local — pas de TinaCloud)
- **Styling** : Tailwind CSS 4
- **React** : charge uniquement pendant l'edition TinaCMS
- **Package manager** : pnpm (obligatoire)
- **Deploiement** : GitHub Pages via GitHub Actions

## Conventions

- Pages = fichiers MDX dans `src/content/pages/`
- `home.mdx` → route `/` ; `about.mdx` → `/about`
- Le routing est gere par `src/pages/[...slug].astro`
- Config GitHub Pages dans `astro.config.mjs` : `site` et `base`
