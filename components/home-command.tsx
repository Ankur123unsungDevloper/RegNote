"use client";

import {
  useEffect,
  useState
} from "react";

import {
  CommandDialog,
} from "@/components/ui/command";
import { useHome } from "@/hooks/use-home";
import { Command } from "cmdk";

export const HomeCommand = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  const toggle = useHome((store) => store.toggle);
  const isOpen = useHome((store) => store.isOpen);
  const onClose = useHome((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "m" && (e.metaKey || e.ctrlKey) && e.altKey) {
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
    <Command>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
      </CommandDialog>
    </Command>
  )
}