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
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useInbox } from "@/hooks/use-inbox";


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
      if (e.key === "U" && (e.metaKey || e.ctrlKey || e.altKey) && (e.metaKey || e.altKey)) {
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </CommandDialog>
  );
};
