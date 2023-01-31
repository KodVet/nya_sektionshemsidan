import type { TemplatePreviewProps } from "@staticcms/core";
import { useEffect, useState, useRef, createElement } from "react";
import { createRoot } from "react-dom/client";
import ReactMarkdown from "react-markdown";
const IframeLivePreview = ({
  entry,
  fields,
  widgetFor,
  widgetsFor,
  collection: { IframePreview: options },
  document,
}) => {
  const relevantFields = fields.filter((field) => field.id);
  // console.log("relevant fields: ", relevantFields)
  const elements = useRef([])
  const [container, setContainer] = useState();

  function defineContent(iframe) {
    const doc = document.getElementById("my-frame").contentDocument;
    setContainer(doc.getElementById(entry.data[options.id]));
    relevantFields.map((field, index) => {
      const element = container?.getElementsByClassName(`${field.id}`)[0];
      if (element && field.widget === "markdown") {
        
        console.log(createElement(element))
        elements.current[index] = createRoot(element)

      }
      else elements.current[index] = element
      console.log(element)
    });
  }

  function appendContent(iframe) {}

  //här
  useEffect(() => {
    // console.log("elements i useEffect: ", elements);
    relevantFields.map((field, index) => {
      const element = elements.current[index]
      if (!element) return;
      if (element._internalRoot) {
          console.log("nu ska markdown uppdateras", element);
        element.render(widgetFor(field.name));
      } else {
        console.log(" nu ska vi uppdaterta ett vanligt element", element)
          element.innerHTML = entry.data[field.name];
      } 
    });
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
        src={options.src + "#" + entry.data[options.id]}
        onLoad={() =>
          setTimeout(() => {
            defineContent(this);
          }, 500)
        }
      ></iframe>
    </div>
  );
};
export default IframeLivePreview;
