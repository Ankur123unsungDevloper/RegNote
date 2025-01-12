import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

export function MySettings() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        My settings
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <section className="flex flex-row items-center justify-between mb-8">
        <div className="flex flex-col">
          <Label>
            Appearance
          </Label>
          <p className="text-[0.8rem] text-muted-foreground mb-2">
            Customize how Notion looks on your device.
          </p>
        </div>
        <div className="mb-4 hover:bg-neutral-700/50 rounded-sm">
          <ModeToggle />
        </div>
      </section>
    </>
  );
}

