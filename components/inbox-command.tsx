/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useEffect,
  useState
} from "react";

import {
  CommandDialog,
  CommandList,
} from "@/components/ui/command";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useInbox } from "@/hooks/use-inbox";
import { cn } from "@/lib/utils";


export const InboxCommand = () => {
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useInbox((store) => store.toggle);
  const isOpen = useInbox((store) => store.isOpen);
  const onClose = useInbox((store) => store.onClose);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "I" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  
  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <aside
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]"
        )}
      >
        <div>Hi</div>
      </aside>
    </CommandDialog>
  );
};
