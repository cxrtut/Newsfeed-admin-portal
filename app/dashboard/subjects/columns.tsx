"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import DeleteNewsFeed from "@/components/DeleteNewsFeed"

// This type is used to define the shape of our data.
export type Story = {
  _id: string;
  heading: string;
  story: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const columns: ColumnDef<Story>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => <span className="font-medium">{row.original._id}</span>,
  },
  {
    accessorKey: "heading",
    header: "Heading",
    cell: ({ row }) => <span className="font-medium">{row.original.heading}</span>,
  },
  {
    accessorKey: "story",
    header: "Story",
    cell: ({ row }) => (
      <span className="max-w-[300px] truncate block">
        {row.original.story}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return (
        <span className="font-medium">
          {date.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const story = row.original;
      const id = story._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                redirect(`/dashboard/subjects/${id}`);
              }}
            >
              Edit Story
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteNewsFeed id={id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];




