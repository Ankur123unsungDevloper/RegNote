import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function UpgradePlan() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        Upgrade plan
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Upgrade plan content goes here.</p>
    </>
  );
}

