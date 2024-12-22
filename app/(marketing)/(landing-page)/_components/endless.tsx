import Image from "next/image";
import { FaCalendarAlt, FaFlagCheckered, FaInbox } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoAirplane } from "react-icons/io5";
import { PiArrowRight, PiHouseFill } from "react-icons/pi";

const items = [
  {
    icon: <PiHouseFill className="text-2xl text-red-600" />,
    name: 'Company wiki',
    button: (
      <div className="text-sky-500 flex items-center hover:underline hover:cursor-pointer pt-6">
        Get template <PiArrowRight className="ml-3 text-sm " />
      </div>
    ),
    image: '/assets/endless/company-wiki-template.png'
  },
  {
    icon: <FaFlagCheckered className="text-2xl text-sky-600" />,
    name: 'Product roadmap',
    button: (
      <div className="text-sky-500 flex items-center hover:underline hover:cursor-pointer pt-6">
        Get template <PiArrowRight className="ml-3 text-sm " />
      </div>
    )
  },
  {
    icon: <FaCircleCheck className="text-2xl text-orange-600" />,
    name: 'OKRs',
    button: (
      <div className="text-sky-500 flex items-center hover:underline hover:cursor-pointer pt-6">
        Get template <PiArrowRight className="ml-3 text-sm " />
      </div>
    )
  },
  {
    icon: <HiOutlineClipboardList className="text-2xl text-yellow-500" />,
    name: 'Meeting notes',
    button: (
      <div className="text-sky-500 flex items-center hover:underline hover:cursor-pointer pt-6">
        Get template <PiArrowRight className="ml-3 text-sm " />
      </div>
    )
  },
  {
    icon: <IoAirplane className="text-2xl text-red-600" />,
    name: 'Vacation planner',
    button: (
      <div className="text-sky-500 flex items-center hover:underline hover:cursor-pointer pt-6">
        Get template <PiArrowRight className="ml-3 text-sm " />
      </div>
    )
  },
  {
    icon: <FaCalendarAlt className="text-2xl text-green-700" />,
    name: 'Editorial calendar',
    button: (
      <div className="text-sky-500 flex items-center hover:underline hover:cursor-pointer pt-6">
        Get template <PiArrowRight className="ml-3 text-sm " />
      </div>
    )
  },
  {
    icon: <FaInbox className="text-2xl text-purple-600" />,
    name: 'Habit tracker',
    button: (
      <div className="text-sky-500 flex items-center hover:underline hover:cursor-pointer pt-6">
        Get template <PiArrowRight className="ml-3 text-sm " />
      </div>
    )
  },
]

const Endless = () => {
  return ( 
    <>
      <div className="flex flex-col pt-20 xl:py-32 items-center justify-center">
        <div className="grid grid-cols-2 xl:grid-cols-2 pl-[35px] relative top-[9px]">
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl xl:text-5xl font-medium justify-center items-center flex relative left-[275px]">
              Endless ways to use it
            </div>
            <div className="text-sky-500 flex items-center justify-center hover:underline hover:cursor-pointer relative left-[310px] pt-[10px]">
              Brose all templates <PiArrowRight className="ml-3 text-sm " />
            </div>
          </div>
          <div className="absolute h-[170px] w-[200px] top-[-6px] left-[820px]">
            <Image
              src={'/assets/endless/topPeekJ.png'}
              alt=""
              fill
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 md:row-span-1 gap-4 xl:gap-6 mt-8 px-8 md:px-16 xl:px-0 xl:w-3/4 2xl:w-[65rem] mx-auto md:w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${index === 0 ? 'xl:col-span-2 xl:row-span-3 md:col-span-2 flex-col md:flex-row xl:flex-col' : ''} bg-[#f6f5f4] p-6 rounded-xl flex ${index === 0 ? 'justify-between' : ''}`}
            >
              <div className="flex flex-col">
                {item.icon}
                <div className="text-lg font-medium mt-2 items-center justify-start">
                  {item.name}
                </div>
                {item.button}
              </div>
              {item.image && (
                <div className={`${index !== 0 ? 'justify-between' : 'flex-col justify-end'}`}>
                  <Image
                    src={item.image}
                    alt=""
                    width={500}
                    height={500}
                    className="mt-10 bg-white relative left-[24px] top-[25px]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Endless;