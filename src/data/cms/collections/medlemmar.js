const medlemmar = {
    name: "medlemmar",
    identifier_field: "namn",
    label: "Medlemmar",
    label_singular: "Medlem",
    folder: "src/data/medlemmar",
    icon: "usergroup",
    create: true,
    slug: "{{slug}}",
    editor: {
      preview: false
    },
    view_groups: [
      {
        label: "Utskott",
        field: "utskott"
      }
    ],
    fields: [
      {
        label: "Namn",
        name: "namn",
        widget: "string"
      },
      {
        label: "Utskott",
        name: "utskott",
        widget: "relation",
        collection: "utskott",
        value_field: "title",
        search_fields: [
          "title"
        ]
      },
      {
        label: "Post",
        name: "post",
        widget: "string"
      },
      {
        label: "Kogvet mail",
        name: "kontakt",
        widget: "string"
      },
      {
        label: "Bild",
        name: "bild",
        widget: "image",
        media_library: {
          choose_url: true
        }
      },
      {
        label: "Om mig",
        name: "body",
        widget: "markdown",
        required: false,
        hint: "(Ni får själv velja om detta ska vara obligatoriskt)  Skriv lite om dig själv, varförd du valde kogvet, linköping.  Varför du sökte till din post. Eller bara något roligt, fan vet jag"
      }
    ]
  }
export default medlemmar