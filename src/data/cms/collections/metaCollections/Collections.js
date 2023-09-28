const widgets = Object.values(
  import.meta.glob(["./widgets/*", "!**/widgets/commonOptions.js"], {
    eager: true,
    import: "default",
  })
);
import commonOptions from "./commonCollectionOptions";

const collection = {
  name: "collections",
  label: "Collections",
  labe_singular: "collection",
  identifier_field: "name",
  extension: "json",
  create: true,
  folder: "src/data/cms/collections",
  editor: {
    preview: false,
  },
  fields: [
    {
      name: "type",
      widget: "select",
      options: ["File", "Folder"],
    },
    ...commonOptions,
    {
      name: "files",
      condition: {
        field: "type",
        value: "File",
      },
      widget: "list",
      required: false,
      // default: "",
      min: 0,
      fields: [
        {
          name: "file",
          widget: "string",
        },
        ...commonOptions,
        {
          name: "fields",
          label_singular: "field",
          widget: "list",
          add_to_top: true,
          type_key: "widget",
          summary: "{{types.fields.name}}",
          types: widgets,
          required: false,
          collapsed: false,
        },
      ],
      default: ""
    },
    {
      name: "folder",
      widget: "string",
      required: true,
      condition: {
        field: "type",
        value: "Folder",
      },
    },
    {
      name: "create",
      widget: "boolean",
      default: false,
      condition: {
        field: "type",
        value: "Folder",
      },
    },
    {
      name: "delete",
      widget: "boolean",
      default: true,
      condition: {
        field: "type",
        value: "Folder",
      },
    },
    {
      name: "filter",
      widget: "object",
      collapsed: true,
      required: false,
      condition: {
        field: "type",
        value: "Folder",
      },
      fields: [
        {
          name: "field",
          widget: "string",
          required: false,
        },
        {
          name: "value",
          widget: "string",
          required: false,
        },
      ],
      required: false,
    },
    {
      name: "fields",
      label_singular: "field",
      widget: "list",
      add_to_top: false,
      type_key: "widget",
      types: widgets,
      required: true,
      collapsed: false,
      condition: {
        field: "type",
        value: "Folder",
      },
    },
  ],
};
export default collection;
