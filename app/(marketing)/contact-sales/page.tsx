import Footer from "../(landing-page)/_components/footer";
import { lightTheme } from "../../styles/theme";
import Navbar from "../navbar/navbar";
import { Contactform } from "./contact-form";

const ContactSales = () => {
  return (
    <div
      className="min-h-full flex flex-col"
      style={{ backgroundColor: lightTheme.backgroundColor, color: lightTheme.textColor }}
    >
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Navbar />
        <Contactform />
        <Footer />
      </div>
    </div>
  );
}

export default ContactSales;