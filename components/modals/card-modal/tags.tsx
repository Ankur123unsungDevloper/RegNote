/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from 'react';
import { Eye, Check } from 'lucide-react'; // Import the Check icon
import {
  Card,
  CardHeader,
  CardContent
} from '@/components/ui/card';

import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

interface TagsProps {
  data?: {
    isWatching: boolean | undefined;
  };
};

export const Tags = ({
  data
}: TagsProps) => {
  const [isWatching, setIsWatching] = useState(data?.isWatching || false);

  const toggleWatch = () => {
    setIsWatching(!isWatching);
    // Here you would typically update this state on the server
  };

  return (
    <div className="flex items-start w-full">
      <Card className="w-full bg-transparent text-gray-200 ml-6">
        <CardHeader>
          <p className="text-sm text-muted-foreground">Notifications</p>
        </CardHeader>
        <CardContent>
          <Button
            variant="ghost"
            size="sm"
            className={`bg-neutral-600 hover:bg-neutral-600/50 hover:text-white text-sm ml-2 font-medium rounded-md ${
              isWatching ? 'bg-neutral-700' : ''
            }`}
            onClick={toggleWatch}
          >
            <Eye className="h-4 w-4 mr-1" /> {/* Eye icon */}
            {isWatching ? (
              <>
                Watching <Check className="h-4 w-4 inline" /> {/* Checked icon */}
              </>
            ) : (
              'Watch'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

Tags.Skeleton = function TagsSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};