import { WhiteTheme } from "@/app/styles/theme";
import { Navbar } from "./_components/navbar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full"
      style={{
        backgroundColor: WhiteTheme.backgroundColor,
        color: WhiteTheme.textColor
      }}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;