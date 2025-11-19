import SpecialitiesManagementHeader from "@/components/modules/Admin/SpecialitiesManagement/SpecialitiesManagementHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import React from "react";

const AdminSpecialitiesManagementPage = () => {
  return (
    <div className="space-y-6">
      <SpecialitiesManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      {/* <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <SpecialitiesTable specialities={result.data} />
      </Suspense> */}
    </div>
  );
};

export default AdminSpecialitiesManagementPage;
