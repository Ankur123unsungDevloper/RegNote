/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { 
  ChevronDown, 
  ChevronRight, 
  LucideIcon,
  MoreHorizontal,
  Plus,
  Star,
  StarOff
} from "lucide-react";
import { IconBase } from "react-icons";
import {
  IoCreateOutline,
  IoTrashOutline
} from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { BiLinkAlt } from "react-icons/bi";
import { MdOutlineTurnRight } from "react-icons/md";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { TbLayoutSidebarRightFilled } from "react-icons/tb";
import { FiArrowUpRight } from "react-icons/fi";

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
  isFavorite?: boolean;
  isFavoriteList?: boolean;
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
  isFavorite,
  isFavoriteList
}: ItemProps) => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const setFavorite = useMutation(api.documents.setFavorite);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Archiving Document...",
      success: "Document archived successfully!",
      error: "Failed to archive Document. Please try again later.",
    });
  };

  const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then((documentId) => {
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

  const favoriteState = isFavorite;

  const onFavoriteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = setFavorite({
      id,
      isFavorite: !favoriteState,
    });

    toast.promise(promise, {
      loading: "Updating favorite...",
      success: !favoriteState
        ? "Added to favorites"
        : "Removed from favorites",
      error: "Failed to update favorite",
    });
  };


  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${(level * 12) + 12}px` : "12px" }}
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
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">
          {documentIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>

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
              className="w-[265px] h-[374.4px] bg-[#262626] border-[#262626] text-white"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-muted-foreground text-xs">Page</DropdownMenuLabel>
                <DropdownMenuItem className="flex items-center justify-center rounded-t-none-sm text-white mx-2 dark:hover:bg-neutral-700/50">
                  <div
                    onClick={onFavoriteClick}
                    className="flex items-center text-sm w-full cursor-pointer"
                  >
                    {isFavoriteList ? (
                      <>
                        <StarOff className="h-4 w-4 mr-2" />
                        Remove from Favorites
                      </>
                    ) : favoriteState ? (
                      <>
                        <StarOff className="h-4 w-4 mr-2" />
                        Remove from Favorites
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4 mr-2" />
                        Add to Favorites
                      </>
                    )}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#e1ffe133]" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                  <BiLinkAlt className="h-5 w-5 mr-2" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                  <LuCopy className="h-5 w-5 mr-2" />
                  Duplicate
                  <DropdownMenuShortcut className="text-sm tracking-tighter">Ctrl + D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                  <IoCreateOutline className="h-5 w-5 mr-2" />
                  Rename
                  <DropdownMenuShortcut className="text-sm tracking-tighter">Ctrl + R</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                  <MdOutlineTurnRight className="h-5 w-5 mr-2" />
                  Move To
                  <DropdownMenuShortcut className="text-sm tracking-tighter">Ctrl + P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onArchive} className="mx-2 dark:hover:bg-neutral-700/50 dark:hover:text-red-700 hover:text-red-700">
                  <IoTrashOutline className="h-4 w-4 mr-2" />
                    Move To Trash
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#e1ffe133]" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                  <MdOutlineTurnRight className="h-5 w-5 mr-2" />
                  Turn into Wiki
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#e1ffe133]" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                  <FiArrowUpRight className="h-5 w-5 mr-2" />
                  Open in new tab
                  <DropdownMenuShortcut className="text-sm tracking-tighter">Ctrl + R</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                  <TbLayoutSidebarRightFilled className="h-5 w-5 mr-2" />
                  Open in side peak
                  <DropdownMenuShortcut className="text-sm tracking-tighter">Alt + Click</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#e1ffe133]" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex flex-col items-start justify-start text-start p-2">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Last edited by {user?.fullName}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Today at {user?.fullName}
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
  );
};

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
};
