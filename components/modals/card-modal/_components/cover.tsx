/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useRef,
  useState
} from "react";

import { useQuery } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCardModal } from "@/hooks/use-card-modal";

/* -------------------- TYPES (UI STATE ONLY) -------------------- */

export type CoverValue =
  | {
      type: "COLOR";
      bg: string;
      pattern?: string;
      size: "under" | "on";
      textColor?: "white" | "black";
    }
  | {
      type: "IMAGE";
      imageUrl: string;
      size: "under" | "on";
      textColor?: "white" | "black";
    }
  | null;


interface CoverProps {
  value: CoverValue;
  onChange: (value: CoverValue) => void;   // local draft only
  onClose: () => void;                     // just close UI
}

/* -------------------- DATA -------------------- */

const normalColors = [
  "bg-emerald-400",
  "bg-yellow-400",
  "bg-amber-400",
  "bg-red-400",
  "bg-purple-400",
  "bg-blue-400",
  "bg-cyan-400",
  "bg-lime-400",
  "bg-pink-400",
  "bg-zinc-400",
];

const colorblindColors = [
  { bg: "bg-emerald-400", pattern: "pattern-diagonal" },
  { bg: "bg-yellow-400", pattern: "pattern-zigzag" },
  { bg: "bg-amber-400", pattern: "pattern-vertical" },
  { bg: "bg-red-400", pattern: "pattern-dots" },
  { bg: "bg-purple-400", pattern: "pattern-wave" },
  { bg: "bg-blue-400", pattern: "pattern-horizontal" },
  { bg: "bg-cyan-400", pattern: "pattern-slash" },
  { bg: "bg-lime-400", pattern: "pattern-curve" },
  { bg: "bg-pink-400", pattern: "pattern-grid" },
  { bg: "bg-zinc-400", pattern: "pattern-bars" },
];

/* -------------------- COMPONENT -------------------- */

export const Cover = ({ value, onChange, onClose }: CoverProps) => {
  const id = useCardModal((state) => state.id);
  const [draft, setDraft] = useState<CoverValue>(value);
  const [colorblind, setColorblind] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const title = cardData?.title ?? "";


  /* Commit changes ONLY on close */
  const commit = () => {
    onChange(draft);   // update CardModal local draft
    onClose();        // close Cover drawer only
  };


  /* ---------- Helpers ---------- */

  const getColorName = (bg: string) =>
    bg.replace("bg-", "").replace("-400", "").toUpperCase();

  /* ---------- Color ---------- */

  const handleColorSelect = (bg: string, pattern?: string) => {
    if (draft?.type === "COLOR" && draft.bg === bg) {
      setDraft(null);
      return;
    }

  setDraft({
    type: "COLOR",
    bg,
    pattern: colorblind ? pattern : undefined,
    size: draft?.size ?? "under",
    textColor: draft?.textColor ?? "white",   // ← REQUIRED
  });

  };


  /* ---------- Size ---------- */

  const handleSizeChange = (size: "under" | "on") => {
    if (!draft) return;
    setDraft({ ...draft, size });
  };

  /* ---------- Colorblind ---------- */

  const toggleColorblind = () => {
    setColorblind(prev => {
      const next = !prev;

      if (draft?.type === "COLOR") {
        const cb = colorblindColors.find(c => c.bg === draft.bg);
        setDraft({
          ...draft,
          pattern: next ? cb?.pattern : undefined,
        });
      }

      return next;
    });
  };


  /* ---------- Image Upload ---------- */

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setDraft({
      type: "IMAGE",
      imageUrl: url,
      size: draft?.size ?? "under",
    });
  };

  const handleTextColor = (color: "white" | "black") => {
    if (!draft) return;
    setDraft({ ...draft, textColor: color });
  };


  /* ---------- Preview ---------- */

  const previewStyle =
    draft?.type === "IMAGE"
      ? { backgroundImage: `url(${draft.imageUrl})` }
      : undefined;

  const previewClass =
    draft?.type === "COLOR"
      ? `${draft.bg} ${draft.pattern ? `pattern ${draft.pattern}` : ""}`
      : "bg-zinc-200 bg-cover bg-center";

  /* -------------------- UI -------------------- */

  return (
    <div className="space-y-2 max-h-[762px] overflow-hidden">
      {/* HEADER */}
      <div className="relative flex items-center justify-center">
        <h2 className="font-semibold">Cover</h2>
        <button
          onClick={commit}
          className="absolute right-0 top-0 h-8 w-8 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      {/* SIZE */}
      <div className="space-y-2 p-1">
        <p className="text-sm font-medium">Size</p>

        <div className="grid grid-cols-2 gap-2">
          {/* UNDER (Cover) */}
          <button
            disabled={!draft}
            onClick={() => handleSizeChange("under")}
            style={draft ? previewStyle : undefined}
            className={`relative h-20 rounded-md overflow-hidden
              ${draft ? previewClass : "bg-[#dcdfe4] cursor-not-allowed"}
              ${draft?.size === "under" ? "ring-2 ring-zinc-900" : ""}
            `}
          >

            {/* Card Content */}
            <div className="relative top-4 left-0 right-3 w-full bg-white p-3 space-y-1">
              <div className="h-2 w-full bg-[#dcdfe4] rounded" />
              <div className="h-2 w-3/4 bg-[#dcdfe4] rounded" />
              <div className="h-2 w-1/2 bg-[#dcdfe4] rounded" />
            </div>

            {/* Status Dot */}
            <div className="absolute bottom-2 right-2 h-3 w-3 bg-[#dcdfe4] rounded-full" />
          </button>

          {/* ON (Text Only) */}
          <button
            disabled={!draft}
            onClick={() => handleSizeChange("on")}
            style={draft ? previewStyle : undefined}
            className={`h-20 rounded-md flex flex-col justify-center px-3
              ${draft ? previewClass : "bg-[#dcdfe4] cursor-not-allowed"}
              ${draft?.size === "on" ? "ring-2 ring-zinc-900" : ""}
            `}
          >
            <div className="h-2 w-3/4 bg-white rounded mb-1 relative top-6" />
            <div className="h-2 w-1/2 bg-white rounded relative top-6" />
          </button>
        </div>
        {draft && (
          <Button variant="gray" className="w-full" onClick={() => setDraft(null)}>
            Remove cover
          </Button>
        )}
        {/* TEXT COLOR (Only when ON) */}
        {draft?.size === "on" && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Text</p>

            <div className="grid grid-cols-2 gap-2">
              {/* WHITE */}
              <button
                onClick={() => handleTextColor("white")}
                style={previewStyle}
                className={`relative h-10 rounded-md overflow-hidden
                  ${previewClass}
                  ${draft.textColor === "white" ? "ring-2 ring-zinc-900" : ""}
                `}
              >
                <div className="relative text-white items-center text-start pl-4 font-semibold truncate">
                  {title}
                </div>
              </button>

              {/* BLACK */}
              <button
                onClick={() => handleTextColor("black")}
                style={previewStyle}
                className={`relative h-10 rounded-md overflow-hidden
                  ${previewClass}
                  ${draft.textColor === "black" ? "ring-2 ring-zinc-900" : ""}
                `}
              >
                <div className="relative text-black items-center text-start pl-4 font-semibold truncate">
                  {title}
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* COLORS */}
      <div className="space-y-2 p-1">
        <p className="text-sm font-medium">Colors</p>

        <div className="grid grid-cols-5 gap-2">
          <TooltipProvider delayDuration={100}>
            {(colorblind ? colorblindColors : normalColors).map((c: string | { bg: string; pattern: string }) => (
              <Tooltip key={typeof c === "string" ? c : c.bg}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() =>
                      typeof c === "string"
                        ? handleColorSelect(c)
                        : handleColorSelect(c.bg, c.pattern)
                    }
                    className={`h-8 rounded-md ${typeof c === "string" ? c : c.bg} ${typeof c === "string" ? "" : c.pattern}
                    ${draft?.type === "COLOR" && draft.bg === (typeof c === "string" ? c : c.bg)
                        ? "ring-2 ring-zinc-900"
                        : ""}
                  `}
                  />
                </TooltipTrigger>
                <TooltipContent>{getColorName(typeof c === "string" ? c : c.bg)}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        <Button
          variant="gray"
          className="w-full"
          onClick={toggleColorblind}
        >
          {colorblind ? "Disable colorblind friendly mode" : "Enable colorblind friendly mode"}
        </Button>
      </div>

      <Separator />

      {/* ATTACHMENTS */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Attachments</p>

        <Button variant="gray" className="w-full" onClick={handleUploadClick}>
          Upload a cover image
        </Button>

        <p className="text-xs text-muted-foreground">
          Tip: Drag an image onto the card to upload it.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>

      {/* UNSPLASH */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Photos from Unsplash</p>

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-16 rounded-md bg-zinc-200"
            />
          ))}
        </div>

        <Button variant="gray" className="w-full">
          Search for photos
        </Button>

        <p className="text-xs text-muted-foreground">
          By using images from Unsplash, you agree to their{" "}
          <span className="underline cursor-pointer">license</span> and{" "}
          <span className="underline cursor-pointer">Terms of Service</span>
        </p>
      </div>
    </div>
  );
};