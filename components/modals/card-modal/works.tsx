/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { Trash, User } from "lucide-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TiTag } from "react-icons/ti";
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import { useParams } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { Calender } from "./_components/calender";

interface WorksProps {
  data: CardWithList;
};

export const Works = ({
  data,
}: WorksProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { 
    execute: executeCopyCard,
    isLoading: isLoadingCopy,
  } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { 
    execute: executeDeleteCard,
    isLoading: isLoadingDelete,
  } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" deleted`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };
  
  return (
    <div className="space-y-2 mt-2">
      <Button
        variant="gray"
        className="w-full justify-start bg-neutral-700 hover:bg-neutral-500 text-neutral-400"
        size="inline"
      >
        <AiOutlineUserAdd className="h-5 w-5 mr-2" />
        Join
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start bg-neutral-700 hover:bg-neutral-500 text-neutral-400"
        size="inline"
      >
        <User className="h-5 w-5 mr-2" />
        Member
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start bg-neutral-700 hover:bg-neutral-500 text-neutral-400"
        size="inline"
      >
        <TiTag className="h-5 w-5 mr-2 rotate-[-90deg]" />
        Labels
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start bg-neutral-700 hover:bg-neutral-500 text-neutral-400"
        size="inline"
      >
        <IoMdCheckboxOutline className="h-5 w-5 mr-2" />
        Checklist
      </Button>
      <Dialog>
        <DialogTrigger className="w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <Button
                  variant="gray"
                  className="w-full justify-start bg-neutral-700 hover:bg-neutral-500 text-neutral-400"
                  size="inline"
                >
                  <IoMdTime className="h-5 w-5 mr-2" />
                  Dates
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Dates</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent className="w-[28rem] h-[42rem] mt-12">
          <Calender />
        </DialogContent>
      </Dialog>
      <Button
        variant="gray"
        className="w-full justify-start bg-neutral-700 hover:bg-neutral-500 text-neutral-400"
        size="inline"
      >
        <RiAttachment2 className="h-5 w-5 mr-2" />
        Attachment
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start bg-neutral-700 hover:bg-neutral-500 text-neutral-400"
        size="inline"
      >
        <Trash className="h-5 w-5 mr-2" />
        Cover
      </Button>
      <Button
        variant="gray"
        className="w-full justify-start bg-neutral-700 hover:bg-neutral-500 text-neutral-400"
        size="inline"
      >
        <IoMdTime className="h-5 w-5 mr-2" />
        Custom Fields
      </Button>
    </div>
  );
};

Works.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-5 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
