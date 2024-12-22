/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import { Lora } from "next/font/google";
import Image from "next/image";
import { useRef, useState } from "react";
import { PiEyeLight, PiPaletteLight } from "react-icons/pi";
import { TbSwitch3 } from "react-icons/tb";

const font = Lora({
  subsets: ['latin'],
  weight: ['400']
});

const tabs = [
  {
    icon: <TbSwitch3 className="text-3xl mr-2 text-sky-600" />,
    header: 'Visualize, filter & sort any way you want',
    subheading: 'Show only tasks assigned to you, or items marked as urgent. Break down any project in the way that’s most helpful to you.',
    images: [
      {
        title: 'Board',
        picture: '/assets/features/kanban.png'
      },
      {
        title: 'Table',
        picture: '/assets/features/table.png'
      },
      {
        title: 'Timeline',
        picture: '/assets/features/timeline.png'
      },
      {
        title: 'Calender',
        picture: '/assets/features/calendar.png'
      },
      {
        title: 'Gallery',
        picture: '/assets/features/gallery.png'
      },
      {
        title: 'List',
        picture: '/assets/features/list.png'
      },
    ],
    description: 'Choose from a variety of colors',
  },
  {
    icon: <PiEyeLight className="text-3xl mr-2 text-sky-600" />,
    header: 'Customize the info you track',
    subheader: 'Create your own labels, tags, owners, and more, so everyone has context and everything stays organized.',
    image: '/assets/features/customize-info.png',
  },
  {
    icon: <PiPaletteLight className="text-3xl mr-2 text-sky-600" />,
    header: 'Build any page, communicate any idea',
    subheader: 'Everything is drag and drop in Notion — images, toggles, to-do’s, even embedded databases.',
    image: '/assets/features/build-any-page-communicate-any-idea.png',
  },
];

type Tab = {
  icon: JSX.Element,
  header: string,
  subheading?: string,
  subheader?: string,
  images?: {
    title: string,
    picture: string
  }[],
  description?: string,
  image?: string,
}

const Features = () => {

  //const ref = useRef(null);
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      <div className="flex flex-col pt-20 xl:py-32 items-center justify-center">
        <div className="grid grid-cols-2 xl:grid-cols-2 pl-[35px] relative top-[49px]">
          <div className="hidden md:flex relative h-[150px] w-[200px] left-[30px] bottom-[3px]">
          <Image
            src="/assets/features/topPeekI.png"
            alt=""
            fill
          />
          </div>
          <div className="text-3xl xl:text-5xl font-medium justify-center items-center flex relative right-[275px] top-[20px]">
          Powerful building blocks
          </div>
        </div>
        
        <div className="grid xl:grid-cols-4 md:grid-cols-2 md:row-span-1 gap-4 xl:gap-6 mt-8 px-8 md:px-16 xl:px-0 xl:w-3/4 2xl:w-[65rem] mx-auto md:w-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? 'xl:col-span-4 xl:row-span-3 md:col-span-2 flex-col' : 'xl:col-span-2 xl:row-span-3 flex-col'
              } bg-[#f6f5f4] p-6 rounded-xl flex`}
            >
              <div className="flex flex-col">
                {tab.icon}
                <div className="text-lg font-medium mt-2">
                  {tab.header}
                </div>
                <div className="relative left-[250px] mt-2 pr-[480px]">
                  {tab.subheading}
                </div>
                <div className="mt-2">
                  {tab.subheader}
                </div>
                <>
                  {index === 0 && tab.images && (
                    <div>
                      <Image
                        src={tab.images[activeImageIndex].picture}
                        alt=""
                        width={1000}
                        height={1000}
                        className="flex justify-center my-10 xl:my-16 rounded-xl mx-auto w-full"
                      />
                      <div className="grid grid-cols-5 xl:grid-cols-6 xl:w-10/12 mx-auto gap-1 xl:space-x-2">
                        {tab.images.map((image, index) => (
                          <div
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`${
                              index === activeImageIndex ? 'rounded-md bg-[#dbd9d9] items-center justify-center flex p-1' : 'rounded-md p-1 items-center justify-center bg-[#f6f5f4] hover:bg-[eaa7e7]'
                            }`}
                          >
                            <div className="text-sm items-center justify-center flex hover: cursor-pointer">
                              {image.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
                <>
                  
                  {index !== 0 && (
                    <div className="relative h-[400px] w-[500px] bottom-[16px] right-[17px]">
                      <Image
                        src={tab?.image || ""}
                        alt=""
                        fill
                        className="mt-10 rounded-xl"
                      />
                    </div>
                  )}
                </>
              </div>
            </div>
          ))}
        </div>
        <div className={cn(
          "flex items-center justify-center text-2xl xl:text-3xl pl-60 pt-10 xl:py-10 px-60 text-center w-4/5",
          font.className
        )}>
          &quot;RegNote adapts to your needs. It’s as minimal or as powerful as you need it to be.&quot;
        </div>  
        <div className="items-center flex justify-center flex-row gap-5">
          <Image
            src={'/logos/logoipsum-300.svg'}
            alt=""
            width={500}
            height={500}
            className="pt-2 xl:pt-0 w-5 xl:w-14"
          />
          <div className="text-start">
            <div className="text-sm font-medium pt-4">
              Ankur Das
            </div>
            <div>
              Director of Ops & Marketing, MetaLab.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Features;