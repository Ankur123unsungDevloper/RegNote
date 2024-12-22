"use client";

import { ThemeProvider } from '@/components/providers/theme-provider';
import '../styles/globals.css';
import { darkTheme } from "../styles/theme";

import { Navigation } from "./_components/navigation";
import { SearchCommand } from '@/components/search-command';

import { Toaster } from 'sonner';
import { InboxCommand } from '@/components/inbox-command';

const EditorPlatformLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="h-full flex"
      style={{
        backgroundColor: darkTheme.backgroundColor,
        color: darkTheme.textColor
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="RegNote-theme-2"
      >
        <Navigation />
        <main className="flex-1 h-full bg-[#191919]">
          <Toaster position='bottom-center' />
          <SearchCommand />
          <InboxCommand />
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
};

export default EditorPlatformLayout;