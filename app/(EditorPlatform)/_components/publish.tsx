/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";

import { useMutation } from "convex/react";
import {
  Check,
  Copy
} from "lucide-react";
import { AiOutlineGlobal } from "react-icons/ai";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProps {
  initialData: Doc<"documents">
};

export const Publish = ({
  initialData
}: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    })
      .finally(() => setIsSubmitting(false));

      toast.promise(promise, {
        loading: "Publishing...",
        success: "Note published",
        error: "Failed to published note.",
      });
    };

    const onUnpublish = () => {
      setIsSubmitting(true);
  
      const promise = update({
        id: initialData._id,
        isPublished: false,
      })
        .finally(() => setIsSubmitting(false));
  
      toast.promise(promise, {
        loading: "Unpublishing...",
        success: "Note unpublished",
        error: "Failed to unpublish note.",
      });
    };
  
    const onCopy = () => {
      navigator.clipboard.writeText(url);
      setCopied(true);
  
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="ghost" className="dark:text-white">
            Share 
            {initialData.isPublished && (
              <AiOutlineGlobal
                className="text-sky-500 animate-pulse w-4 h-4 ml-2"
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[30rem] bg-neutral-800 relative right-10 rounded-xl"
        >
          <Tabs defaultValue="share" className="w-[28rem] -mt-4">
            <TabsList className="space-x-2">
              <TabsTrigger value="share" className="hover:bg-neutral-700/50">Share</TabsTrigger>
              <TabsTrigger value="publish" className="hover:bg-neutral-700/50">Publish</TabsTrigger>
            </TabsList>
            <Separator className="bg-neutral-700" />
            <TabsContent value="share">This feature is coming soon.</TabsContent>
            <TabsContent value="publish">
              {initialData.isPublished ? (
                <div className="space-y-4 w-full">
                  <div className="flex items-center justify-center gap-x-2 w-full">
                    <AiOutlineGlobal className="text-sky-500 animate-pulse h-4 w-4" />
                    <p className="text-xs font-medium text-sky-500">
                      This note is live on web.
                    </p>
                  </div>
                  <div className="flex items-center w-full">
                    <input 
                      className="flex-1 px-2 text-xs border rounded-l-md w-full h-8 bg-neutral-700 truncate"
                      value={url}
                      disabled
                    />
                    <Button
                      onClick={onCopy}
                      disabled={copied}
                      className="h-8 rounded-l-none bg-white"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    className="w-full text-white font-bold text-xs bg-sky-500 hover:bg-sky-600"
                    disabled={isSubmitting}
                    onClick={onUnpublish}
                  >
                    Unpublished
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <AiOutlineGlobal
                    className="h-8 w-8 text-muted-foreground mb-2"
                  />
                  <p className="text-sm font-medium mb-2">
                    Publish this note
                  </p>
                  <span className="text-xs text-muted-foreground mb-4">
                    Share your work with others.
                  </span>
                  <Button
                    disabled={isSubmitting}
                    onClick={onPublish}
                    className="w-full font-bold text-white text-xs bg-sky-500 hover:bg-sky-600"
                    size="sm"
                  >
                    Publish
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
  )
}