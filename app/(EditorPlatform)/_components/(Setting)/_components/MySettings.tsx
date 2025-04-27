import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

export function MySettings() {
  return (
    <>
      <DialogHeader className="text-lg text-black dark:text-white font-bold mb-4">
        My settings
      </DialogHeader>
      <Separator className="bg-neutral-800 mb-4" />
      <section className="flex flex-row items-center justify-between mb-8">
        <div className="flex flex-col text-black dark:text-white">
          <Label>
            Appearance
          </Label>
          <p className="text-[0.8rem] text-muted-foreground mb-2">
            Customize how Notion looks on your device.
          </p>
        </div>
        <div className="mb-4 dark:bg-neutral-600 dark:border-neutral-600 dark:hover:bg-neutral-700/50 bg-white dark:text-white text-black rounded-sm">
          <ModeToggle />
        </div>
      </section>
    </>
  );
}

