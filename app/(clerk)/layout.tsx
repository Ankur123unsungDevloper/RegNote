import { lightTheme } from "@/app/styles/theme";

const ClerkLayout = ({
  children,
}: {
    children: React.ReactNode;
}) => {
  return (
    <div
      className="h-full flex items-center justify-center"
      style={{
        backgroundColor: lightTheme.backgroundColor, 
        color: lightTheme.textColor
      }}

    >
      {children}
    </div>
  );
}

export default ClerkLayout;