"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiBookOpenLight } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { motion } from "framer-motion";

const tabs = [
  {
    icon: (
      <IoDocumentTextOutline className="text-3xl mr-2 text-yellow-500 bg-yellow-100 p-1 rounded-md" />
    ),
    name: 'Docs',
    description: 'Simple, powerful, beautiful. Nextgen notes & docs.',
    more: (
      <div className="text-yellow-700 flex items-center">
        Learn more
        <ArrowRight className="text-sm ml-1" />
      </div>
    ),
    image: "/assets/heroes/docs_tab.png"
  },
  {
    icon: (
      <PiBookOpenLight className="text-3xl mr-2 text-red-500 bg-red-100 p-1 rounded-md" />
    ),
    name: 'Wikis',
    description: 'Centralize your knowledge. NO more hurting for answers.',
    more: (
      <div className="text-red-700 flex items-center">
        Learn more
        <ArrowRight className="text-sm ml-1" />
      </div>
    ),
    image: "/assets/heroes/wikis_tab.png"
  },
  {
    icon: (
      <TbTargetArrow className="text-3xl mr-2 text-blue-500 bg-blue-100 p-1 rounded-md" />
    ),
    name: 'Projects',
    description: 'Manage complex projects without the chaos.',
    more: (
      <div className="text-blue-700 flex items-center">
        Learn more
        <ArrowRight className="text-sm ml-1" />
      </div>
    ),
    image: "/assets/heroes/projects_tab.png"
  },
  {
    icon: (
      <BsCalendarDate className="text-3xl mr-2 text-orange-500 bg-orange-100 p-1 rounded-md" />
    ),
    name: 'Calender',
    description: 'Manage your time and projects, together.',
    more: (
      <div className="text-orange-700 flex items-center">
        Learn more
        <ArrowRight className="text-sm ml-1" />
      </div>
    ),
    image: "/assets/heroes/calendar_tab.png"
  },
]

const Heroes = () => {

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return ( 
    <div className="md:items-center flex flex-col">
      <div className="flex flex-col items-center justify-center max-w-5xl">
        <div className="flex items-center">
          <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
            <Image
              src="/assets/documents.png"
              fill
              className="object-contain"
              alt="Documents"
            />
          </div>
          <div className="relative h-[400px] w-[400px] hidden md:block">
            <Image
              src="/assets/reading.png"
              fill
              className="object-contain"
              alt="Reading"
            />
          </div>
        </div>
      </div>
      {isSmallScreen ? (
        <div className="px-8">
          <div className="grid grid-cols-4 md:row-span-1 gap-4 xl:gap-6 mt-8 xl:px-0">
            {tabs.map((tab) => (
              <motion.div
                key={tab.name}
                className={`flex p-1 md:p-8 cursor-pointer ${ activeTab.name === tab.name ? "rounded-md md:rounded-xl bg-[#f6f5f4] md:bg-white border-gray-200 md:border items-center justify-center flex p-1" : "md:bg-[#f6f5f4] rounded-md xl:rounded-xl p-1 items-center justify-center hover:bg-[#eae7e7]"}`}
                onClick={() => setActiveTab(tab)}
              >
                <div className="flex flex-col items-center md:justify-center mx-auto">
                  <div className="hidden md:flex text-4xl">
                    {tab.icon}
                  </div>
                  <div className="font-medium text-sm xl:text-lg mt-1">
                    {tab.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="w-full">
            {activeTab && (
              <div className="flex justify-center items-center flex-col">
                <Image
                  src={activeTab.image}
                  alt="tabimg"
                  width={1000}
                  height={1000}
                  className="w-full border rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
          <div className="flex xl:space-x-6 items-center justify-between hover:cursor-pointer gap-4 w-4/5 xl:w-3/4 2xl:w-[60rem]">
            {tabs.map((tab) => (
              <motion.div
                key={tab.name}
                className={`xl:flex justify-center space-x-4 xl:pt-4 sm:my-10 xl:py-0 w-60 h-56 relative bottom-32 ${ activeTab === tab ? "border rounded-xl pt-2 bg-white" : "shadow-md rounded-xl pt-2 bg-[#f6f5f4]" }`}
                onMouseEnter={() => setActiveTab(tab)}
              >
                <div className="px-4">
                  <div className="flex items-center">
                    <div>
                      {tab.icon}
                    </div>
                  </div>
                  <motion.div>
                    <div className="text-2xl font-medium">
                      {tab.name}
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex flex-col text-sm"
                    initial={{ y: 0 }}
                    animate={{ y: activeTab === tab ? 10 : 25 }}
                    transition={{duration: 0.2}}
                  >
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{duration: 0.3}}
                      >
                        {tab.description}
                      </motion.div>
                    </div>
                    {activeTab === tab && (
                      <div className="text-sm mt-2 relative top-5">
                        {tab.more}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
      )}
      <div className="hidden md:flex py-10 px-8 md:px-0 lg:w-3/4 2xl:w-[60rem]">
        {activeTab && (
          <div className="md:flex items-center justify-center space-x-6 hover:cursor-pointer w-full relative bottom-40">
            <Image
              src={activeTab.image}
              alt="tabimg"
              width={1000}
              height={1000}
              className="w-full border shadow-xl rounded-xl bg-[#f6f5f4]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Heroes;