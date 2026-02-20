/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";

import { RiUnsplashFill } from "react-icons/ri";
import Image from "next/image";

interface CoverImageModalProps {
  url?: string;
}

export const CoverImageModal= ({
  url,
}: CoverImageModalProps) => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url
        }
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      });

      onClose();
    }
  }
  
  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
  removeCoverImage({
    id: params.documentId as Id<"documents">
  });
};

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent className="w-[35rem] h-[35rem] overflow-hidden p-2 bg-neutral-800 text-white">
        <Tabs defaultValue="gallery" className="-mt-2 w-full">
          <TabsList className="grid grid-cols-3 justify-items-start space-x-[6rem] w-full ">
            <div className="col-span-2 mb-2 space-x-1">
              <TabsTrigger className="hover:bg-neutral-700" value="gallery">Gallery</TabsTrigger>
              <TabsTrigger className="hover:bg-neutral-700" value="upload">Upload</TabsTrigger>
              <TabsTrigger className="hover:bg-neutral-700" value="link">Link</TabsTrigger>
              <TabsTrigger className="hover:bg-neutral-700" value="unsplash"><RiUnsplashFill className="h-4 w-4 mr-1" /> Unsplash</TabsTrigger>
            </div>
            <div className="col-span-1 -mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="font-bold hover:bg-neutral-700"
                onClick={onRemove}
              >
                Remove
              </Button>
            </div>
          </TabsList>
          <Separator className="bg-neutral-700" />
          <TabsContent value="gallery">
            <ScrollArea className="h-[35rem]">
              <h2 className="text-muted-foreground text-xs mb-2">Color & Gradient</h2>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <button className="cursor-pointer w-full h-16 bg-red-500 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-yellow-500 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-blue-500 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-pink-100 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-teal-500 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-pink-500 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-red-600 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded"></button>
                <button className="cursor-pointer w-full h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded"></button>
              </div>
              <h2 className="text-muted-foreground text-xs mb-2">James Webb Telescope</h2>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <Image width={100} height={100} src="/public/assets/cover/Jame-webb-telescope/webb1.jpg" alt="James Webb Telescope image 1" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/public/assets/cover/Jame-webb-telescope/webb2.jpg" alt="James Webb Telescope image 2" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/public/assets/cover/Jame-webb-telescope/webb3.jpg" alt="James Webb Telescope image 3" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/public/assets/cover/Jame-webb-telescope/webb4.jpg" alt="James Webb Telescope image 4" className="cursor-pointer w-full h-24 object-cover rounded" />
              </div>
              <h2 className="text-muted-foreground text-xs mb-2">NASA Archive</h2>
              <div className="grid grid-cols-4 gap-2">
                <Image width={100} height={100} src="/" alt="NASA Archive image 1" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 2" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 3" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 4" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 1" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 2" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 3" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 4" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 1" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 2" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 3" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 4" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 1" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 2" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 3" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 4" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 1" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 2" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 3" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 4" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 1" className="cursor-pointer w-full h-24 object-cover rounded" />
                <Image width={100} height={100} src="/" alt="NASA Archive image 2" className="cursor-pointer w-full h-24 object-cover rounded" />
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="upload">
            <SingleImageDropzone
              className="w-full outline-none"
              disabled={isSubmitting}
              value={file}
              onChange={onChange}
              width={540}
              height={490}
            />
          </TabsContent>
          <TabsContent value="link">on the way</TabsContent>
          <TabsContent value="unsplash">this feature is coming soon</TabsContent>
        </Tabs>
        
      </DialogContent>
    </Dialog>
  );
};
