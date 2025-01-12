import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function WorkspaceConnections() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        Connections
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Workspace connections management content goes here.</p>
    </>
  );
}

