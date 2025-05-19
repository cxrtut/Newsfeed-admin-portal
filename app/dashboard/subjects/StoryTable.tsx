'use client';

import { DataTable } from "./data-table";
import { columns, Story } from "./columns";

interface StoryTableProps {
  stories: Story[];
}

export function StoryTable({ stories }: StoryTableProps) {
  return (
    <DataTable columns={columns} data={stories} />
  );
} 