/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { CgAddR } from "react-icons/cg";
import { IoDocumentTextOutline } from "react-icons/io5";

import { useUser } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  useMutation,
  useQuery
} from "convex/react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DocumentCard } from "./_components/document-card";
import { NewPageCard } from "./_components/newPage-card";



const DocumentPage = () => {
  const router = useRouter();

  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const documents = useQuery(api.documents.getSidebar, {});

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
  
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <div className="h-full flex flex-col items-center p-8 bg-neutral-300 dark:bg-neutral-900">
      <div className="flex flex-row items-center justify-center relative top-[3rem]">
        <h1 className="text-black dark:text-white text-3xl font-semibold">
          Good {getGreeting()},&nbsp;
          <span className="font-bold uppercase text-black dark:text-white">
            {user?.fullName}
          </span>
        </h1>
      </div>
      <div
        onClick={() => {}}
        role="button"
        className="h-8 w-8 rounded-sm hover:bg-neutral-300/30 dark:hover:bg-neutral-700/30 relative bottom-14 left-[38rem]"
      >
        <BiDotsHorizontalRounded
          className="h-8 w-8 text-black dark:text-white"
        />
      </div>
      {/* Add your document content here */}
      <div className="flex flex-col mb-4 w-full max-w-[1200px] relative top-[65px]">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex flex-row items-center space-x-1">
                <CiClock2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Recent visited
                </p>
              </TooltipTrigger>
              <TooltipContent className="dark:bg-neutral-700/50 dark:text-white dark:border-neutral-700/50 ml-20">
                <p>Jump into pages you&apos;ve seen recently</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="h-auto w-full flex items-start flex-wrap-reverse justify-start mt-1">
          {documents?.map((document: Doc<"documents">) => (
            <DocumentCard
              key={document._id}
              title={document.title}
              coverImage={document.coverImage}
              emoji={document.icon}
              date={document.createdAt ? new Date(document.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : undefined}
              onClick={() => onRedirect(document._id)}
            />
          ))}
          <NewPageCard
            onClick={onCreate}
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;