"use client";

import { Button } from "@/components/ui/button";
//import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  //useRef, 
  useState
} from "react";
import { PiArrowRight } from "react-icons/pi";
import { TbSwitch3 } from "react-icons/tb";

//const font = Lora({
//  subsets: ['latin'],
//  weight: ['400']
//})

const tabs = [
  {
    text: '1M+',
    subtext: 'community members'
  },
  {
    text: '150+',
    subtext: 'community groups'
  },
  {
    text: '50+',
    subtext: 'countries represented'
  },
  {
    header: 'An always-on support network',
    subheading: 'Swap setups and share tips in over 149 online communities.',
    image: '/assets/bento/community-icons-V2.png'
  },
  {
    header: 'Choose your language',
    subheading: 'RegNote currently supports English, Korean, Japanese, French, German, Spanish, and Portuguese. With more to come!',
    image: '/assets/bento/community-icons-V2.png'
  },
  {
    icon: <TbSwitch3 className="text-3xl mr-2 text-gray-600 rounded-md" />,
    images: [
      {
        title: 'Community meet-up in Tokyo',
        picture: '/assets/bento/community-slide-01.png'
      },
      {
        title: 'RegNote ambassador event in New York',
        picture: '/assets/bento/community-slide-02.png'
      },
      {
        title: 'Sharing Notion setups in San Francisco',
        picture: '/assets/bento/community-slide-03.png'
      },
      {
        title: 'Coffee pop-up in London',
        picture: '/assets/bento/community-slide-04.png'
      },
    ],
  },
  {
    profile: "/",
    userName: "Mayank Srivastava",
    userHandle: "@DebMecca",
    userText: (
      <div className="md:mt-6">
        I used to HATE documenting things. And then I started using <span className="text-sky-500"> @NotionHQ</span> and I document a lot. A LOT A LOT. Now I just realize that it wasn&apos;t that I hated documenting, I just hated Google Docs.
      </div>
    ),
  },
  {
    profile: "/",
    userName: "NiTin rAi",
    userHandle: "@mindofandre",
    userText: (
      <div className="md:mt-6">
        One of the most incredible things about <span className="text-sky-500"> @NotionHQ</span> is the dynamic community being built - creating and sharing at its best.
      </div>
    ),
  },
  {
    profile: "/",
    userName: "Areeb",
    userHandle: "@opeyre",
    userText: (
      <div className="md:mt-6">
        <span className="text-sky-500"> @NotionHQ</span> Truly impressed by the velocity and quality of your work. Making using Notion even more fun week after week!
      </div>
    ),
  },
]

const Bento = () => {

  //const ref = useRef(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveImageIndex(index);
  }

  return ( 
    <>
      <div className="pt-20 xl:pt-24 flex justify-center items-center flex-col">
        <div className="text-3xl w-3/4 xl:text-4xl font-medium xl:w-1/2 text-center">
          Join a global movement. Unleash your creativity.
        </div>
        <div className="py-4 px-10 xl:w-1/2 2xl:w-1/2 md:w-2/3 text-center">
          Our vibrant community produces content, teaches courses, and leads events all over the world.
        </div>
        <Button
          className="text-blue-500 pl-10 hover:underline hover:cursor-pointer"
          variant="link"
          asChild
        >
          <Link href="/">
            Learn more
            <PiArrowRight className="ml-3 text-sm" />
          </Link>
        </Button>
        <div className="relative h-[150px] w-[1000px] mt-5">
          <Image
            src={'/assets/bento/avatars.png'}
            alt=""
            fill
          />
        </div>
        <div className="grid grid-cols-12 md:row-span-2 gap-4 xl:gap-6 mt-8 px-4 md:px-16 xl:px-0 xl:w-3/4 2xl:w-[60rem] mx-auto md:w-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`col-span-12 ${index <= 2 ? "md:col-span-6 lg:col-span-4 bg-[#f6f5f4] p-6 rounded-xl flex" : index <= 4 ? "md:col-span-6 bg-[#f6f5f4] p-6 rounded-xl" : index === 5 ? "md:col-span-6 lg:col-span-8 lg:row-span-3 bg-[#f6f5f4] p-6 rounded-xl" : index > 5 ? "col-span-12 lg:col-span-4 md:col-span-4 bg-[#f6f5f4] p-6 rounded-xl flex-col" : ''}`}
            >
              {index <= 2 ? (
                <div className="flex flex-col">
                  <div className="text-5xl font-medium text-sky-600">
                    {tab.text}
                  </div>
                  <div className="text-sm">
                    {tab.subtext}
                  </div>
                </div>
              ) : index <= 4 ? (
                <div>
                  <div className="text-2xl font-medium">
                    {tab.header}
                  </div>
                  <div className="text-sm mt-2">
                    {tab.subheading}
                  </div>
                  <div className="flex justify-center items-center flex-col relative right-[50px]">
                    <Image
                      src={tab.image || ''}
                      alt=""
                      width={500}
                      height={500}
                      className="w-[400px] p-10 rounded-lg"
                    />
                  </div>
                </div>
              ) : index === 5 ? (
                <>
                  {tab.images && (
                    <div className="flex justify-center items-center flex-col w-full">
                      <Image
                        src={tab.images[activeImageIndex].picture}
                        alt=""
                        width={500}
                        height={500}
                        className="w-full h-[700px]"
                      />
                      <div>
                        <div className="text-xl font-medium mt-30 md:mt-0 pb-2">
                          {tab.images[activeImageIndex].title}
                        </div>
                      </div>
                          <div className="flex space-x-2 xl:space-x-6 xl:mt-10">
                            {tab.images.map((image, index) => (
                              <div
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`${index === activeImageIndex ? 'p-2 rounded-full bg-black' : 'p-2 rounded-full bg-gray-600'}`}
                              ></div>
                            ))}
                      </div>
                    </div>
                  )}
                </>
              ) : index > 5 && (
                <>
                  <div className="flex flex-col">
                    <Image
                      src={tab.profile || ''}
                      alt=""
                      width={500}
                      height={500}
                      className="w-8 h-8 rounded-full border"
                    />
                    <div className="text-xl font-medium relative top-[-30px] right-[-40px]">
                      {tab.userName}
                    </div>
                    <div className="text-sm font-normal relative top-[-30px] right-[-40px]">
                      {tab.userHandle}
                    </div>
                    <div className="text-sm font-normal mt-10 md:mt-0 pb-4 relative top-[-30px]">
                      {tab.userText}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Bento;