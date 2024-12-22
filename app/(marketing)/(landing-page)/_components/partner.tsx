import Image from "next/image";
import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";

const logos = [
  {image: '/logos/logoipsum-222.svg'},
  {image: '/logos/logoipsum-231.svg'},
  {image: '/logos/logoipsum-244.svg'},
  {image: '/logos/logoipsum-250.svg'},
  {image: '/logos/logoipsum-256.svg'},
  {image: '/logos/logoipsum-257.svg'},
  {image: '/logos/logoipsum-260.svg'},
  {image: '/logos/logoipsum-285.svg'},
  {image: '/logos/logoipsum-288.svg'},
  {image: '/logos/logoipsum-297.svg'},
  {image: '/logos/logoipsum-300.svg'},
  {image: '/logos/logoipsum-317.svg'},
  {image: '/logos/logoipsum-323.svg'},
  {image: '/logos/logoipsum-325.svg'},
]

const Partner = () => {
  return ( 
    <div className="pt-16 flex justify-center items-center flex-col">
      <div className="text-4xl w-3/4 text-center xl:text-5xl font-medium">
        Millions run on RegNote every day
      </div>
      <div className="py-4 xl:w-[40%] text-center px-2">
        Powering the world&apos;s best teams, from next-generation startups to established enterprises.
      </div>
      <div>
        <Link
          href="/"
          className="text-sky-500 flex items-center hover:underline hover:cursor-pointer"
        >
        Read customer stories <PiArrowRight className="ml-3 text-sm" />
        </Link>
      </div>
      {
        <div className="grid grid-cols-3 xl:grid-cols-6 items-center justify-center px-10 md:px-20 lg:px-0 lg:w-1/2 pt-10 gap-10 text-center mx-auto">
          {logos.map((logo, index) => (
            <div key={index}>
              <Image
                src={logo.image}
                alt=""
                width={1500}
                height={1500}
                className="w-48"
              />
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default Partner;