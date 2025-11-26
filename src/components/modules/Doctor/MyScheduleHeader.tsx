"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import BookScheduleDialog from "./BookScheduleDialog";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";

interface MySchedulesHeaderProps {
  availableSchedules: any[];
}

const MyScheduleHeader = ({ availableSchedules }: MySchedulesHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    setIsDialogOpen(false);
    startTransition(() => {
      router.refresh();
    });
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <>
        <BookScheduleDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onSuccess={handleSuccess}
          availableSchedules={availableSchedules}
        />

        <ManagementPageHeader
          title="My Schedules"
          description="Manage your availability and time slots for patient consultations"
          action={{
            label: "Book Schedule",
            icon: Plus,
            onClick: handleOpenDialog,
          }}
        />
      </>
    </>
  );
};

export default MyScheduleHeader;
