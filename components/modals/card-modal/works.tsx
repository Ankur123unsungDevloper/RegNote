/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { User } from "lucide-react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TiTag } from "react-icons/ti";
import { IoMdCheckboxOutline, IoMdTime } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import { FaImage } from "react-icons/fa6";

import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CardWithList } from "@/types";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { updateCard } from "@/actions/update-card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useAction } from "@/hooks/use-action";
import { useCardCover } from "@/hooks/use-card-cover";
import { useCardModal } from "@/hooks/use-card-modal";

import { Calender } from "./_components/calender";
import { Cover } from "./_components/cover";
import type { CoverValue } from "./_components/cover";
import { useState } from "react";

interface WorksProps {
  data: CardWithList;
}

/* ---------------- COVER MAPPER ---------------- */

const mapCoverToDb = (value: CoverValue) => {
  if (!value) return null;

  if (value.type === "COLOR") {
    return {
      type: "COLOR" as const,
      color: value.bg?.replace("bg-", "").replace("-400", ""),
      pattern: value.pattern ?? null,
    };
  }

  if (value.type === "IMAGE") {
    return {
      type: "IMAGE" as const,
      imageUrl: value.imageUrl ?? null,
      imageSource: "unsplash" as const,
    };
  }

  return null;
};



/* ---------------- COMPONENT ---------------- */

export const Works = ({ data }: WorksProps) => {
  const params = useParams();
  const boardId = params.boardId as string;
  const cardModal = useCardModal();
  
  const toggle = useCardCover((store) => store.toggle);
  const isOpen = useCardCover((store) => store.isOpen);
  const onClose = useCardCover((store) => store.onClose);

  /* ---------------- ACTIONS ---------------- */

  const { execute: executeCopyCard } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`);
      cardModal.onClose();
    },
    onError: toast.error,
  });

  const { execute: executeDeleteCard } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" deleted`);
      cardModal.onClose();
    },
    onError: toast.error,
  });

  const { execute: executeUpdateCard } = useAction(updateCard, {
    onSuccess: () => toast.success("Card updated"),
    onError: toast.error,
  });

  const [draftCover, setDraftCover] = useState<CoverValue | null>(
    data.cover as CoverValue | null
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-2 mt-2">
      <Button variant="gray" className="w-full justify-start">
        <AiOutlineUserAdd className="h-5 w-5 mr-2" />
        Join
      </Button>

      <Button variant="gray" className="w-full justify-start">
        <User className="h-5 w-5 mr-2" />
        Member
      </Button>

      <Button variant="gray" className="w-full justify-start">
        <TiTag className="h-5 w-5 mr-2 rotate-[-90deg]" />
        Labels
      </Button>

      <Button variant="gray" className="w-full justify-start">
        <IoMdCheckboxOutline className="h-5 w-5 mr-2" />
        Checklist
      </Button>

      {/* Dates */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="gray" className="w-full justify-start">
            <IoMdTime className="h-5 w-5 mr-2" />
            Dates
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[28rem] h-[42rem] mt-12">
          <Calender />
        </DialogContent>
      </Dialog>

      <Button variant="gray" className="w-full justify-start">
        <RiAttachment2 className="h-5 w-5 mr-2" />
        Attachment
      </Button>

      {/* Cover */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          open ? toggle() : toggle();
        }}
      >
        <DialogTrigger asChild>
          <Button variant="gray" className="w-full justify-start">
            <FaImage className="h-5 w-5 mr-2" />
            Cover
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[450px]">
          <Cover
            value={draftCover}
            onChange={(value) => setDraftCover(value)}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>

      <Button variant="gray" className="w-full justify-start">
        <IoMdTime className="h-5 w-5 mr-2" />
        Custom Fields
      </Button>
    </div>
  );
};

/* ---------------- SKELETON ---------------- */

Works.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
    </div>
  );
};
