/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"
import { useUser } from "@clerk/nextjs";
import { FaRegUserCircle } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaRegBell } from "react-icons/fa6";
import { LuArrowUpRightSquare } from "react-icons/lu";
import { BsGlobe } from "react-icons/bs";
import { FiArrowUpCircle } from "react-icons/fi";
import { ModeToggle } from "@/components/mode-toggle";


export const SettingBox = () => {

  const { user } = useUser();
  
  if (!user) {
    return null; // or render a loading state
  };

  const primaryEmailAddress = user.emailAddresses.find((emailAddress) => emailAddress.id === user.primaryEmailAddressId);

  if (!primaryEmailAddress) {
    return null; // or render a default email address
  };

  return (
    <div className="flex w-full h-full">
      <aside className="w-1/4 h-full bg-[#D3D1CB] dark:bg-neutral-700/50 p-2">
        <div className="mb-8 ml-2">
          <h2 className="text-xs font-bold text-muted-foreground mb-2">
            Account
          </h2>
          <div className="flex flex-row items-center justify-start space-x-2 mb-4">
            <Avatar className="h-5 w-5 rounded-2xl">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <div className="flex flex-col items-center justify-start mr-2">
              <span className="text-start text-sm font-medium mr-16">
                {user?.fullName}
              </span>
              <span className="flex items-center text-xs text-muted-foreground ml-1">
              {primaryEmailAddress.emailAddress}
              </span>
            </div>
          </div>
        </div>
          <nav className="w-full">
            <ul>
              <li className="mb-4">
                <a href="#" className="flex items-center text-sm text-gray-400 dark:hover:text-white space-x-2">
                  <FaRegUserCircle className="h-5 w-5 ml-2" />
                  <span>My account</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center text-sm text-white dark:bg-neutral-700 space-x-2 p-1 rounded-sm w-full">
                  <GiSettingsKnobs className=" h-5 w-5 ml-2 rotate-90" />
                  <span>My settings</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white space-x-2">
                  <FaRegBell className="h-5 w-5 ml-2" />
                  <span>My notifications</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white space-x-2">
                  <LuArrowUpRightSquare className="h-5 w-5 ml-2" />
                  <span>My connections</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white space-x-2">
                  <BsGlobe className="h-5 w-5 ml-2" />
                  <span>Language & region</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-8">
            <div>
              <h2 className="text-xs font-bold text-muted-foreground mb-2">
                Workspace
              </h2>
            </div>
            <ul>
              <li className="mb-4">
                <a href="#" className="flex items-center text-sm text-blue-500 space-x-2">
                  <FiArrowUpCircle />
                  Upgrade plan
                </a>
                <li className="mb-4">
                  <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white">
                    Teamspaces
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white">
                    People
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white">
                    Sites
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white">
                    Security & data
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white">
                    Identity & provisioning
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white">
                    Connections
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="flex items-center text-sm text-gray-400 hover:text-white">
                    Import
                  </a>
                </li>
              </li>
            </ul>
          </div>
      </aside>
      <main className="w-3/4 p-8 overflow-hidden bg-[#D3D1CB] dark:bg-neutral-700">
        <DialogHeader className="text-lg font-bold mb-4">
          My settings
        </DialogHeader>
        <Separator className="text-muted-foreground mb-4" />
        <section className="flex flex-row items-center justify-between mb-8">
          <div className="flex flex-col">
            <Label>
              Appearance
            </Label>
            <p className="text-[0.8rem] text-muted-foreground mb-2">
              Customize how Notion looks on your device.
            </p>
          </div>
          <div className="mb-4 hover:bg-neutral-700/50 rounded-sm">
            <ModeToggle />
          </div>
        </section>
      </main>
    </div>
  )
}
