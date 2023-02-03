import { reactify } from "svelte-preprocess-react";
import type { TemplatePreviewProps } from "@staticcms/core";
import card from "@components/content/människaCard.svelte";
import { useEffect, useState } from "react";
let Card = reactify(card);

const component = ({ entry, widgetFor, collection }) => {
    console.log("vi uppdaterar??")
    const [blob, setBlob] = useState('')
    const [mdRendered, setmdRendered] = useState(false)
    useEffect(() => {
      Card = reactify(card);
    }, [entry.data["namn"], entry.data["post"], entry.data["post_hel"], entry.data["kontakt"]])
    useEffect(() => {
      if (!mdRendered && entry.data['body']) {
        Card = reactify(card);
        setmdRendered(true)
        console.log("md första gången")
      }
    })
    useEffect(() => {
      setBlob(entry.data['bild'])
      Card = reactify(card);
      setTimeout(() => {
        setBlob(document.querySelector('#stage div img').getAttribute('src'))
        Card = reactify(card);
        console.log("blob", blob)
      }, 400)
    }, [entry.data["bild"]])
  return (
    <div style={{
      display: "flex",
      width: "100%",
      height: "100%",
      alignContent: "center",
      justifyContent: "center"
    }}>
    <div style={{
      width: "50%",
      height: "clamp(100px, 20%, 400px)"
    }}>
        <Card
          medlem={{
            namn: entry.data["namn"],
            post: entry.data["post"],
            post_hel: entry.data["post_hel"],
            kontakt: entry.data["kontakt"],
            bild: blob,
          }}
          direction={entry.data["direction"] ? "left" : "right"}
        >{widgetFor('body')}</Card>
    </div>
    <div id="stage" style={{display: "none"}}>{widgetFor('bild')}</div>
    </div>
  )
};
export default component