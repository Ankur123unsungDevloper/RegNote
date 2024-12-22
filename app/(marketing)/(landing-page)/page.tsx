import Bento from "./_components/bento";
import Endless from "./_components/endless";
import Features from "./_components/features";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";
import Heroine from "./_components/heroine";
import IgnoreTools from "./_components/ignoretools";
import Partner from "./_components/partner";
import Services from "./_components/services";

const LandingPage = () => {
  return ( 
    <div>
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-[8px] flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
        <Partner />
        <IgnoreTools />
        <Features />
        <Services />
        <Bento />
        <Endless />
        <Heroine />
      </div>
    </div>
  );
}

export default LandingPage;