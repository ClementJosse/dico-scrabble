import React, { useEffect, useRef } from 'react';


const ScrollAnimation = ({ children, translateX = 0, translateY = 0, speed = '0.6s', threshold = 0.1 }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translate(0, 0)';
                }
            });
        }, {
            threshold,
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={elementRef}
            style={{
                opacity: 0,
                transform: `translate(${translateX}px, ${translateY}px)`,
                transition: `opacity ${speed} ease-out, transform ${speed} ease-out`,
            }}
        >
            {children}
        </div>
    );
};

export default ScrollAnimation;
