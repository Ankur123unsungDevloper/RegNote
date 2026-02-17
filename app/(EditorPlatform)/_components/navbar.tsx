"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { Publish } from "./publish";
import { Favorite } from "./favorite";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export const Navbar = ({
  isCollapsed,
  onResetWidth
}: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  function formatLastUpdated(updatedAt: string | number | Date) {
    const updated = new Date(updatedAt);
    const now = new Date();

    const diffMs = now.getTime() - updated.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    // ✅ Within 24 hours
    if (diffHours < 24) {

      // If less than 1 hour → minutes
      if (diffHours < 1) {
        const mins = Math.floor(diffMs / (1000 * 60));
        return mins <= 1 ? "Just now" : `${mins}m ago`;
      }

      // If within 24 hours → hours OR exact time (your choice)
      const hrs = Math.floor(diffHours);

      // Option A → show hours ago
      return `${hrs}h ago`;

      // Option B → show exact time (use instead if you prefer)
      // return updated.toLocaleTimeString("en-IN", {
      //   hour: "numeric",
      //   minute: "2-digit",
      //   hour12: true,
      // });
    }

    // ✅ More than 24 hours → show date
    return updated.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }


  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    )
  }

  if (document === null) {
    return null;
  }
  
  const formattedUpdatedTime = formatLastUpdated(document.updatedAt);

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full ml-4">
          <Title initialData={document} />
          <div className="flex items-center gap-x-1">
            <div className="text-xs text-muted-foreground p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full hover:rounded-sm text-sm">
                    Edited <span>{formattedUpdatedTime}</span>
                  </TooltipTrigger>
                  <TooltipContent className="text-muted-foreground relative left-[35px] top-[1px]">
                    <p className="text-sm font-medium">
                      Edited by <span className="font-bold text-gray-300">{document.lastEditedBy}</span> <span>{formattedUpdatedTime}</span>
                    </p>
                    <p className="text-sm font-medium">
                      Created by <span className="font-bold text-gray-300">{document.createdBy}</span> <span>{formattedUpdatedTime}</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Publish initialData={document} />
            <Favorite
              documentId={document._id}
              isFavorite={document.isFavorite}
            />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && (
        <Banner documentId={document._id} />
      )}
    </>
  );
};