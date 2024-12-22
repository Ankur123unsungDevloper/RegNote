"use client";

import Image from "next/image";
import { useState } from "react";
import { BsRocketTakeoff } from "react-icons/bs";
import { GiIceCube } from "react-icons/gi";
import { LiaCompassSolid } from "react-icons/lia";
import { PiPaletteLight } from "react-icons/pi";
import { TbSpeakerphone } from "react-icons/tb";
import { VscTools } from "react-icons/vsc";

const tabs = [
  {
    icon: <VscTools />,
    name: 'Engineering',
    image: '/assets/services/engineering.png',
  },
  {
    icon: <PiPaletteLight />,
    name: 'Design',
    image: '/assets/services/design.png',
  },
  {
    icon: <BsRocketTakeoff />,
    name: 'Product',
    image: '/assets/services/product.png',
  },
  {
    icon: <TbSpeakerphone />,
    name: 'Marketing',
    image: '/assets/services/marketing.png',
  },
  {
    icon: <LiaCompassSolid />,
    name: 'Operations',
    image: '/assets/services/operation.png',
  },
  {
    icon: <GiIceCube />,
    name: 'HR',
    image: '/assets/services/HR.png',
  },
]

const Services = () => {

  const [activeTab, setActiveTab] = useState(tabs[0])

  return ( 
    <div className="relative flex justify-center items-center flex-col px-8 md:px-0 xl:w-3/4 mx-auto 2xl:w-[60rem]">
      <div className="pt-20 lg:pt-0 text-5xl xl:text-6xl font-medium text-center pb-8">
        Every team, side-by-side
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 md:row-span-1 gap-4 xl:gap-6 mt-8 xl:px-0">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`flex p-1 md:p-8 cursor-pointer ${activeTab.name === tab.name ? 'rounded-md md:rounded-xl bg-[#f6f5f4] md:bg-white border-gray-200 md:border items-center justify-center flex p-1' : 'md:bg-[#f6f5f4] rounded-md md:rounded-xl p-1 items-center justify-center hover:bg-[#eae7e7]'}`}
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
          </div>
        ))}
      </div>
      <div className="py-10 lg:px-16 xl:px-0 md:px-16 w-full">
        {activeTab && (
          <div className="flex justify-center items-center flex-col h-[600px] w-full relative top-[10px] border-gray-400">
            <Image
              src={activeTab.image}
              alt=""
              fill
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;