import commonWidgetOptions from "./commonOptions";
const string = {
    name: "keyvalue",
    label: "Keyvalue",
    widget: "object",
    fields: [
        ...commonWidgetOptions,
      {
        name: "default",
        widget: "string",
        required: false
      }
    ]
  }
export default string