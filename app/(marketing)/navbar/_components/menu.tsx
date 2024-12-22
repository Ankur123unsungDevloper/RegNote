"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { PiBookOpenLight } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";
import { BsCalendarDate } from "react-icons/bs";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuListItems() {
  return (
    <NavigationMenu className="hidden lg:flex relative left-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex">
              <ul className="grid p-2 md:w-[400px] lg:w-[180px] hover:cursor-pointer border-r">
                <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                  <IoDocumentTextOutline className="text-2xl text-yellow-500" />
                  <div>
                    <a>Docs</a>
                    <p className="text-gray-400 text-sm font-light">
                      Simple & powerful
                    </p>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                  <PiBookOpenLight className="text-2xl mr-2 text-red-500" />
                  <div>
                    <a>Wikis</a>
                    <p className="text-gray-400 text-sm font-light">
                      Centralize your knowledge
                    </p>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                  <TbTargetArrow className="text-2xl mr-2 text-blue-600" />
                  <div>
                    <a>Projects</a>
                    <p className="text-gray-400 text-sm font-light">
                      For every team or size
                    </p>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                  <BsCalendarDate className="text-2xl mr-2 text-orange-500" />
                  <div>
                    <a>Calendar</a>
                    <p className="text-gray-400 text-sm font-light">
                      Time and work, together
                    </p>
                  </div>
                </div>
              </ul>
              <div>
                <ul className="grid p-2 md:w-[400px] lg:w-[250px] hover:cursor-pointer border-r">
                  <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                    <div>
                      <a>Template gallery</a>
                      <p className="text-gray-400 text-sm font-light">
                        Setup to get you started
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                    <div>
                      <a>Customer story</a>
                      <p className="text-gray-400 text-sm font-light">
                        See how teams us RegNote
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                    <div>
                      <a>Connections</a>
                      <p className="text-gray-400 text-sm font-light">
                        Connect your tools to RegNote
                      </p>
                    </div>
                  </div>
                </ul>
              </div>
              <div>
                <ul className="grid p-2 md:w-[400px] lg:w-[250px] hover:cursor-pointer border-r">
                  <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                    <div>
                      <a>Template gallery</a>
                      <p className="text-gray-400 text-sm font-light">
                        Setup to get you started
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                    <div>
                      <a>Customer story</a>
                      <p className="text-gray-400 text-sm font-light">
                        See how teams us RegNote
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                    <div>
                      <a>Connections</a>
                      <p className="text-gray-400 text-sm font-light">
                        Connect your tools to RegNote
                      </p>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Download</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-row-4 lg:w-[600px]">
                <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                  <div>
                    <a>RegNote</a>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                  <div>
                    <a>Calender</a>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                  <div>
                    <a>Web clipper</a>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                  <div>
                    <p className="text-gray-400 text-sm font-light">
                      RegNote is always at home right
                    </p>
                    <a
                      href=""
                      className="underline text-gray-400 text-sm font-light"
                    >
                      in your browser
                    </a>
                  </div>
                </div>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
