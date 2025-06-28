import { cn } from "@/lib/utils"
import { CgAddR } from "react-icons/cg"

interface NewPageCardProps {
  onClick?: () => void
  className?: string
}
export const NewPageCard = ({
  onClick,
  className
}: NewPageCardProps) => {
  return (
    <>
      <div
        onClick={onClick}
        role="button"
        className={cn(
          "group relative flex flex-col overflow-hidden h-[160px] w-[150px] bg-neutral-400 dark:bg-neutral-800 rounded-2xl m-4 order-last",
          className
        )}
        tabIndex={0}
      >
        <div className="bg-neutral-300/25 dark:bg-neutral-700 p-7 rounded-t-2xl"></div>
        <CgAddR className="h-8 w-8 relative bottom-[15px] left-[20px] text-neutral-700 dark:text-muted-foreground" />
        <div className="flex text-base font-semibold text-neutral-700 dark:text-muted-foreground ml-6 items-center">
          New Page
        </div>
      </div>
    </>
  )
}