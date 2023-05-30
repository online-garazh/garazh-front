import { useEffect, useRef, useState } from 'react';

export const useWindowHeight = (): { windowHeight: string | number } => {
  // For SSR, use 100vh first, so it doesn't affect the overall layout too much
  // We don't know about the real window height yet
  const [windowHeight, setWindowHeight] = useState<number | string>('100vh');
  // Needs to ref, since it is used in event listener
  const windowWidthRef = useRef(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    windowWidthRef.current = window.innerWidth;
  }, []);

  useEffect(() => {
    const onWindowResize = (): void => {
      if (window.innerWidth !== windowWidthRef.current) {
        setWindowHeight(window.innerHeight);

        windowWidthRef.current = window.innerWidth;
      }
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return { windowHeight };
};
