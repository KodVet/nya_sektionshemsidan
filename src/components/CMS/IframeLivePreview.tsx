import type { TemplatePreviewProps } from "@staticcms/core";
import { useEffect, useState, useRef, createElement } from "react";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";
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
  const elements = useRef([]);
  const initialSrc = useRef(options.baseSrc + entry.data[options.fieldSrc]?.toLowerCase() + "#" + entry.data[options.container])

  function defineContent() {
    const doc = document.getElementById("my-frame").contentDocument;
    const container = doc.getElementById(entry.data[options.container]);
    relevantFields.map((field, index) => {
      const element = container?.getElementsByClassName(field.class)[0];
      if ((element && field.widget === "markdown") || field.render === true) {
        elements.current[index] = createRoot(element);
      } else elements.current[index] = element;
    });
  }

  function appendContent(iframe) {}

  relevantFields.map((field, index) => {
    useEffect(() => {
      const element = elements.current[index];
      if (!element) return;
      if (element._internalRoot) {
        element.render(widgetFor(field.name));
      } else if (element.getAttribute("src")) {
        element.setAttribute("src", entry.data[field.name]);
      } else {
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
      <iframe
        style={{
          width: "100%",
          height: "100%",
        }}
        id="my-frame"
        src={
          initialSrc.current
        }
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
