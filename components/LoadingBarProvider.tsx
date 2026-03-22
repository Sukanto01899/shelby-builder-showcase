"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

type LoadingBarContextValue = {
  startLoading: () => void;
  stopLoading: () => void;
};

const LoadingBarContext = createContext<LoadingBarContextValue | null>(null);

export const useLoadingBar = () => {
  const ctx = useContext(LoadingBarContext);
  if (!ctx) {
    throw new Error("useLoadingBar must be used within LoadingBarProvider");
  }
  return ctx;
};

type LoadingBarProviderProps = {
  children: React.ReactNode;
};

const LoadingBarProvider = ({ children }: LoadingBarProviderProps) => {
  const [count, setCount] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timerRef = useRef<number | null>(null);
  const initialRenderRef = useRef(true);

  const startLoading = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setCount((prev) => Math.max(0, prev - 1));
  }, []);

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    startLoading();
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      stopLoading();
      timerRef.current = null;
    }, 450);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({ startLoading, stopLoading }),
    [startLoading, stopLoading],
  );

  return (
    <LoadingBarContext.Provider value={value}>
      {count > 0 ? (
        <div className="fixed left-0 right-0 top-0 z-[70] pointer-events-none">
          <div className="loading-bar h-1 w-full">
            <div className="loading-bar__inner h-full" />
          </div>
        </div>
      ) : null}
      {children}
    </LoadingBarContext.Provider>
  );
};

export default LoadingBarProvider;
