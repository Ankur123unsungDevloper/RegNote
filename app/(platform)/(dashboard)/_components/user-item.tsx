/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar";

import { useUser } from "@clerk/nextjs";

export const UserItem = () => {
  const { user } = useUser();

  return (
    <div className="grid grid-flow-row items-center justify-start h-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="flex flex-row items-center justify-center ml-6 text-sm w-full relative right-9 space-x-1"
          >
            <div className="flex items-center space-x-1">
              <Avatar className="h-5 w-5 ml-1">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
