/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { 
  ChevronDown, 
  ChevronRight, 
  LucideIcon,
  MoreHorizontal,
  Plus
} from "lucide-react";
import { IconBase } from "react-icons";
import { IoTrashOutline } from "react-icons/io5";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { RiStarLine } from "react-icons/ri";
import { RiStarOffLine } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon | typeof IconBase;
  navigateTo?: string;
  isFavorite?: boolean;
};

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
  navigateTo,
  isFavorite, 
}: ItemProps) => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const toggleFavorite = useMutation(api.documents.toggleFavorite);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (navigateTo) {
      router.push(navigateTo);
    } else if (onClick) {
      onClick();
    }
  };

  const onArchive = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id })
      .then(() => router.push("/documents"))

    toast.promise(promise, {
      loading: "Archiving Document...",
      success: "Document archived successfully!",
      error: "Failed to archive Document. Please try again later.",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id })
      .then((documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      });

      toast.promise(promise, {
        loading: "Creating a new Note...",
        success: "New Note created successfully!",
        error: "Failed to create a new Note. Please try again later.",
    });
  };

  const onToggleFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = toggleFavorite({ id })
      .then(() => {
        toast.success("Document favorite status updated!");
      })
      .catch(() => {
        toast.error("Failed to update favorite status. Please try again later.");
      });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={handleClick}
      role="button"
      style={{paddingLeft: level ? `${(level * 12) + 12}px` : "12px"}}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-neutral-700/50 flex items-center text-muted-foreground font-medium rounded-sm",
        active && "bg-neutral-700/40 text-white"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon
            className="h-4 w-4 shrink-0 text-muted-foreground/50"
          />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">
          {documentIcon}
        </div>
      ) : (
        <Icon
          className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"
        />
      )}
      <span className="truncate">
        {label}
      </span>
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              asChild
            >
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-700"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-70 bg-[#262626] border-[#262626] text-white"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem className="flex items-center justify-center rounded-t-none-sm text-white m-2">
                <div
                  onClick={onToggleFavorite}
                  role="button"
                  className="flex flex-row items-center justify-center text-sm w-full mr-20"
                >
                  {isFavorite ? (
                    <>
                      <RiStarOffLine className="h-4 w-4 mr-2" />
                      Remove from Favorites
                    </>
                  ) : (
                    <>
                      <RiStarLine className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </>
                  )}
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#e1ffe133]" />
              <DropdownMenuItem onClick={onArchive} className="m-2">
                <IoTrashOutline className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#e1ffe133]" />
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
                    <p>Edited by <span className="text-white">{user?.fullName}</span> </p>
                    <p>Edited by <span className="text-white">{user?.fullName}</span> </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-700"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4 bg-neutral-700/60" />
      <Skeleton className="h-4 w-[30%] bg-neutral-700/60" />
    </div>
  );
}
