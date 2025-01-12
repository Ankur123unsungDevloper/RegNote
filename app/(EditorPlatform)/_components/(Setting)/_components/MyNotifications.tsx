import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function MyNotifications() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        My notifications
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Notification settings content goes here.</p>
    </>
  );
}

