"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { RxQuestionMarkCircled } from "react-icons/rx";

export const TeamspaceBox = () => {
  const {user} = useUser();


  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 mt-4">
      <DialogHeader className="flex flex-row border-b border-neutral-700 pb-2 mt-2">
        <p className="text-[0.8rem] text-muted-foreground">
          Create your first teamspace to start using RegNote with your teammates
        </p>
      </DialogHeader>
      <div className="flex items-center justify-center mt-12 px-4">
        <div className="flex flex-col gap-y-1">
          <Label>
            Create a new teamspace
          </Label>
          <p className="text-[0.8rem] text-muted-foreground">
            Teamspaces are where your team organizes pages, permissions, and members
          </p>
        </div>
      </div>
      <div className="flex items-center mt-4 px-4">
        <p className="text-[0.8rem] text-muted-foreground">
          Everyone at {user?.firstName}&apos;s RegNote and new members will have access to this teamspace
        </p>
      </div>
      <div className="flex flex-row gap-x-[80px] mt-12">
        <Button variant="ghost" className="text-[1rem] text-gray-400 hover:text-white hover:bg-neutral-700 gap-x-1" size="sm">
          <RxQuestionMarkCircled />
          <p>
            Learn about Teamspaces
          </p>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-gray-400 hover:text-white" size="sm">
          <Link href="/select-org">
            Create teamspace
          </Link>
        </Button>
      </div>
    </div>
  )
}
