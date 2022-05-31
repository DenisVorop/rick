import React from "react";

export default function useScroll(parentRef, childRef, callback) {
    const observer = React.useRef()

    React.useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0
        }
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                console.log('intersected')
                callback()
            }
        }, options)

        observer.current.observe(childRef.current)

        const ref = childRef.current

        return function () {
            observer.current.unobserve(ref)
        };
    }, [callback])
}
