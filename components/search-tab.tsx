import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"

export function SearchTab() {
  return (
    <ButtonGroup
      className={cn(
        "relative w-full max-w-md h-8 py-2",
        "flex items-center",
        "rounded-md border bg-neutral-700",
        "focus-within:ring-2 focus-within:ring-blue-500",
        "transition-all"
      )}
    >
      <Button variant="ghost" size="sm" aria-label="Search" className="w-1 h-2 pr-1 ml-2 dark:hover:bg-neutral-700/20">
        <SearchIcon />
      </Button>
      <Input placeholder="Search..." className="flex items-center justify-start" />
    </ButtonGroup>
  )
}
