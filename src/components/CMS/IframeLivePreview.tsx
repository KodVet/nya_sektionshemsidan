import type { TemplatePreviewProps } from "@staticcms/core";
import { useEffect, useState, useRef, createElement } from "react";
import { createRoot } from "react-dom/client";
import {render } from 'react-dom'
import ReactMarkdown from "react-markdown";
const IframeLivePreview = ({
  entry,
  fields,
  widgetFor,
  widgetsFor,
  collection: { IframePreview: options },
  document,
}) => {
  const relevantFields = fields.filter((field) => field.class);
  console.log("relevant fields: ", relevantFields)
  const elements = useRef([])
//   const [container, setContainer] = useState();

  function defineContent() {
    const doc = document.getElementById("my-frame").contentDocument;
    // setContainer(doc.getElementById(entry.data[options.id]));
    const container = doc.getElementById(entry.data[options.container])
    console.log("doc", doc)
    console.log("id inställmiomg", entry.data[options.container])
    console.log("container", container)
    relevantFields.map((field, index) => {
      const element = container?.getElementsByClassName(`${field.class}`)[0];
      if (element && field.widget === "markdown" || field.render === true) {
        
        elements.current[index] = createRoot(element)

      }
      else elements.current[index] = element
      console.log(field)
      console.log(element)
    });
  }

  function appendContent(iframe) {}

  relevantFields.map((field, index) => {
      useEffect(() => {
        const element = elements.current[index]
        if (!element) return;
        if (element._internalRoot) {
            element.render(widgetFor(field.name));
        } 
        else if (element.getAttribute('src')) {
            element.setAttribute('src', entry.data[field.name])
        }
        else {
            console.log(" nu ska vi uppdaterta ett vanligt element", element)
            element.innerHTML = entry.data[field.name];
        } 
    }, [entry.data[field.name]]);
  });
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <button onClick={defineContent}>BEEG</button>
      <iframe
        style={{
          width: "100%",
          height: "100%",
        }}
        id="my-frame"
        src={options.baseSrc + entry.data[options.fieldSrc]?.toLowerCase() + "#" + entry.data[options.container]}
        onLoad={() =>
          setTimeout(() => {
            defineContent();
          }, 500)
        }
      ></iframe>
    </div>
  );
};
export default IframeLivePreview;
