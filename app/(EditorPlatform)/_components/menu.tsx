/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent
} from "@/components/ui/tooltip";
import { FaFileImport } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Export } from "./export";
import { useUser } from "@clerk/nextjs";
import { SearchTab } from "@/components/search-tab";

interface MenuProps {
  documentId: Id<"documents">;
};

export const Menu = ({
  documentId
}: MenuProps) => {

  const {user} = useUser();

  const router = useRouter();
  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId })

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Document moved to trash.",
      error: "Failed to move the document to trash."
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="dark:text-white"
        >
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 dark:bg-neutral-800"
        align="end"
        alignOffset={8}
        forceMount
      >
        <div className="flex items-center justify-center p-2">
          <SearchTab />
        </div>
        <div className=""></div>
        <DropdownMenuItem onClick={onArchive} className="m-2 dark:hover:bg-neutral-700/50">
        <IoTrashOutline className="h-5 w-5 mr-2" />
          Move to Trash
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-neutral-700" />
        <DropdownMenuItem className="m-2 dark:hover:bg-neutral-700/50">
        <FaFileImport className="h-5 w-5 mr-4 -ml-1" />
          Import
        </DropdownMenuItem >
        <DropdownMenuItem className="m-2 dark:hover:bg-neutral-700/50">
          <Export />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-neutral-700" />
        
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex flex-col items-center justify-center p-2">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Last edited by {user?.fullName}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last edited by {user?.fullName}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-neutral-800 text-muted-foreground border-neutral-800 relative left-[230px] top-[55px] text-xs">
                    <p>Edited by <span className="text-white">{user?.fullName}</span></p>
                    <p>Edited by <span className="text-white">{user?.fullName}</span></p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className="h-2 w-20" />
  )
}