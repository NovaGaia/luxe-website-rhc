// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  clientId: null,
  token: null,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "src/assets"
    }
  },
  schema: {
    collections: [
      {
        name: "seo",
        label: "SEO global",
        path: "src/content/seo",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false
          }
        },
        match: {
          include: "global"
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Nom du site",
            required: true
          },
          {
            type: "string",
            name: "titleTemplate",
            label: "Template de titre",
            description: "Utiliser %s pour l'emplacement du titre de la page. Ex : %s | Mon Site"
          },
          {
            type: "string",
            name: "defaultDescription",
            label: "Description par d\xE9faut",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "defaultOgImage",
            label: "Image Open Graph par d\xE9faut"
          },
          {
            type: "string",
            name: "twitterHandle",
            label: "Handle Twitter/X (optionnel, ex : @monsite)"
          }
        ]
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
            slugify: (values) => values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") ?? ""
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre de la page",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description SEO"
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
                    required: true
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Texte alternatif",
                    required: true
                  },
                  {
                    type: "string",
                    name: "caption",
                    label: "L\xE9gende (optionnelle)"
                  },
                  {
                    type: "string",
                    name: "position",
                    label: "Position",
                    options: [
                      { label: "Pleine largeur", value: "full" },
                      { label: "Flottant \xE0 gauche", value: "left" },
                      { label: "Flottant \xE0 droite", value: "right" }
                    ]
                  },
                  {
                    type: "string",
                    name: "width",
                    label: "Largeur (desktop/tablette)",
                    options: [
                      { label: "1/4", value: "1/4" },
                      { label: "1/2", value: "1/2" },
                      { label: "2/3", value: "2/3" },
                      { label: "3/4", value: "3/4" }
                    ]
                  },
                  {
                    type: "number",
                    name: "imgWidth",
                    label: "Largeur native (px, optionnel \u2014 anti layout shift)"
                  },
                  {
                    type: "number",
                    name: "imgHeight",
                    label: "Hauteur native (px, optionnel \u2014 anti layout shift)"
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Lien (optionnel)"
                  }
                ]
              },
              {
                name: "TwoColumns",
                label: "Deux colonnes",
                fields: [
                  {
                    type: "rich-text",
                    name: "left",
                    label: "Colonne gauche"
                  },
                  {
                    type: "rich-text",
                    name: "right",
                    label: "Colonne droite"
                  },
                  {
                    type: "string",
                    name: "ratio",
                    label: "Ratio des colonnes",
                    options: [
                      { label: "50% / 50%", value: "1/2-1/2" },
                      { label: "33% / 67%", value: "1/3-2/3" },
                      { label: "67% / 33%", value: "2/3-1/3" }
                    ]
                  },
                  {
                    type: "string",
                    name: "align",
                    label: "Alignement vertical",
                    options: [
                      { label: "Haut", value: "top" },
                      { label: "Centr\xE9", value: "center" },
                      { label: "Bas", value: "bottom" }
                    ]
                  }
                ]
              },
              {
                name: "CTABlock",
                label: "Appel \xE0 l'action",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Titre (optionnel)"
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Texte (optionnel)"
                  },
                  {
                    type: "string",
                    name: "buttonLabel",
                    label: "Texte du bouton",
                    required: true
                  },
                  {
                    type: "string",
                    name: "buttonHref",
                    label: "URL du bouton",
                    required: true
                  },
                  {
                    type: "string",
                    name: "buttonStyle",
                    label: "Style du bouton",
                    options: [
                      { label: "Primaire (plein)", value: "primary" },
                      { label: "Secondaire (contour)", value: "secondary" }
                    ]
                  }
                ]
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
                    ui: { component: "textarea" }
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Auteur"
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "R\xF4le / Entreprise (optionnel)"
                  }
                ]
              },
              {
                name: "VideoEmbed",
                label: "Vid\xE9o",
                fields: [
                  {
                    type: "string",
                    name: "url",
                    label: "URL YouTube ou Vimeo",
                    required: true
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Titre de la vid\xE9o (obligatoire pour l'accessibilit\xE9)",
                    required: true
                  },
                  {
                    type: "string",
                    name: "caption",
                    label: "L\xE9gende (optionnelle)"
                  }
                ]
              },
              {
                name: "Separator",
                label: "S\xE9parateur",
                fields: [
                  {
                    type: "string",
                    name: "style",
                    label: "Style",
                    options: [
                      { label: "Ligne", value: "line" },
                      { label: "Points", value: "dots" },
                      { label: "Espace", value: "space" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
