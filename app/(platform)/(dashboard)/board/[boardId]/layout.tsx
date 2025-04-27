import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";

import { BoardNavbar } from "./_components/board-navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export async function generateMetadata({ 
  params
}: {
  params: { boardId: string; };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string; };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-screen bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
        <BoardNavbar
          data={board}
        /> 
        <div className="absolute inset-0 bg-black opacity-50" />
      <main className="relative pt-28 h-full">
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </main>
    </div>
  );
};

export default BoardIdLayout;