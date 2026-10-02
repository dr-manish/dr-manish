import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "dummy-client-id",
  token: process.env.TINA_TOKEN || "dummy-token",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "name", label: "Name" },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "affiliation", label: "Affiliation" },
          { type: "string", name: "email1", label: "Email 1" },
          { type: "string", name: "email2", label: "Email 2" },
          { type: "string", name: "phone", label: "Phone" },
          { type: "string", name: "orcid", label: "ORCID" },
          { type: "string", name: "googleScholar", label: "Google Scholar" },
          { type: "image", name: "logo", label: "University Logo" },
          { type: "image", name: "profilePhoto", label: "Profile Photo" },
          { type: "image", name: "cvFile", label: "Complete CV (PDF File)" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
          {
            type: "object",
            name: "recentNews",
            label: "Recent News",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "specialization",
            label: "Area of Specialization",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "education",
            label: "Academic Education",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "experience",
            label: "Experience",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "administrativeExperience",
            label: "Administrative Experience",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "publications",
            label: "Publication Details",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "patents",
            label: "Patents",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "supervision",
            label: "Research Supervision",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "conferenceOrganized",
            label: "Conference Organized",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "workshopOrganized",
            label: "Workshop Organized",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "eventOrganized",
            label: "Event Organized",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
          {
            type: "object",
            name: "labsEstablished",
            label: "Labs Established",
            list: true,
            fields: [{ type: "string", name: "item", label: "Item" }],
          },
        ],
      },
      {
        name: "pages",
        label: "Dynamic Pages",
        path: "content/pages",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "image", name: "pdfFile", label: "PDF File (e.g. Resume)" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      {
        name: "econtent",
        label: "E-Content",
        path: "content/econtent",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          {
            type: "object",
            name: "topics",
            label: "Topics",
            list: true,
            fields: [
              { type: "string", name: "topicName", label: "Topic Name" },
              { type: "string", name: "notes", label: "Notes", ui: { component: "textarea" } },
              { type: "image", name: "pdf", label: "PDF Document" },
              { type: "string", name: "link", label: "Link URL" },
            ],
          },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
