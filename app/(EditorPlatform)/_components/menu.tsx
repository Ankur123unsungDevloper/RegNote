/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

import {  MoreHorizontal } from "lucide-react";
import {
  IoClipboardOutline,
  IoTrashOutline
} from "react-icons/io5";
import {
  BiCommentEdit,
  BiImport,
  BiLinkAlt
} from "react-icons/bi";
import {
  LuClock9,
  LuCopy,
  LuUndo2,
} from "react-icons/lu";
import { TfiSmallcap } from "react-icons/tfi";
import { MdOutlineTurnRight } from "react-icons/md";
import { PiSquaresFourLight, PiTranslateBold } from "react-icons/pi";
import { FaArrowsLeftRight, FaLockOpen } from "react-icons/fa6";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Doc } from "@/convex/_generated/dataModel";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Export } from "./export";
import { useUser } from "@clerk/nextjs";

import { SearchTab } from "@/components/search-tab";
import { ToggleSwitch } from "@/components/toggle-switch";
import { GoArrowUpRight, GoBell, GoVersions } from "react-icons/go";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { TbSettings } from "react-icons/tb";

interface MenuProps {
  documentId: Id<"documents">;
  initialData: Doc<"documents">
  currentFont?: string;
};

export const Menu = ({
  documentId,
  initialData,
  currentFont
}: MenuProps) => {

  const { user } = useUser();
  
  const [copied, setCopied] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [smallText, setSmallText] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [lockPage, setLockPage] = useState(false);
  
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  

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

  const setFont = useMutation(api.documents.setFont);

  const handleFontChange = (font: string) => {
    const promise = setFont({
      id: documentId,
      fontFamily: font,
    });

    toast.promise(promise, {
      loading: "Updating font...",
      success: "Font updated",
      error: "Failed to update font",
    });
  };

  const isActive = (font: string) =>
    currentFont === font || (!currentFont && font === "default");

  const activeStyle = "text-blue-500";
  const normalStyle = "text-foreground";

  const url = `${origin}/copylink/${initialData._id}`;

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  
  const [enabled, setEnabled] = useState(false);

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
        className="w-[256px] h-[702.71px] dark:bg-neutral-800"
        align="end"
        alignOffset={8}
        forceMount
      >
        <ScrollArea className="w-[256px] h-[702.71px] rounded-md border">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex items-center justify-center">
                <SearchTab />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="grid grid-cols-3 justify-center items-center text-center gap-x-4 mx-2 -px-2">
                {/* DEFAULT */}
                <Button
                  variant="ghost"
                  onClick={() => handleFontChange("default")}
                  className="flex flex-col dark:hover:bg-neutral-700/50 w-full h-full gap-y-1"
                >
                  <h4 className={`text-3xl font-sans ${isActive("default") ? activeStyle : normalStyle}`}>
                    Ag
                  </h4>
                  <span className="text-[10px]">Default</span>
                </Button>
                {/* SERIF */}
                <Button
                  variant="ghost"
                  onClick={() => handleFontChange("serif")}
                  className="flex flex-col dark:hover:bg-neutral-700/50 w-full h-full gap-y-1"
                >
                  <h4 className={`text-3xl font-serif ${isActive("serif") ? activeStyle : normalStyle}`}>
                    Ag
                  </h4>
                  <span className="text-[10px]">Serif</span>
                </Button>
                {/* MONO */}
                <Button
                  variant="ghost"
                  onClick={() => handleFontChange("mono")}
                  className="flex flex-col dark:hover:bg-neutral-700/50 w-full h-full gap-y-1"
                >
                  <h4 className={`text-3xl font-mono ${isActive("mono") ? activeStyle : normalStyle}`}>
                    Ag
                  </h4>
                  <span className="text-[10px]">Mono</span>
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCopy} className="mx-2 dark:hover:bg-neutral-700/50">
              <BiLinkAlt className="h-5 w-5 mr-2" />
              Copy Link
              <DropdownMenuShortcut className="text-sm tracking-tighter">Ctrl + Alt + L</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCopy} className="mx-2 dark:hover:bg-neutral-700/50">
              <IoClipboardOutline className="h-5 w-5 mr-2" />
              Copy page content
            </DropdownMenuItem>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <LuCopy className="h-5 w-5 mr-2" />
              Duplicate
              <DropdownMenuShortcut className="text-sm tracking-tighter">Ctrl + D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <MdOutlineTurnRight className="h-5 w-5 mr-2" />
              Move To
              <DropdownMenuShortcut className="text-sm tracking-tighter">Ctrl + R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onArchive} className="mx-2 dark:hover:bg-neutral-700/50 dark:hover:text-red-700 hover:text-red-700">
              <IoTrashOutline className="h-5 w-5 mr-2" />
              Move to Trash
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="mx-2 dark:hover:bg-neutral-700/50 p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <DropdownMenuCheckboxItem
                checked={smallText}
                onCheckedChange={(v) => setSmallText(!!v)}
                className="w-full flex items-center justify-between [&>span:first-child]:hidden px-2 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <TfiSmallcap className="h-5 w-5" />
                  <span>Small text</span>
                </div>

                <ToggleSwitch
                  checked={smallText}
                  onChange={setSmallText}
                />
              </DropdownMenuCheckboxItem>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="mx-2 dark:hover:bg-neutral-700/50 p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <DropdownMenuCheckboxItem
                checked={fullWidth}
                onCheckedChange={(v) => setFullWidth(!!v)}
                className="w-full flex items-center justify-between [&>span:first-child]:hidden px-2 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <FaArrowsLeftRight className="h-5 w-5" />
                  <span>Full width</span>
                </div>

                <ToggleSwitch
                  checked={fullWidth}
                  onChange={setFullWidth}
                />
              </DropdownMenuCheckboxItem>
            </DropdownMenuItem>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <HiAdjustmentsHorizontal className="h-5 w-5 mr-2" />
              Customize page
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="mx-2 dark:hover:bg-neutral-700/50 p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <DropdownMenuCheckboxItem
                checked={lockPage}
                onCheckedChange={(v) => setLockPage(!!v)}
                className="w-full flex items-center justify-between [&>span:first-child]:hidden px-2 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <FaLockOpen className="h-5 w-5" />
                  <span>Lock page</span>
                </div>

                <ToggleSwitch
                  checked={lockPage}
                  onChange={setLockPage}
                />
              </DropdownMenuCheckboxItem>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <BiCommentEdit className="h-5 w-5 mr-2" />
              Suggest edits
            </DropdownMenuItem >
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="mx-2 dark:hover:bg-neutral-700/50">
                <PiTranslateBold className="h-5 w-5 mr-2" />
                Translate
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="min-w-[180px] max-w-[calc(-24px + 100vw)] h-[480px] max-h-[70vh] dark:bg-neutral-800 relative bottom-[130px]">
                  <DropdownMenuLabel className="text-muted-foreground text-xs">From</DropdownMenuLabel>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="mx-2 dark:hover:bg-neutral-700/50">
                      English
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="dark:bg-neutral-800">
                      <DropdownMenuItem>
                        <div className="flex items-center justify-center">
                          <SearchTab />
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                    <DropdownMenuSeparator className="bg-neutral-700" />
                  </DropdownMenuSub>
                  <DropdownMenuLabel className="text-muted-foreground text-xs">To</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <div className="flex items-center justify-center">
                      <SearchTab />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    Arabic
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <LuUndo2 className="h-5 w-5 mr-2" />
              Undo
              <DropdownMenuShortcut className="text-sm tracking-tighter">Ctrl + Z</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <BiImport className="h-5 w-5 mr-2" />
              Import
            </DropdownMenuItem >
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <Export />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <MdOutlineTurnRight className="h-5 w-5 mr-2" />
              Turn into wiki
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <LuClock9 className="h-5 w-5 mr-2" />
              Updates & Analytics
            </DropdownMenuItem>
            <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
              <GoVersions className="h-5 w-5 mr-2 rotate-90" />
              Version history
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <GoBell className="h-5 w-5 mr-2" />
                Notify me
              <DropdownMenuShortcut className="text-sm tracking-tighter relative left-6">Comments</DropdownMenuShortcut>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="dark:bg-neutral-800">
                <DropdownMenuCheckboxItem
                  checked={showStatusBar ?? false}
                  onCheckedChange={setShowStatusBar}
                  className="w-60"
                >
                  Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                >
                  Activity Bar
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <PiSquaresFourLight className="h-5 w-5 mr-2" />
                Connections
              <DropdownMenuShortcut className="text-sm tracking-tighter relative left-6">None</DropdownMenuShortcut>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="dark:bg-neutral-800 relative bottom-[100px]">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search for connections..."
                      className={
                        `h-8 w-[20rem] bg-neutral-700/40 
                        ${isFocused ? 'border-2 border-double border-blue-500' : ''}`
                      }
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <ScrollArea className="w-full h-40">
                    <DropdownMenuLabel className="text-muted-foreground text-xs">Add a new connection</DropdownMenuLabel>
                  </ScrollArea>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-neutral-700" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    <TbSettings className="h-5 w-5 mr-2" />
                    Manage connection
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-2 dark:hover:bg-neutral-700/50">
                    <GoArrowUpRight className="h-5 w-5 mr-2" />
                    Develop integration
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-700" />
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
              <TooltipContent className="bg-neutral-800 text-muted-foreground border-neutral-800 relative right-[160px] top-[55px] text-xs">
                <p>Edited by <span className="text-white">{user?.fullName}</span></p>
                <p>Edited by <span className="text-white">{user?.fullName}</span></p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className="h-2 w-20" />
  )
}