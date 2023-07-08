import React, { useRef } from "react";

export const useInterval = (callback: Function) => {
  const mutableCb = useRef<unknown>(null);
  mutableCb.current = callback;

  const startInterval = (delay: number) => {
    const id = setInterval(() => {
      typeof mutableCb.current === "function" && mutableCb.current();
    }, delay);
    return () => clearInterval(id);
  };

  return startInterval;
};
