import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function SecurityAndData() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        Security & data
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Security and data management content goes here.</p>
    </>
  );
}

