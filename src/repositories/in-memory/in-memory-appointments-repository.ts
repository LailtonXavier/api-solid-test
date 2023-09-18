import { areIntervalsOverlapping } from 'date-fns'

import { Appointment } from '../../entities/appointment';
import { AppointmentsRepository } from '../appointments-repositories';

export class InMemoryAppointmentRepository implements AppointmentsRepository {
  public items: Appointment[] = [];
  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overlayAppintment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }, // ele vai comparar < ou == 
      )
    })

    if (!overlayAppintment) {
      return null
    }

    return overlayAppintment
  }
}
