import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function MyAccount() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        My account
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Account settings content goes here.</p>
    </>
  );
}

