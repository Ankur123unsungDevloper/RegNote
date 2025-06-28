"use client";

import { ThemeProvider } from '@/components/providers/theme-provider';

import { Navigation } from "./_components/navigation";
import { SearchCommand } from '@/components/search-command';

import { Toaster } from 'sonner';
import { InboxCommand } from '@/components/inbox-command';
import { ModalProvider } from '@/components/providers/modal-provider';
import { HomeCommand } from '@/components/home-command';

const EditorPlatformLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full flex">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="RegNote-theme-2"
      >
        <Navigation />
        <main className="flex-1 h-full dark:bg-[#1F1F1F]">
          <ModalProvider />
          <Toaster position='bottom-center' />
          <SearchCommand />
          <HomeCommand />
          <InboxCommand />
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
};

export default EditorPlatformLayout;