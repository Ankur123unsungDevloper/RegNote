/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { IoDocumentTextOutline } from "react-icons/io5";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
  isFavoriteList?: boolean; // ⭐ ADD THIS
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
  data,
  isFavoriteList = false, // ⭐ ADD THIS
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  const queryResult = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const documents = data ?? queryResult;

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
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
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>

      {documents.map((document) => (
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
            isFavorite={document.isFavorite}
            isFavoriteList={isFavoriteList} // ⭐ PASS DOWN
          />

          {expanded[document._id] && (
            <DocumentList
              parentDocumentId={document._id}
              level={level + 1}
              isFavoriteList={isFavoriteList} // ⭐ IMPORTANT (RECURSION)
            />
          )}
        </div>
      ))}
    </>
  );
};
