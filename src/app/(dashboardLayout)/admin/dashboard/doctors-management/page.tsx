import DoctorsManagementHeader from "@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getDoctors } from "@/service/admin/doctorManagement";
import { getSpeciality } from "@/service/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface.ts";
import { Suspense } from "react";

const AdminDoctorsManagementPage = async () => {
  const specialitiesResult = await getSpeciality();
  const doctorsResult = await getDoctors();
  return (
    <div className="space-y-6">
      <DoctorsManagementHeader specialities={specialitiesResult.data} />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search Doctors...." />
        <SelectFilter
          paramName="specialty"
          options={specialitiesResult.data.map((speciality: ISpecialty) => ({
            label: speciality.title,
            value: speciality.id,
          }))}
        />

        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorsTable
          doctors={doctorsResult.data}
          specialities={specialitiesResult.data}
        />
      </Suspense>
    </div>
  );
};

export default AdminDoctorsManagementPage;
