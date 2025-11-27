import AppointmentConfirmation from "@/components/modules/Patient/PatientAppointment/AppointmentConfirmation";
import { getDoctorById } from "@/service/admin/doctorManagement";
import { getScheduleById } from "@/service/admin/schedulesManagement";
import { IDoctor } from "@/types/doctor.interface";
import { ISchedule } from "@/types/schedule.interface";
import { notFound } from "next/navigation";
import React from "react";
interface BookAppointmentPageProps {
  params: Promise<{
    doctorId: string;
    scheduleId: string;
  }>;
}

const BookAppointmentPage = async ({ params }: BookAppointmentPageProps) => {
  const { doctorId, scheduleId } = await params;

  // Fetch doctor and schedule in parallel
  const [doctorResponse, scheduleResponse] = await Promise.all([
    getDoctorById(doctorId),
    getScheduleById(scheduleId),
  ]);

  if (!doctorResponse?.success || !scheduleResponse?.success) {
    notFound();
  }

  const doctor: IDoctor = doctorResponse.data;
  const schedule: ISchedule = scheduleResponse.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <AppointmentConfirmation doctor={doctor} schedule={schedule} />
    </div>
  );
};

export default BookAppointmentPage;
