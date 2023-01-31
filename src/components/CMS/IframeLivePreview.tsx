import type { TemplatePreviewProps } from "@staticcms/core";
import { useEffect, useState, useRef, createElement } from "react";
import { createRoot } from 'react-dom/client'
import ReactMarkdown from "react-markdown";
const IframeLivePreview = (
  { entry, fields, widgetFor, widgetsFor, collection: { IframePreview: options }, document }
) => {
    const relevantFields = fields.filter(field => field.id)
    // console.log("relevant fields: ", relevantFields)
    let renderedElements = []
    let elements = {}
    const [container, setContainer] = useState()
    function defineContent(iframe) {
        const doc = document.getElementById('my-frame').contentDocument
        setContainer(doc.getElementById(entry.data[options.id]))
        relevantFields.map(field => {
            const element = container?.getElementsByClassName(`${field.id}`)[0]
            if (element && field.widget === 'markdown') {
                renderedElements.push(createRoot(element))
            }
        })
          console.log("renderedElements: ", renderedElements)
  }
  function appendContent(iframe) {}
  const firstUpdate = useRef(true);
  //här
  useEffect(() => {
    relevantFields.map((field) => {
        // if (firstUpdate.current) {
        //     firstUpdate.current = false
        //     return
        // }
        const element = container?.getElementsByClassName(`${field.id}`)[0]
        if (!element) return
        if (field.widget === 'markdown') {
            
            // console.log(renderedElements[0]?.render(widgetFor(entry.data[field.name])))
            // element.innerHTML = render(reactMarkdown(entry.data[field.name]), element)
        }
        else element.innerHTML = entry.data[field.name]
    })
  })
  return (
    <div 
    style={{
        width: '100%',
        height: '100%'
    }}>
        <button onClick={defineContent}></button>
        <iframe style={{
            width: '100%',
            height: '100%'
        }}
        id="my-frame"
          src={options.src + '#' + entry.data[options.id]}
          onLoad={() => setTimeout(() => {
              defineContent(this)

          },4000)
          }
        ></iframe>
    </div>
  );
};
export default IframeLivePreview