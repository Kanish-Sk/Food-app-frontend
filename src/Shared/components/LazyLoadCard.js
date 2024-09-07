import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";

const LazyLoad = ({ children, threshold = 0.1, rootMargin = "10px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const callback = ([entry]) => {
      setIsVisible(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin,
      threshold,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold]);

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0px)" : "translateX(-50px)", // Slide in from left
    config: { mass: 1, tension: 170, friction: 20 }, // Smooth animation
  });

  return (
    <animated.div ref={ref} style={animationProps}>
      {children}
    </animated.div>
  );
};

export default LazyLoad;
