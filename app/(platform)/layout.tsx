/* eslint-disable @typescript-eslint/no-unused-vars */
import { Toaster } from "sonner";

import { WhiteTheme } from "@/app/styles/theme";

import { ModalProvider1 } from "@/components/providers/modal-provider1";
import { QueryProvider } from "@/components/providers/query-provider";

const PlatformLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div
        className="h-full"
        style={{
          backgroundColor: WhiteTheme.backgroundColor,
          color: WhiteTheme.textColor,
        }}
      >
        <QueryProvider>
          <Toaster />
          <ModalProvider1 />
          {children}
        </QueryProvider>
      </div>
    </>
  );
};

export default PlatformLayout;