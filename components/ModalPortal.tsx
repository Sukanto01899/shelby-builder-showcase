"use client";

import React, { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type ModalPortalProps = {
  children: React.ReactNode;
};

const ModalPortal = ({ children }: ModalPortalProps) => {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient) return null;

  const host = document.getElementById("modal-root");
  if (!host) return null;

  return createPortal(children, host);
};

export default ModalPortal;
