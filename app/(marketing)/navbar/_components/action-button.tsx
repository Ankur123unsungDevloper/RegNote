"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import DropdownMenu from "./drop-down-menu";

const ActionButton = () => {

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <div className="pr-2">
      <div className="items-center justify-center flex">
        <div className="flex xl:space-x-4">
          <Button variant="ghost">
            <Link href="/contact-sales" className="hidden lg:flex items-center"
            >
              Request a demo
            </Link>
          </Button>
          <div className="w-[1px] h-[20px] m-[0 10px] bg-gray-200 relative top-[10px] right-2 hidden lg:flex"></div>
        </div>
        <div className="flex lg:space-x-4 items-center justify-center pr-4">
          <Button variant="ghost" size="sm" className="hidden lg:flex border-none text-md" asChild>
            <Link href="/sign-in">
              Log in
            </Link>
          </Button>
          <Button
            size="sm"
            className="hidden lg:flex text-center items-center justify-center h-[30px] w-[130px] p-2"
            asChild
          >
            <Link
              href="/sign-up"
              className="text-sm font-semibold"
            >
              Get RegNote free
            </Link>
          </Button>
        </div>
      </div>
      
      {isDropdownVisible && (
        <div
          onClick={toggleDropdown}
          className="rounded-full xl:hidden"
        >
          <X className="h-6 w-6 items-center justify-center" />
        </div>
      )}
      {!isDropdownVisible && (
        <div
          onClick={toggleDropdown}
          className="flex lg:hidden"
        >
          <AlignJustify className="h-6 w-6 items-center justify-center mr-2" />
        </div>
      )}
      {isDropdownVisible &&
        <DropdownMenu onClose={closeDropdown} />
      }
    </div>
  );
}

export default ActionButton;