import { cn } from "@/lib/utils";
import { Lora } from "next/font/google";
import Image from "next/image";

const font = Lora({
  subsets: ['latin'],
  weight: ['400'],
})

const IgnoreTools = () => {
  return ( 
    <div className="xl:pt-32 pt-24 relative flex justify-center items-center flex-col">
      <div className="xl:text-5xl text-3xl 2xl:w-3/5 w3/5 xl:w-1/3 font-medium mx-auto text-center">
      Consolidate tools. <br /> Cut costs.
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/assets/tools-before-regnote-v2.png"
          alt=""
          width={568}
          height={78}
          className="relative top-10"
        />
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/assets/tools-strikethrough-V2.png"
            alt=""
            width={600}
            height={111}
            className="absolute flex flex-col justify-center items-center"
          />
        </div>
      </div>
      <div className="relative h-[200px] w-[200px] bottom-[205px] left-[290px]">
        <Image
          src="/assets/giant-pencil-illustration.png"
          alt=""
          width={217}
          height={183}
          className="flex flex-col justify-center items-center"
        />
      </div>
      <div className={cn(
        "flex items-center justify-center text-2xl xl:text-3xl pl-60 pr-5 pt-10 pb-4 xl:py-10 px-48 text-center w-4/5",
        font.className
      )}>
        &quot;We got rid of nearly a dozen different tools because of what RegNote does for us.&quot;
      </div>
      <div className="items-center flex justify-center flex-row gap-5">
        <Image
          src={'/logos/logoipsum-300.svg'}
          alt=""
          width={1000}
          height={1000}
          className="pt-2 xl:pt-0 w-10 xl:w-14"
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
  );
}

export default IgnoreTools;