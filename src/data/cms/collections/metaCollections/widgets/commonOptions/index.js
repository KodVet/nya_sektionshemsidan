const commonWidgetOptions = [
      {
        name: "name",
        widget: "string",
        required: true
      },
      {
        name: "label",
        widget: "string",
        required: false
      },
      {
        name: "required",
        widget: "boolean",
        default: true
      },
      {
        name: "hint",
        widget: "text",
        required: false
      },
      {
        name: "pattern",
        widget: "string",
        required: false
      },
      {
        name: "188n",
        required: false,
        widget: "select",
        options: [
          "true",
          "none",
          "translate",
          "duplicate"
        ]
      },
      {
        name: "condition",
        widget: "object",
        required: false,
        fields: [
          {
            name: "field",
            widget: "string",
            required: false
          },
          {
            name: "value",
            widget: "list",
            fields: [
              {
                name: "value_string",
                widget: "string",
                required: false
              }
            ],
            // default: "",
            condition: {
              field: "condition.pattern",
              pattern: "^$"
            },
            required: false
          },
          {
            name: "pattern",
            widget: "string",
            condition: {
              field: "condition.value",
              pattern: "^$|/[/]",
              matchall: false
            },
            // default: "",
            required: false
          },
          {
            name: "matchAll",
            widget: "boolean",
            // default: false,
            condition: {
              field: "condition.value",
              pattern: ".*",
              matchall: true
            },
            required: false
          }

        ]
      }
];
export default commonWidgetOptions