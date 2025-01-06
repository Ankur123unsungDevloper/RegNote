/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { IoDocumentTextOutline } from "react-icons/io5"


interface DocumentCardProps {
  title: string
  date?: string
  coverImage?: string
  emoji?: string
  className?: string
  onClick?: () => void
}
export const DocumentCard = ({
  title,
  date,
  coverImage,
  emoji,
  className,
  onClick
}: DocumentCardProps) => {
  
  const { user } = useUser();

  return (
    <>
      <div
        onClick={onClick}
        role="button"
        className={cn(
          "group relative flex flex-col overflow-hidden h-[160px] w-[150px] bg-neutral-400 dark:bg-neutral-800 rounded-2xl m-4",
          className
        )}
        tabIndex={0}
      >
        <div 
          className={cn(
            "h-[60px] rounded-t-2xl",
            coverImage ? "bg-cover bg-center" : "bg-neutral-300/25 dark:bg-neutral-700"
          )}
          style={coverImage ? { backgroundImage: `url(${coverImage})` } : {}}
        />
        {emoji ? (
          <span className="h-8 w-8 relative bottom-[15px] left-[20px] flex items-center justify-center rounded text-xl">
            {emoji}
          </span>
        ) : (
          <IoDocumentTextOutline className="h-8 w-8 relative bottom-[15px] left-[20px] text-neutral-800 dark:text-muted-foreground" />
        )}
        <div className="flex flex-col ml-6 mb-4">
          <span className="text-base font-semibold text-neutral-800 dark:text-muted-foreground line-clamp-1">
            {title}
          </span>
          {date && (
            <div className="flex items-center gap-2 text-xs text-neutral-800 dark:text-muted-foreground mt-3">
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={user?.imageUrl}
                  className="rounded-full"
                />
              </Avatar>
              {date}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
