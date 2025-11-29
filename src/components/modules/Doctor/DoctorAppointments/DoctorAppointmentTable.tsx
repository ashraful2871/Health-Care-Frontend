import { IAppointment } from "@/types/appointments.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DoctorAppointmentsTableProps {
  appointments: IAppointment[];
}

const DoctorAppointmentTable = ({
  appointments = [],
}: DoctorAppointmentsTableProps) => {
  const router = useRouter();
  const [viewingAppointment, setViewingAppointment] =
    useState<IAppointment | null>(null);
  const [changingStatusAppointment, setChangingStatusAppointment] =
    useState<IAppointment | null>(null);

  return <div>DoctorAppointmentTable</div>;
};

export default DoctorAppointmentTable;
