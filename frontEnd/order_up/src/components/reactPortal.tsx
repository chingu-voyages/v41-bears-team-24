import { createPortal } from 'react-dom';
import { useState, useLayoutEffect } from 'react';

interface IReactPortal {
    children: any,
    wrapperId: string
}

function ReactPortal({ children, wrapperId = "react-portal-wrapper" }: IReactPortal) {
    const [wrapperElement, setWrapperElement] = useState(null);


    function createWrapperAndAppendToBody(wrapperId: any) {
        const wrapperElement = document.createElement('div');
        wrapperElement.setAttribute("id", wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;
    }

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        if (!element) {
          systemCreated = true;
          element = createWrapperAndAppendToBody(wrapperId);
        }
        // @ts-ignore
        setWrapperElement(element);

        return () => {
            // delete the programatically created element
            if (systemCreated && element!.parentNode) {
              element!.parentNode.removeChild(element!);
            }
          }
    }, [wrapperId]);

    if (wrapperElement === null) return null;


    // @ts-ignore
  return createPortal(children, document.getElementById(wrapperId));
}
export default ReactPortal;