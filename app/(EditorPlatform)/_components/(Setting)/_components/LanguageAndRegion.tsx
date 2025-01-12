import { DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function LanguageAndRegion() {
  return (
    <>
      <DialogHeader className="text-lg font-bold mb-4">
        Language & region
      </DialogHeader>
      <Separator className="text-muted-foreground mb-4" />
      <p>Language and region settings content goes here.</p>
    </>
  );
}

