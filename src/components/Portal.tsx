import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ReactPortalProps = {
  children: ReactNode;
  wrapperId: string;
};

const createWrapperAndAppendToBody = (wrapperId: string): HTMLElement => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export function ReactPortal({ children, wrapperId }: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] =
    React.useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(wrapperId);
    let createdElement = false;

    // If the element is not found, create and append it to the body
    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
      createdElement = true;
    }
    setWrapperElement(element);

    // Cleanup function
    return () => {
      if (createdElement && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // Wait until the wrapper element is set before creating the portal
  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
}
