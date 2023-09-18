import { describe, expect, it } from 'vitest';
import { CreateAppointment } from './create-appointment';
import { Appointment } from '../entities/appointment';
import { getFutureDate } from '../tests/utils/get-future-date';
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository';

// criar categorização dos testes
describe('Create Appointment', () => {
  it('should be able to create an appointment', () => {
    const startsAt = getFutureDate('2015-08-10')
    const endsAt = getFutureDate('2015-08-11')
    
    const appointmentRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)

    expect(createAppointment.execute({
      customer: 'Lailton',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('Should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2015-08-10')
    const endsAt = getFutureDate('2015-08-15')

    const appointmentRepository = new InMemoryAppointmentRepository()
    const createAppointment = new CreateAppointment(
      appointmentRepository
    )

    await createAppointment.execute({
      customer: 'Lailton',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'Lailton',
      startsAt: getFutureDate('2015-08-14'),
      endsAt: getFutureDate('2015-08-18'),
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'Lailton',
      startsAt: getFutureDate('2015-08-08'),
      endsAt: getFutureDate('2015-08-12'),
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'Lailton',
      startsAt: getFutureDate('2015-08-08'),
      endsAt: getFutureDate('2015-08-17'),
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      customer: 'Lailton',
      startsAt: getFutureDate('2015-08-11'),
      endsAt: getFutureDate('2015-08-12'),
    })).rejects.toBeInstanceOf(Error)

  })
})