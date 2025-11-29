"use client";
import React, { useState, useTransition } from "react";
import AdminFormDialog from "./AdminFormDialog";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const AdminsManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <AdminFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onclose={handleCloseDialog}
        onsuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Admins Management"
        description="Manage admin accounts and permissions"
        action={{
          label: "Add Admin",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default AdminsManagementHeader;
