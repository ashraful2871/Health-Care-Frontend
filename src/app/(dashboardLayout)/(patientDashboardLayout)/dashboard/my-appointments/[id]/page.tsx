import AppointmentDetails from "@/components/modules/Patient/PatientAppointment/AppointmentDetails";
import { getAppointmentById } from "@/service/patient/appointment.service";
import { IAppointment } from "@/types/appointments.interface";
import { notFound } from "next/navigation";
import React from "react";

interface AppointmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const AppointmentDetailPage = async ({
  params,
}: AppointmentDetailPageProps) => {
  const { id } = await params;

  const response = await getAppointmentById(id);
  if (!response?.success || !response?.data) {
    notFound();
  }
  const appointment: IAppointment = response.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <AppointmentDetails appointment={appointment} />
    </div>
  );
};

export default AppointmentDetailPage;
