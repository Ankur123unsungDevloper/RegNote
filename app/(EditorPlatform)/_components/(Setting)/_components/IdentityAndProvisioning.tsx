import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function IdentityAndProvisioning() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        Identity & provisioning
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Identity and provisioning management content goes here.</p>
    </>
  );
}

