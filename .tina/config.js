import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "e58c5419-76cd-4f32-9b0e-34e1362b99fa", // Get this from tina.io
  token: "6acf8bc68460d400705492f083ab7076df075a9f", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "medlemmar",
        label: "Medlemmar",
        path: "src/pages/sektionen/medlemmar",
        fields: [
          {
            type: "string",
            name: "namn",
            label: "Namn",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "post",
            label: "Post",
            required: true
          },
          {
            type: "string",
            name: "kontakt",
            label: "Mail",
            required: true
          },
          {
            type: "image",
            name: "bild",
            label: "Bild",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            Label: "Om mig",
            required: false,
            isBody: true
          },
          {
            type: "string",
            name: "utskott",
            label: "Utskott",
            required: true,
            options: ["Styrelsen", "Kodvet", "Kognitivet"]
          }
        ],
        ui: {
          filename: {
            slugify: values => {
              return `${values?.utskott?.toLowerCase()}/${values?.namn}`
            }
          }
        }
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
