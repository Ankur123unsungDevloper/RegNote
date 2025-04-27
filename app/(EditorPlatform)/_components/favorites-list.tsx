/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { api } from "@/convex/_generated/api"; // Adjust the import based on your API structure
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item"; // Import the Item component
import { cn } from "@/lib/utils";
import { IoDocumentTextOutline } from "react-icons/io5";

interface FavoritesListProps {
  level?: number;
}

export const FavoritesList = ({ level = 0 }: FavoritesListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  // Fetch favorite documents from the API
  const favoriteDocuments = useQuery(api.documents.getFavorites); // Adjust this API call as needed

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (favoriteDocuments === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${(level * 12) + 25}px` : undefined
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No favorites found
      </p>
      {favoriteDocuments.map((document) => (
        <div key={document._id} className="mt-1">
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={IoDocumentTextOutline}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
            isFavorite={true} // Since this is the favorites list, we can assume all are favorites
          />
          {expanded[document._id] && (
            <FavoritesList // If you want nested favorites, you can call it recursively
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
};