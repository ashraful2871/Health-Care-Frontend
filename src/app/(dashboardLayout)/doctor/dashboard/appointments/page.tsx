import DoctorAppointmentTable from "@/components/modules/Doctor/DoctorAppointments/DoctorAppointmentTable";
import { getDoctorOwnSchedules } from "@/service/doctor/doctorScedule.services";
import { getMyAppointments } from "@/service/patient/appointment.service";
import { IAppointment } from "@/types/appointments.interface";
import React from "react";

const DoctorAppointmentsPage = async () => {
  const response = await getMyAppointments();
  const myDoctorsScheduleResponse = await getDoctorOwnSchedules();
  const appointments: IAppointment[] = response?.data || [];
  console.log("myDoctorsScheduleResponse.........", myDoctorsScheduleResponse);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground mt-2">
          Manage your patient appointments and prescriptions
        </p>
      </div>

      <DoctorAppointmentTable appointments={appointments} />
    </div>
  );
};

export default DoctorAppointmentsPage;
