"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DocumentList } from "./document-list";

export const FavoriteList = () => {
  const favorites = useQuery(api.documents.getFavorites);

  if (!favorites) return null;

  return (
    <DocumentList
      data={favorites}
      level={0}
      isFavoriteList={true}   // ⭐ THIS IS THE PLACE
    />
  );
};
