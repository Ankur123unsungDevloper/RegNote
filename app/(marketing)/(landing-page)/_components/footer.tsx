import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { ChevronDown } from "lucide-react";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return ( 
    <footer className="flex lg:items-center pb-10 flex-col px-8 lg:px-0 xl:w-3/4 mx-auto 2xl:w-[60rem] relative top-[80px] border-t">
      <div className="lg:flex lg:space-x-32 md:px-0">
        <div className="pt-4">
          <Logo />
          <div className="flex relative top-[20px]">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-500">
              <FaInstagram className="text-lg" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-black">
              <FaXTwitter className="text-lg" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-700">
              <FaLinkedinIn className="text-lg" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-800">
              <FaFacebook className="text-lg" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
              <FaYoutube className="text-lg" />
            </Button>
          </div>
          <div className="relative top-[50px] font-bold">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <AiOutlineGlobal className="mr-2 w-5 h-5" />
                  English
                  <ChevronDown
                    size={16}
                    className="relative top-[1px] ml-2 h-3 w-3 transition duration-200 hover:rotate-180"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-40 gap-y-10">
          <div className="flex-col space-y-4 ">
            <div className="pt-10 font-medium">PRODUCT</div>
            <div className="font-light space-y-2 text-sm">
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Home</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Product</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">What&apos;s New</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Pricing</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Premium</div>
            </div>
          </div>
          <div className="flex-col space-y-4 ">
            <div className="pt-10 font-medium">PRODUCT</div>
            <div className="font-light space-y-2 text-sm">
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Home</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Product</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">What&apos;s New</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Pricing</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Premium</div>
            </div>
          </div>
          <div className="flex-col space-y-4 ">
            <div className="pt-10 font-medium">PRODUCT</div>
            <div className="font-light space-y-2 text-sm">
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Home</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Product</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">What&apos;s New</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Pricing</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Premium</div>
            </div>
          </div>
          <div className="flex-col space-y-4 ">
            <div className="pt-10 font-medium">PRODUCT</div>
            <div className="font-light space-y-2 text-sm">
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Home</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Product</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">What&apos;s New</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Pricing</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Premium</div>
            </div>
          </div>
          <div className="flex-col space-y-4 ">
            <div className="pt-10 font-medium">PRODUCT</div>
            <div className="font-light space-y-2 text-sm">
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Home</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Product</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">What&apos;s New</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Pricing</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Premium</div>
            </div>
          </div>
          <div className="flex-col space-y-4 ">
            <div className="pt-10 font-medium">PRODUCT</div>
            <div className="font-light space-y-2 text-sm">
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Home</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Product</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">What&apos;s New</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Pricing</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Premium</div>
            </div>
          </div>
          <div className="flex-col space-y-4 ">
            <div className="pt-10 font-medium">PRODUCT</div>
            <div className="font-light space-y-2 text-sm">
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Home</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Product</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">What&apos;s New</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Pricing</div>
              <div className="hover:text-sky-500 hover:underline hover:cursor-pointer">Premium</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;