"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";

import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { Publish } from "./publish";
import { Update } from "./update";

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
  const { user } = useUser();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

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
                  <TooltipTrigger className="w-full hover:rounded-sm">
                    Edited by
                  </TooltipTrigger>
                  <TooltipContent className="text-muted-foreground relative left-[35px] top-[1px]">
                    <p className="text-[12px] font-medium">
                      Edited by <span className="font-bold text-[14px] text-gray-300">{user?.fullName}</span>
                    </p>
                    <p className="text-[12px] font-medium">
                      Created by <span className="font-bold text-[14px] text-gray-300">{user?.fullName}</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Publish initialData={document} />
            <Update />
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