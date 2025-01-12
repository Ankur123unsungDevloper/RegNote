import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BarChart, ChevronDown } from "lucide-react";
import Link from "next/link";

interface DropdownMenuProps {
  onClose: () => void;
}

const DropdownMenu = ({
  onClose
}: DropdownMenuProps) => {

  const handleLinkClick = () => {
    onClose();
  };

  return ( 
    <div className="w-screen h-screen bg-white px-4 items-center justify-center absolute right-0 xl:hidden mt-10">
      <Accordion
        defaultValue="item-1"
        className="pl-2"
        type="single"
        collapsible
      >
        <AccordionItem
          className="mt-6 border-b"
          value="item-1"
        >
          <AccordionTrigger>
            Product
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent
            defaultValue="item-1"
            className="space-y-2"
          >
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>Sales</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="mt-6 border-b"
          value="item-2"
        >
          <AccordionTrigger>Download</AccordionTrigger>
          <AccordionContent
            className="space-y-2"
          >
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>Sales</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="mt-6 border-b"
          value="item-3"
        >
          <AccordionTrigger>Download</AccordionTrigger>
          <AccordionContent
            className="space-y-2"
          >
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>Sales</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="mt-6 border-b"
          value="item-4"
        >
          <AccordionTrigger>Download</AccordionTrigger>
          <AccordionContent
            className="space-y-2"
          >
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>
                <BarChart className="h-6 w-6 mr-4 text-orange-400" />
              </div>
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>Sales</div>
            </Link>
            <Link
              href="/ecommerce"
              className="flex"
              onClick={handleLinkClick}
            >
              <div>Sales</div>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <Link
          href="/"
          className="flex flex-1 items-center justify-between py-6 border-b text-xl"
        >
          Pricing
        </Link>
        <Link
          href="/contact-sales"
          className="flex flex-1 items-center justify-between py-6 border-b text-xl"
        >
          Request a demo
        </Link>
      </Accordion>

      <div className="pt-12">
        <div className="space-y-4 flex flex-col px-4">
          <Button className="w-full text-xl">
            Get RegNote free
          </Button>
        </div>
        <div className="space-y-4 flex flex-col px-4 mt-4">
          <Button
            variant="outline"
            className="w-full text-xl"
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;