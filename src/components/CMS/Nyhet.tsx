import { reactify } from "svelte-preprocess-react";
import type { TemplatePreviewProps } from "@staticcms/core";
import card from "@components/content/NyhetCard.svelte";
import { Fragment, useEffect, useState } from "react";
let Card = reactify(card);
const medlemmar = Object.values(import.meta.glob('../../data/medlemmar/*.md', {eager: true}))
console.log("medlemmar", medlemmar)
const Component = ({ entry, widgetFor, collection }) => {
    const [blob, setBlob] = useState('')
    const [mdRendered, setmdRendered] = useState(false)
    useEffect(() => {
        console.log("medlemmar", medlemmar)
      Card = reactify(card);
    })
    useEffect(() => {
        setBlob(entry.data['bild'])
        Card = reactify(card);
        setTimeout(() => {
          setBlob(document.querySelector('#stage div img').getAttribute('src'))
          Card = reactify(card);
          console.log("blob", blob)
        }, 400)
      }, [entry.data["img"]])
  return (
    <div style={{
      display: "flex",
      width: "100%",
      height: "100%",
      alignContent: "center",
      justifyContent: "center",
      
    }}>
        <div style={{
        containerType: "inline-size",
        width: "clamp(425px, 75%, 1000px)",
        height: "calc(fit-content + 10px)",
        fontFamily: "GillSans",
        resize: "horizontal",
        overflow: "hidden"
        }}>
            <Card
            post={{
                title: entry.data["title"],
                authors: entry.data["authors"]?.map(author => medlemmar.find(medlem => medlem.frontmatter.namn === author).frontmatter) || [
                    {
                        namn: "Författare"
                    }
                ], 
                useNamn: entry.data["useNamn"],
                usePost: entry.data["usePost"],
                useUtskott: entry.data["useUtskott"],
                date: entry.data["date"] || new Date(),
                img: blob
            }}
            reverse={false}
            >
                {entry.data["excerpt"]}
            </Card>
            <div id="stage" style={{display: "none"}}>{widgetFor('img')}</div>
        </div>
    </div>
  )
};
export default Component