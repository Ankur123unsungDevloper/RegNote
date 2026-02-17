"use client";

import { Button } from "@/components/ui/button";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";

interface FavoriteProps {
  documentId: Id<"documents">;
  isFavorite?: boolean;
}

export const Favorite = ({
  documentId,
  isFavorite
}: FavoriteProps) => {

  const setFavorite = useMutation(api.documents.setFavorite);
  const { toast } = useToast();

  const toggleFavorite = async () => {
    try {
      await setFavorite({
        id: documentId,
        isFavorite: !isFavorite
      });

      toast({
        title: !isFavorite
          ? "Added to favorites ⭐"
          : "Removed from favorites",
      });

    } catch {
      toast({
        title: "Something went wrong",
        description: "Could not update favorite",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={toggleFavorite}
      variant="ghost"
      size="icon"
      className="dark:text-white"
    >
      {isFavorite ? (
        <FaStar className="w-6 h-6 text-yellow-400" />
      ) : (
        <FaRegStar className="w-6 h-6" />
      )}
    </Button>
  );
};
