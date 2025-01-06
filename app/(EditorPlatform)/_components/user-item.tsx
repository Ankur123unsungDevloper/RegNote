/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use clients";

import { cn } from "@/lib/utils";
import {
  usePathname,
  useRouter
} from "next/navigation";
import {
  ElementRef,
  useRef,
  useState
} from "react";
import { useMediaQuery } from "usehooks-ts";
import { IoCreateOutline } from "react-icons/io5";
import { ChevronDown } from "lucide-react";
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
import {
  SignOutButton,
  useUser
} from "@clerk/nextjs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoCheck } from "react-icons/go";
import { TbSettings } from "react-icons/tb";
import { BsPersonAdd } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

function truncateName(name: string) {
  const maxLength = 20; // adjust the max length to your needs
  const halfLength = Math.floor(maxLength / 2);
  if (name.length > maxLength) {
    return `${name.substring(0, halfLength)}...`;
  }
  return name;
}

export const UserItem = () => {
  const router = useRouter();
  const { user } = useUser();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  
  const name = `${user?.fullName}`;
  const truncatedName = truncateName(name);

  if (!user) {
    return null; // or render a loading state
  };

  const primaryEmailAddress = user.emailAddresses.find((emailAddress) => emailAddress.id === user.primaryEmailAddressId);

  if (!primaryEmailAddress) {
    return null; // or render a default email address
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" })
    .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new Note...",
      success: "New Note created successfully!",
      error: "Failed to create a new Note. Please try again later.",
    })
  }

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
              <span
                className="text-start font-medium text-sm truncate text-black dark:text-white"
              >
                {isResetting ? name : truncatedName}&apos;s RegNote
              </span>
            </div>
            <div className="flex items-center">
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#262626] border-[#262626] text-white relative left-2">
          <DropdownMenuLabel className="flex items-center justify-center rounded-t-none-sm text-white relative right-10">
            <div
              className="flex flex-col items-center justify-start text-sm w-full mr-20"
            >
              <div className="flex items-center justify-start space-x-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
                <div className="flex flex-col items-center justify-start">
                  <span className="text-start font-medium text-black dark:text-white">
                    {user?.fullName}&apos;s RegNote
                  </span>
                  <span className="flex items-center text-xs text-muted-foreground mr-8 mt-1">
                    Free Plan&nbsp;<span className="flex mb-1">.</span>&nbsp;1 member
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start mt-4 ml-10 space-x-4">
                <Button variant="outline" className="flex h-7 hover:bg-neutral-300 dark:hover:bg-neutral-700/100 hover:text-white text-xs">
                  <TbSettings className="mr-1" />
                  Settings
                </Button>
                <Button variant="outline" className="flex h-7 hover:bg-neutral-700/100 hover:text-white text-xs">
                  <BsPersonAdd className="mr-1" />
                  Invite members
                </Button>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#e1ffe133]" />
          <div className="flex flex-col items-center justify-center bg-[#171717] p-2">
            <div className="flex flex-row items-center justify-start space-x-[13rem]">
              <div className="flex items-center justify-center text-xs text-muted-foreground">
                {primaryEmailAddress.emailAddress}
              </div>
              <div
                role="button"
                className="h-4 w-4 flex items-center justify-end hover:bg-neutral-700 rounded-sm mb-2 text-muted-foreground"
              >
                <BiDotsHorizontalRounded className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between space-x-48 hover:bg-neutral-700 p-0.5 rounded-sm mt-2 cursor-pointer">
              <div className="flex items-center justify-start space-x-1">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
                <span className="text-start font-medium text-xs text-black dark:text-white">
                  {user?.fullName}&apos;s RegNote
                </span>
              </div>
              <div>
                <GoCheck />
              </div>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-[#e1ffe133]" />
          <DropdownMenuItem className="flex hover:bg-neutral-700 m-1 cursor-pointer">
            <p className="flex text-xs text-muted-foreground font-semibold">
              Create work account
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex hover:bg-neutral-700 m-1 cursor-pointer">
            <p className="flex text-xs text-muted-foreground font-semibold">
              Add another account
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex text-xs text-muted-foreground hover:text-muted-foreground font-semibold hover:bg-neutral-700 m-1 cursor-pointer">
            <SignOutButton>
              Log out
            </SignOutButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#e1ffe133]" />
          <DropdownMenuItem className="flex hover:bg-neutral-700 m-1 cursor-pointer">
            <p className="flex text-xs text-muted-foreground font-semibold">
              Get Windows app<span className="opacity-0 hover:opacity-100 hover:text-white">&nbsp;&nbsp;(coming soon)</span>
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div
        onClick={handleCreate}
        role="button"
        className={cn(
          "h-8 w-8 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700 absolute right-2 p-1 flex items-center justify-center",
          isMobile && "opacity-100"
        )}
      >
        <IoCreateOutline className="h-8 w-8 font-bold text-black dark:text-white" />
      </div>
    </div>
  )
}
