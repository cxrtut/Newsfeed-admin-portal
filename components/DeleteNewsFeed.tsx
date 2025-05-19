"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteNewsFeedProps {
  id: string;
}

const DeleteNewsFeed = ({ id }: DeleteNewsFeedProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://fourir-website-newsfeed-api.onrender.com/api/news/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the news feed.");
      }

      // Refresh the page to show updated data
      router.refresh();
    } catch (err) {
      console.error("Error deleting news feed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
    </Button>
  );
};

export default DeleteNewsFeed;


