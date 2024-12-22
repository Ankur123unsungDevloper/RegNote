/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useEffect,
  useState
} from "react";

import { CoverImageModal } from "@/components/modals/cover-image-modal";
import { CardModal } from "@/components/modals/card-modal";
import { ProModal } from "../modals/pro-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <CoverImageModal />
      <CardModal />
    </>
  );
};
