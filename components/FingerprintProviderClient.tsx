"use client";

import React from "react";
import { FingerprintProvider } from "@/context/FingerprintContext";

type FingerprintProviderClientProps = {
  children: React.ReactNode;
};

const FingerprintProviderClient = ({
  children,
}: FingerprintProviderClientProps) => {
  return <FingerprintProvider>{children}</FingerprintProvider>;
};

export default FingerprintProviderClient;
