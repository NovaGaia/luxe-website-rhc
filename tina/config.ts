import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: null,
  token: null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "src/assets",
    },
  },

  schema: {
    collections: [
      {
        name: "cta",
        label: "CTA global",
        path: "src/content/cta",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "global",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
          },
          {
            type: "string",
            name: "text",
            label: "Texte",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "buttonLabel",
            label: "Texte du bouton",
            required: true,
          },
          {
            type: "string",
            name: "buttonEmoji",
            label: "Emoji du bouton (optionnel, affiché avant le texte)",
          },
          {
            type: "string",
            name: "buttonHref",
            label: "URL du bouton",
            required: true,
          },
          {
            type: "string",
            name: "buttonStyle",
            label: "Style du bouton",
            options: [
              { label: "Primaire (plein)", value: "primary" },
              { label: "Secondaire (contour)", value: "secondary" },
            ],
          },
        ],
      },
      {
        name: "seo",
        label: "SEO global",
        path: "src/content/seo",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "global",
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Nom du site",
            required: true,
          },
          {
            type: "string",
            name: "titleTemplate",
            label: "Template de titre",
            description: "Utiliser %s pour l'emplacement du titre de la page. Ex : %s | Mon Site",
          },
          {
            type: "string",
            name: "defaultDescription",
            label: "Description par défaut",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "defaultOgImage",
            label: "Image Open Graph par défaut",
          },
          {
            type: "string",
            name: "twitterHandle",
            label: "Handle Twitter/X (optionnel, ex : @monsite)",
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            const slug = document._sys.filename;
            return slug === "home" ? "/" : `/${slug}`;
          },
          filename: {
            slugify: (values) =>
              values?.title
                ?.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "") ?? "",
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre de la page",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description SEO",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenu",
            isBody: true,
            templates: [
              {
                name: "CustomImage",
                label: "Image",
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Texte alternatif",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "caption",
                    label: "Légende (optionnelle)",
                  },
                  {
                    type: "string",
                    name: "position",
                    label: "Position",
                    options: [
                      { label: "Pleine largeur", value: "full" },
                      { label: "Flottant à gauche", value: "left" },
                      { label: "Flottant à droite", value: "right" },
                    ],
                  },
                  {
                    type: "string",
                    name: "width",
                    label: "Largeur (desktop/tablette)",
                    options: [
                      { label: "1/4", value: "1/4" },
                      { label: "1/2", value: "1/2" },
                      { label: "2/3", value: "2/3" },
                      { label: "3/4", value: "3/4" },
                    ],
                  },
                  {
                    type: "number",
                    name: "imgWidth",
                    label: "Largeur native (px, optionnel — anti layout shift)",
                  },
                  {
                    type: "number",
                    name: "imgHeight",
                    label: "Hauteur native (px, optionnel — anti layout shift)",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Lien (optionnel)",
                  },
                ],
              },
              {
                name: "TwoColumns",
                label: "Deux colonnes",
                fields: [
                  {
                    type: "rich-text",
                    name: "left",
                    label: "Colonne gauche",
                  },
                  {
                    type: "rich-text",
                    name: "right",
                    label: "Colonne droite",
                  },
                  {
                    type: "string",
                    name: "ratio",
                    label: "Ratio des colonnes",
                    options: [
                      { label: "50% / 50%", value: "1/2-1/2" },
                      { label: "33% / 67%", value: "1/3-2/3" },
                      { label: "67% / 33%", value: "2/3-1/3" },
                    ],
                  },
                  {
                    type: "string",
                    name: "align",
                    label: "Alignement vertical",
                    options: [
                      { label: "Haut", value: "top" },
                      { label: "Centré", value: "center" },
                      { label: "Bas", value: "bottom" },
                    ],
                  },
                  {
                    type: "string",
                    name: "leftStyle",
                    label: "Style colonne gauche",
                    options: [
                      { label: "Par défaut", value: "default" },
                      { label: "Secondaire", value: "secondary" },
                    ],
                    ui: { defaultValue: "default" },
                  },
                  {
                    type: "string",
                    name: "rightStyle",
                    label: "Style colonne droite",
                    options: [
                      { label: "Par défaut", value: "default" },
                      { label: "Secondaire", value: "secondary" },
                    ],
                    ui: { defaultValue: "default" },
                  },
                ],
              },
              {
                name: "CTABlock",
                label: "Appel à l'action",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Titre (optionnel)",
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Texte (optionnel)",
                  },
                  {
                    type: "string",
                    name: "buttonLabel",
                    label: "Texte du bouton",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "buttonHref",
                    label: "URL du bouton",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "buttonStyle",
                    label: "Style du bouton",
                    options: [
                      { label: "Primaire (plein)", value: "primary" },
                      { label: "Secondaire (contour)", value: "secondary" },
                    ],
                  },
                ],
              },
              {
                name: "Quote",
                label: "Citation",
                fields: [
                  {
                    type: "string",
                    name: "quote",
                    label: "Citation",
                    required: true,
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Auteur",
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Rôle / Entreprise (optionnel)",
                  },
                ],
              },
              {
                name: "VideoEmbed",
                label: "Vidéo",
                fields: [
                  {
                    type: "string",
                    name: "url",
                    label: "URL YouTube ou Vimeo",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Titre de la vidéo (obligatoire pour l'accessibilité)",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "caption",
                    label: "Légende (optionnelle)",
                  },
                ],
              },
              {
                name: "GlobalCTA",
                label: "CTA global",
                fields: [
                  {
                    // Champ factice — les données viennent du singleton CTA global
                    type: "string",
                    name: "_note",
                    label: "Note",
                    ui: {
                      component: () => null,
                    },
                  },
                ],
              },
              {
                name: "OneColumn",
                label: "Une colonne",
                fields: [
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Contenu",
                  },
                  {
                    type: "string",
                    name: "width",
                    label: "Largeur",
                    options: [
                      { label: "Pleine largeur", value: "full" },
                      { label: "3/4", value: "3/4" },
                      { label: "2/3", value: "2/3" },
                      { label: "1/2", value: "1/2" },
                    ],
                    ui: { defaultValue: "full" },
                  },
                  {
                    type: "string",
                    name: "align",
                    label: "Alignement",
                    options: [
                      { label: "Centré", value: "center" },
                      { label: "Gauche", value: "left" },
                    ],
                    ui: { defaultValue: "center" },
                  },
                  {
                    type: "string",
                    name: "boxStyle",
                    label: "Style de la boîte",
                    options: [
                      { label: "Par défaut", value: "default" },
                      { label: "Secondaire", value: "secondary" },
                    ],
                    ui: { defaultValue: "default" },
                  },
                ],
              },
              {
                name: "TwoCharts",
                label: "Deux graphiques côte à côte",
                fields: [
                  {
                    type: "string",
                    name: "ratio",
                    label: "Ratio des colonnes",
                    options: [
                      { label: "50% / 50%", value: "1/2-1/2" },
                      { label: "33% / 67%", value: "1/3-2/3" },
                      { label: "67% / 33%", value: "2/3-1/3" },
                    ],
                    ui: { defaultValue: "1/2-1/2" },
                  },
                  {
                    type: "string",
                    name: "leftType",
                    label: "Type graphique gauche",
                    options: [
                      { label: "Camembert", value: "chartPie" },
                      { label: "Barres horizontales", value: "chartBar" },
                    ],
                    ui: { defaultValue: "chartPie" },
                  },
                  {
                    type: "string",
                    name: "leftTitle",
                    label: "Titre gauche",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "leftInsight",
                    label: "Insight gauche",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "leftInsightPopinContent",
                    label: "Insight détail gauche (optionnel)",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "object",
                    name: "leftDatas",
                    label: "Données gauche",
                    list: true,
                    fields: [
                      { type: "string", name: "label", label: "Label", required: true },
                      { type: "number", name: "value", label: "Valeur", required: true },
                    ],
                  },
                  {
                    type: "string",
                    name: "rightType",
                    label: "Type graphique droit",
                    options: [
                      { label: "Camembert", value: "chartPie" },
                      { label: "Barres horizontales", value: "chartBar" },
                    ],
                    ui: { defaultValue: "chartBar" },
                  },
                  {
                    type: "string",
                    name: "rightTitle",
                    label: "Titre droit",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "rightInsight",
                    label: "Insight droit",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "rightInsightPopinContent",
                    label: "Insight détail droit (optionnel)",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "object",
                    name: "rightDatas",
                    label: "Données droites",
                    list: true,
                    fields: [
                      { type: "string", name: "label", label: "Label", required: true },
                      { type: "number", name: "value", label: "Valeur", required: true },
                    ],
                  },
                ],
              },
              {
                name: "Separator",
                label: "Séparateur",
                fields: [
                  {
                    type: "string",
                    name: "style",
                    label: "Style",
                    options: [
                      { label: "Ligne", value: "line" },
                      { label: "Points", value: "dots" },
                      { label: "Espace", value: "space" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
