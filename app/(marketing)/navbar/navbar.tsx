"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

import { NavigationMenuListItems } from "./_components/menu";
import ActionButton from "./_components/action-button";
import { Logo } from "@/components/logo";

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-[#ffff] fixed top-0 flex items-center w-full p-1 gap-x-8",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <NavigationMenuListItems />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 relative left-[5px]">
        <ActionButton />
      </div>
    </div>
  );
}

export default Navbar;