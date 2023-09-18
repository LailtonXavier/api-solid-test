import { Appointment } from '../entities/appointment';

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  // save(appointment: Appointment): Promise<void>;
  // ele vai devolver um appointment caso tenha encontrado pq deu conflito
  findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}