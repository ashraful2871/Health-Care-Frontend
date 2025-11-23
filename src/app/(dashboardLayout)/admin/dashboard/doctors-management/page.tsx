import DoctorFilters from "@/components/modules/Admin/DoctorsManagement/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/service/admin/doctorManagement";
import { getSpeciality } from "@/service/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface.ts";
import { Suspense } from "react";

const AdminDoctorsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const specialitiesResult = await getSpeciality();
  const doctorsResult = await getDoctors(queryString);
  const totalPage = Math.ceil(
    doctorsResult.meta.total / doctorsResult.meta.limit
  );
  return (
    <div className="space-y-6">
      <DoctorsManagementHeader specialities={specialitiesResult?.data || []} />
      <div className="flex space-x-2">
        <DoctorFilters
          specialties={specialitiesResult?.data || []}
        ></DoctorFilters>
      </div>
      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <DoctorsTable
          doctors={doctorsResult?.data || []}
          specialities={specialitiesResult?.data}
        />
        <TablePagination
          currentPage={doctorsResult?.meta?.page}
          totalPages={totalPage}
        />
      </Suspense>
    </div>
  );
};

export default AdminDoctorsManagementPage;
