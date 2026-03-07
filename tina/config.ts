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
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "mdx",
        // Le nom du fichier devient le slug URL (home → /, about → /about)
        ui: {
          router: ({ document }) => {
            const slug = document._sys.filename;
            return slug === "home" ? "/" : `/${slug}`;
          },
          filename: {
            // Le nom du fichier = slug URL (home → /, about → /about)
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
          },
        ],
      },
    ],
  },
});
