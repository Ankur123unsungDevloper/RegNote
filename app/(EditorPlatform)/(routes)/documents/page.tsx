/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { CgAddR } from "react-icons/cg";

import { useUser } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";

import { toast } from "sonner";
import { useRouter } from "next/navigation";



const DocumentPage = () => {
  const router = useRouter();

  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
    .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created successfully!",
      error: "Failed to create a new note. Please try again later.",
    })
  }

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "morning";
    } else if (hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  return (
    <div className="h-full flex flex-col items-center relative top-[3rem] p-8">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-gray-300 text-3xl font-semibold">
          Good {getGreeting()},&nbsp;
          <span className="font-bold uppercase">
            {user?.fullName}
          </span>
        </h1>
      </div>
      <div
        onClick={() => {}}
        role="button"
        className="h-8 w-8 rounded-sm hover:bg-neutral-700/30 relative bottom-24 left-[38rem]"
      >
        <BiDotsHorizontalRounded
          className="h-8 w-8"
        />
      </div>
      {/* Add your document content here */}
      <div className="flex flex-col mb-8 relative right-[285px] top-[65px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex flex-row items-center p-4 space-x-1">
            <CiClock2 className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Recent visited
            </p>
          </TooltipTrigger>
          <TooltipContent className="bg-neutral-700/50 text-white border-neutral-700/50">
            <p>Jump into pages you&apos;ve seen recently</p>
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        <div className="h-auto w-full flex items-center">
          <div
            onClick={onCreate}
            role="button"
            className="flex flex-col h-[160px] w-[150px] bg-neutral-800 rounded-2xl m-4"
          >
            <div className="bg-neutral-700 p-7 rounded-t-2xl"></div>
            <CgAddR className="h-6 w-6 absolute top-[110px] left-[40px] text-muted-foreground" />
            <div className="flex text-base font-semibold text-muted-foreground mt-7 ml-6 items-center">
              Untitled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;