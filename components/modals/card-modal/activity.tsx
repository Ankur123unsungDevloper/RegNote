/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { ActivityIcon } from 'lucide-react';
import { useParams } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { AuditLog } from "@prisma/client";

import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { ActivityItem } from "@/components/activity-item";
import { useUser } from "@clerk/nextjs";
import { Checkbox } from "@/components/ui/checkbox";


interface ActivityProps {
  items: AuditLog[];
  cardId: string;
};

export const Activity = ({
  items,
  cardId,
}: ActivityProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  }

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
      });
      toast.success(`Comment added`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const comment = formData.get("comment") as string;
    const boardId = params.boardId as string;

    execute({
      id: cardId,
      boardId: boardId,
      description: comment, // Using description field for comments
    })
  }

  return (
    <>
      <div className="flex items-start gap-x-3 w-full">
        <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-600" />
        <div className="w-full">
          <p className="font-semibold text-neutral-600 mb-2">
            Activity
          </p>
        </div>
      </div>
      <div className="flex items-start gap-x-3 w-full">
        <li className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
        </li>
        {isEditing ? (
            <form
              ref={formRef}
              action={onSubmit}
              className="space-y-2"
            >
              <FormTextarea
                id="comment"
                className="w-full bg-neutral-900 min-h-[20px] text-sm py-2"
                placeholder="Write a comment..."
                ref={textareaRef}
                errors={fieldErrors}
              />
              <div className="flex items-center gap-x-2">
                <FormSubmit>
                  Save
                </FormSubmit>
                <div className="flex items-center gap-x-2 ml-auto">
                  <Checkbox id="watch" />
                  <label 
                    htmlFor="watch" 
                    className="text-sm text-muted-foreground"
                  >
                    Watch
                  </label>
                </div>
              </div>
            </form>
          ) : (
            <div
              onClick={enableEditing}
              role="button"
              className="min-h-[20px] bg-neutral-900 text-neutral-700 text-sm px-3 py-2 rounded-md w-full"
            >
              Write a comment...
            </div>
          )}
      </div>
      <ol className="mt-2 space-y-4">
        {items.map((item) => (
          <ActivityItem
            key={item.id}
            data={item} 
          />
        ))}
      </ol>
    </>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};