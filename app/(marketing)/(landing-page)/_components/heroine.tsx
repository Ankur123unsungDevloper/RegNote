import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";

const Heroine = () => {
  return ( 
    <>
      <div className="py-20 xl:py-24 flex justify-center items-center flex-col">
        <div className="text-6xl xl:text-6xl font-medium text-center">
          Get started for free
        </div>
        <div className="py-4 xl:w-1/3 text-center">
          Play around with it first. Pay and add your team later.
        </div>
        <div className="flex flex-row justify-center items-center top-10">
          <Button>
            Try RegNote free
          </Button>
          <Button
            className="hover:text-blue-600 ml-10 hover:underline"
            variant="link"
            asChild
          >
            <Link href="/contact-sales">
              Request a demo
              <PiArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
        
        <Image
          src={'/assets/heroine/notion-parade.png'}
          alt=""
          width={700}
          height={500}
          className="pt-10"
        />
      </div>
    </>
  );
}

export default Heroine;