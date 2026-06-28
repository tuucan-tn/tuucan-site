import { defineConfig } from "tinacms";

// Branch Tina reads/writes against in the cloud editor.
// Vercel sets VERCEL_GIT_COMMIT_REF on every deploy; falls back to main locally.
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const textarea = { component: "textarea" } as const;

export default defineConfig({
  branch,
  // These come from Tina Cloud (added as env vars in step 5). Empty = local mode.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "home",
        label: "Homepage",
        path: "content",
        format: "json",
        // Single editable document: content/home.json — no create/delete in the UI.
        match: { include: "home" },
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
          {
            type: "object",
            name: "site",
            label: "Site",
            fields: [
              { type: "string", name: "name", label: "Short name" },
              { type: "string", name: "fullName", label: "Full network name" },
              { type: "string", name: "contactEmail", label: "Contact email" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading", ui: textarea },
              { type: "string", name: "subheading", label: "Subheading", ui: textarea },
              { type: "string", name: "ctaLabel", label: "Button label" },
              { type: "string", name: "ctaEmail", label: "Button email" },
            ],
          },
          {
            type: "string",
            name: "values",
            label: "Shared values",
            list: true,
          },
          {
            type: "object",
            name: "about",
            label: "Who We Are",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Paragraphs",
                list: true,
                ui: textarea,
              },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Stats",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.value ?? "Stat" }),
            },
            fields: [
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "label", label: "Label" },
            ],
          },
          {
            type: "object",
            name: "work",
            label: "What We Do",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title ?? "Item" }),
                },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "body", label: "Body", ui: textarea },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "getInvolved",
            label: "Get Involved",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "body", label: "Body", ui: textarea },
              { type: "string", name: "ctaLabel", label: "Button label" },
              { type: "string", name: "ctaEmail", label: "Button email" },
              { type: "string", name: "note", label: "Note", ui: textarea },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "string", name: "contactEmail", label: "Contact email" },
            ],
          },
        ],
      },
    ],
  },
});
