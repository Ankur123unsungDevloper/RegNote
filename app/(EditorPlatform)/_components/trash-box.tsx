/* eslint-disable @typescript-eslint/no-unused-vars */
"use client;"

import { useState } from "react";
import {
  useMutation,
  useQuery
} from "convex/react";
import {
  useParams,
  useRouter
} from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IoTrashOutline } from "react-icons/io5";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { RxQuestionMarkCircled } from "react-icons/rx";

export const TrashBox = () => {
  
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  

  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored successfully!",
      error: "Failed to restore note."
    });
  };

  const onRemove = (
    documentId: Id<"documents">,
  ) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Removing note from trash...",
      success: "Note removed successfully!",
      error: "Failed to remove note from trash."
    });

    if (params.documentId === documentId) {
      router.push("/documents")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-sm h-full w-full">
      <div className="flex items-center justify-center p-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search page in Trash"
          className="h-8 w-[27rem] mb-[2rem] px-2 focus-visible:ring-transparent bg-neutral-700/40 data-[state=active]:border-[3px] data-[state=active]:border-blue-500"
        />
      </div>
      <div className="flex flex-row items-center justify-around">
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </div>
      {filteredDocuments && filteredDocuments.length > 0 ? (
        filteredDocuments.map((document) => (
          <div
            key={document._id}
            className="w-full p-2"
          >
            <div
              role="button"
              onClick={() => onClick(document._id)}
              className="flex items-center justify-between text-sm rounded-sm w-full hover:bg-neutral-200 dark:hover:bg-neutral-700/50 text-white border-neutral-600"
            >
              <span className="truncate pl-2">
                {document.title}
              </span>
              <div className="flex items-center">
                <div
                  onClick={(e) => onRestore(e, document._id)}
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Undo className="h-4 w-4 text-muted-foreground" />
                </div>
                <ConfirmModal onConfirm={() => onRemove(document._id)}>
                  <div
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  >
                    <IoTrashOutline className="h-4 w-4 text-muted-foreground" />
                  </div>
                </ConfirmModal>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col mt-4 px-1 items-center justify-center h-[15rem] w-full">
          <div className="h-10 w-10 text-muted-foreground">
            <IoTrashOutline className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-center text-muted-foreground pb-2 mt-2">
            No results
          </p>
        </div>
      )}
      <div className="flex flex-row items-center bg-gray-800 w-full rounded-sm p-2 mt-[6rem] gap-x-16">
          <p className="flex items-center text-xs text-muted-foreground">
            Pages in Trash for over 30 days will be automatically deleted
          </p>
        <div>
          <RxQuestionMarkCircled />
        </div>
      </div>
    </div>
  )
}
