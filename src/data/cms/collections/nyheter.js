const nyheter = {
    name: "nyheter",
    label: "Nyheter",
    label_singular: "nyhet",
    folder: "src/data/nyheter",
    create: true,
    slug: "{{slug}}",
    icon: "newspaper",
    view_filters: [
    {
        label: "Utkast",
        field: "draft",
        pattern: "true"
    },
    {
        label: "Publicerade",
        field: "draft",
        pattern: "false"
    }
    ],
    view_groups: [
    {
        label: "Månad publicerad",
        field: "date",
        pattern: "[a-zA-Z]+"
    },
    {
        label: "Författare",
        field: "author"
    }
    ],
    editor: {
    preview: false
    },
    fields: [
    {
        label: "Utkast?",
        name: "draft",
        widget: "boolean"
    },
    {
        label: "Författare",
        name: "author",
        widget: "relation",
        collection: "medlemmar",
        value_field: "{{namn}} - {{post}}",
        search_fields: [
        "namn",
        "post",
        "utskott"
        ]
    },
    {
        label: "Rubrik",
        name: "title",
        widget: "string",
        required: true
    },
    {
        label: "Datum",
        name: "date",
        widget: "datetime",
        date_format: "dd-MM-yyyy",
        time_format: false,
        format: "dd-MMMM-yyyy"
    },
    {
        label: "Omslagsbild",
        name: "img",
        widget: "image",
        required: false
    },
    {
        label: "Utdrag",
        name: "excerpt",
        widget: "text",
        required: true,
        hint: "Detta är det som står på startsidans nyhetsflöden.  Du behöver inte komma på nåt speciellt. Förslagsvis kan du copy pastea 3 första meningarna från inlägget"
    },
    {
        label: "Inlägget",
        name: "body",
        widget: "markdown",
        required: true
    }
    ]
}
export default nyheter