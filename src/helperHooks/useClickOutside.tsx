import { MutableRefObject, useRef, useEffect } from "react";


type ClickOutsideCallback = () => void;

export const useClickOutside = (
    containerRef: MutableRefObject<HTMLElement | null>,
    callback: ClickOutsideCallback
): void => {
    const callbackRef = useRef<ClickOutsideCallback>();

    useEffect(() => {
        callbackRef.current = callback;

    }, [callback]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                callbackRef.current?.();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
        
    }, [containerRef]);
};
