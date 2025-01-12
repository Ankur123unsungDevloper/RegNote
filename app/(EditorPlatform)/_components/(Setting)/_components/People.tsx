import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function People() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        People
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>People management content goes here.</p>
    </>
  );
}

