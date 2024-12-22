/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button";


interface IconPickerProps {
  onChange: (icon: string) => void;
  onRemove: () => void; // Add this line
  children: React.ReactNode;
  asChild?: boolean;
};

export const IconPicker = ({
  onChange,
  onRemove, // Add this line
  children,
  asChild
}: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap

  const themeMap = {
    "dark": Theme.DARK,
    "light": Theme.LIGHT
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[30rem] bg-neutral-800 border-none shadow-none">
      <Tabs defaultValue="emojis" className="w-[30rem]">
        <TabsList className="grid grid-cols-2 justify-items-start space-x-[9rem]">
          <div className="col-span-1 mb-2 space-x-1">
            <TabsTrigger value="emojis" className="hover:bg-neutral-700">Emojis</TabsTrigger>
            <TabsTrigger value="icons" className="hover:bg-neutral-700">Icons</TabsTrigger>
            <TabsTrigger value="custom" className="hover:bg-neutral-700">Custom</TabsTrigger>
          </div>
          <div className="col-span-1 -mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="font-bold hover:bg-neutral-700"
              onClick={onRemove}
            >
              Remove
            </Button>
          </div>
        
        </TabsList>
        <Separator className="bg-neutral-700 mb-2" />
        <TabsContent value="emojis">
          <EmojiPicker
            height={480}
            width={480}
            theme={theme}
            onEmojiClick={(data) => onChange(data.emoji)}
          />
        </TabsContent>
        <TabsContent value="icons">This feature is coming soon.</TabsContent>
        <TabsContent value="custom">This feature is coming soon 2.</TabsContent>
      </Tabs>
        
      </PopoverContent>
    </Popover>
  )
}