import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";

const LazyLoad = ({ children, threshold = 0.1, rootMargin = "10px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin, threshold]);

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0px)" : "translateX(-50px)", // Slide in from left
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div ref={ref} style={animationProps}>
      {children}
    </animated.div>
  );
};

export default LazyLoad;
