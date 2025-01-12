import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function MyConnections() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        My connections
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Connection settings content goes here.</p>
    </>
  );
}

