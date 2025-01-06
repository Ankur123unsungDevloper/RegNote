/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { 
  ChevronsLeft,
  MenuIcon
} from "lucide-react";
import {
  ElementRef,
  useRef,
  useState
} from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import {useParams} from "next/navigation";

import { UserItem } from "./user-item";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Item } from "./item";
import {
  IoSearch,
  IoSettingsOutline,
  IoTrashOutline
} from "react-icons/io5";
import { BsInbox } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { DocumentList } from "./document-list";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { SettingBox } from "./setting-box";
import { PiUserRectangleFill } from "react-icons/pi";
import { TeamspaceBox } from "./teamspace-box";
import { useInbox } from "@/hooks/use-inbox";
import { Navbar } from "./navbar";

import { usePathname } from "next/navigation";


export const Navigation = () => {

  const pathname = usePathname();
  const search = useSearch();
  const inbox = useInbox();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 250) newWidth = 250;
    if (newWidth > 490) newWidth = 490;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "250px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 250px)"
      );
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "250px"
      );
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div className="m-2">
          <div className="grid grid-flow-row items-center justify-start h-8 rounded-sm dark:hover:bg-neutral-700/40">
            <UserItem />
            <div
              onClick={collapse}
              role="button"
              className={cn(
                "h-8 w-8 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white absolute right-10 mr-2 p-1 flex items-center justify-center opacity-0 group-hover/sidebar:opacity-100",
                isMobile && "opacity-100"
              )}
            >
              <ChevronsLeft className="h-8 w-8 font-bold" />
            </div>
          </div>
          <div className="mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700">
                  <Item
                    label="Search"
                    icon={IoSearch}
                    onClick={search.onOpen}
                  />
                </TooltipTrigger>
                <TooltipContent className="text-muted-foreground relative left-[235px] bottom-[40px] bg-neutral-700 text-white border-neutral-700">
                  <h6 className="text-white">
                    Search and quickly jump to a page
                  </h6>
                  <p className="text-xs font-medium text-muted-foreground mt-1">
                    Ctrl+K
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700">
                  <Item
                    label="Home"
                    icon={GrHomeRounded}
                    navigateTo="/documents"
                    active={pathname === "/documents"}
                  />
                </TooltipTrigger>
                <TooltipContent className="text-muted-foreground relative left-[225px] top-[55px] bg-neutral-700 text-white border-neutral-700">
                  <h6 className="text-white">
                    View recent pages and more
                  </h6>
                  <p className="text-xs font-medium text-muted-foreground mt-1">
                    Ctrl+Alt+H
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700">
                  <Item
                    label="Inbox"
                    icon={BsInbox}
                    onClick={inbox.onOpen}
                  />
                </TooltipTrigger>
                <TooltipContent className="text-muted-foreground relative left-[245px] top-[57px] bg-neutral-700 text-white border-neutral-700">
                  <h6 className="text-white">
                    View recent update and notifications
                  </h6>
                  <p className="text-xs font-medium text-muted-foreground mt-1">
                    Ctrl+Alt+U
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-muted-foreground text-xs ml-4 hover:no-underline">
                  Private
                </AccordionTrigger>
                <AccordionContent>
                  <DocumentList />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-4">
              <Dialog>
                <DialogTrigger className="w-full mt-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                      <Item
                        label="Settings"
                        icon={IoSettingsOutline}
                      />
                      </TooltipTrigger>
                      <TooltipContent className="text-muted-foreground relative left-[230px] top-[32px] bg-neutral-700 text-white border-neutral-700">
                        <p className="text-xs">
                          Manage your account and settings.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTrigger>
                <DialogContent className="flex items-center justify-center p-0 h-[45rem] w-[70rem] dark:bg-neutral-800 text-white border-neutral-800">
                  <SettingBox />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="w-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                        <Item
                          label="Teamspace"
                          icon={PiUserRectangleFill}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="text-muted-foreground relative left-[235px] top-[54px] bg-neutral-700 text-white border-neutral-700">
                        <p>
                          Access and manage your team&apos;s documents and collaborate<br></br>
                          with your team members.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTrigger>
                <DialogContent className="flex items-center justify-center p-0 h-80 w-[30rem] dark:bg-neutral-800 text-white border-neutral-800">
                  <TeamspaceBox />
                </DialogContent>
              </Dialog>
              <Popover>
                <PopoverTrigger className="w-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                      <Item
                        label="Trash"
                        icon={IoTrashOutline}
                      />
                      </TooltipTrigger>
                      <TooltipContent className="text-muted-foreground relative left-[195px] top-[34px] bg-neutral-700 text-white border-neutral-700">
                        <p className="text-xs">
                          Restore deleted pages.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 mt-[15.5rem] h-80 w-[28rem] bg-neutral-800 text-white border-neutral-800"
                  side={isMobile ? "bottom" : "right"}
                >
                  <TrashBox />
                </PopoverContent>
              </Popover>
              </div>
          </div>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-0.5 bg-[#e1ffe133] right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!! params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {
              isCollapsed &&
              <MenuIcon
                role="button"
                onClick={resetWidth}
                className="h-6 w-6 text-muted-foreground"
              />
            }
          </nav>
        )}
      </div>
    </>
  )
}
