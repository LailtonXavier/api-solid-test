import { Appointment, AppointmentProps } from '../entities/appointment';
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository';

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = AppointmentProps

export class CreateAppointment {
  constructor (
    private appointsmentRepository: InMemoryAppointmentRepository
  ) {}

  async execute({ 
    customer, 
    startsAt, 
    endsAt 
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointsmentRepository.findOverlappingAppointment(
      startsAt,
      endsAt
    )

    if (overlappingAppointment) {
      throw new Error('This appointment overlaps with another one')
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt
    })
    
    await this.appointsmentRepository.create(appointment)

    return appointment
  }
}