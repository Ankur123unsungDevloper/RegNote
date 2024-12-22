import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"]
});

export const Logo = () => {
  return (
    <div className="md:flex items-center gap-x-2 hover:cursor-pointer">
      <Image
        src="/logos/logo-light.svg"
        height="60"
        width="60"
        alt="Logo"
        className="dark:hidden"
      />
      <p className={cn("font-semibold relative right-[15px]", font.className)}>
        RegNote
      </p>
    </div>
  )
}