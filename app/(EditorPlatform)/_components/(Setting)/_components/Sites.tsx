import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function Sites() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        Sites
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Sites management content goes here.</p>
    </>
  );
}

