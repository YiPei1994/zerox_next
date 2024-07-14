"use client";

import { PropsWithChildren, useEffect, useState } from "react";

export default function ScreenLimiter({ children }: PropsWithChildren) {
  const [screenWidth, setScreenWidth] = useState<null | number>(null);

  useEffect(() => {
    const getScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    getScreenWidth();

    window.addEventListener("resize", getScreenWidth);

    return () => window.removeEventListener("resize", getScreenWidth);
  }, []);

  if (screenWidth === null) {
    return null; // or a loading indicator
  }

  if (screenWidth > 480) {
    return (
      <p className="w-full min-h-screen flex items-center text-2xl justify-center">
        Please use a mobile device size to view this content.
      </p>
    );
  }

  return children;
}
