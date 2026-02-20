import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

export function SearchTab() {
  return (
    <InputGroup
      className={cn(
        "relative w-full max-w-md h-8 py-2",
        "flex items-center",
        "rounded-md border dark:bg-neutral-700/50",
        "dark:focus-within:ring-3 dark:focus-within:ring-blue-500",
        "transition-all"
      )}>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  )
}
