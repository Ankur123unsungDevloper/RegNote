/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  ElementRef,
  useRef,
  useState
} from "react";
import {
  ImageIcon,
  Smile
} from "lucide-react";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

import { IconPicker } from "./icon-picker";

  
interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
};

export const Toolbar = ({
  initialData,
  preview
}: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const [selectedImage, setSelectedImage] = useState('');

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id
    })
  }

  
  const images = [
    '/assets/cover/Jame-webb-telescope/webb1.jpg',
    '/assets/cover/Jame-webb-telescope/webb2.jpg',
    '/assets/cover/Jame-webb-telescope/webb3.jpg',
    '/assets/cover/Jame-webb-telescope/webb4.jpg',
    // Add more images to the array
  ];

  const handleAddCover = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6 absolute bottom-[70px]">
          <IconPicker onChange={onIconSelect} onRemove={onRemoveIcon}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">
          {initialData.icon}
        </p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex flex-row items-center w-[14rem] py-4">
        <div className="w-1/2 flex-1">
          {!initialData.icon && !preview && (
            <IconPicker asChild onChange={onIconSelect} onRemove={onRemoveIcon}>
              <Button
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
              >
                <Smile className="h-4 w-4 mr-2" />
                Add icon
              </Button>
            </IconPicker>
          )}
        </div>
        <div className="w-1/2 flex-col">
          {!initialData.coverImage && !preview && (
            <Button
              onClick={coverImage.onOpen}
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Add cover
            </Button>
          )}
        </div>
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          placeholder={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  )
}