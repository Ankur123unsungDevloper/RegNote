/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";

const OrganizationIdPage = async () => {
  
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4"/>
      <div className="px-2 md:px-2">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;