import { useState, useEffect, useRef } from "react";
import debounce from 'lodash/debounce'
export function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = e => {
                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrolltop + e.deltaY,
                    behavior: "smooth"
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
}

export function useScroll() {
    // const [lastScrollTop, setLastScrollTop] = useState(0);
    const [bodyOffset, setBodyOffset] = useState(
        document.body.getBoundingClientRect()
    );
    // const [scrollY, setScrollY] = useState(bodyOffset.top);
    const [scrollY, setScrollY] = useState(bodyOffset.top);
    // const [scrollX, setScrollX] = useState(bodyOffset.left);
    // const [scrollDirection, setScrollDirection] = useState();

    const listener = e => {
        // setBodyOffset(document.body.getBoundingClientRect());
        setScrollY(-bodyOffset.top);
        // setScrollY(window.pageYOffset)
        // setScrollX(bodyOffset.left);
        // setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
        // setLastScrollTop(-bodyOffset.top);
    };

    const delay = 15;

    useEffect(() => {
        window.addEventListener('scroll', debounce(listener, delay));
        return () => {
            window.removeEventListener("scroll", listener);
        };
    });

    return {
        scrollY,
        // scrollX,
        // scrollDirection
    };
}