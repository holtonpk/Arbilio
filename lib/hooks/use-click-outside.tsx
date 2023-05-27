import { RefObject, useEffect } from "react";

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
): void {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };

    // Reload only if ref or handler changes
  }, [ref, handler]);
}

export default useClickOutside;
