import { Column } from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialities.interface.ts";
import Image from "next/image";

const specialitiesColumns: Column<ISpecialty>[] = [
  {
    header: "Icon",
    accessor: (row) => {
      const url =
        row.icon && row.icon.startsWith("http")
          ? row.icon
          : "/placeholder-icon.png"; // fallback

      return <Image src={url} alt="Specialty Icon" width={40} height={40} />;
    },
  },
  {
    header: "Title",
    accessor: (row) => row.title,
  },
];
export default specialitiesColumns;
