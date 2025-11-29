import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    // Validate Patient Exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: createAppointmentDto.patientId },
    });
    if (!patient) throw new BadRequestException('Invalid patientId');

    // Validate Doctor Exists
    const doctor = await this.prisma.doctorProfile.findUnique({
      where: { id: createAppointmentDto.doctorId },
    });
    if (!doctor) throw new BadRequestException('Invalid doctorId');
    return await this.prisma.appointment.create({
      data: createAppointmentDto,
    });
  }

  async findAll() {
    return await this.prisma.appointment.findMany();
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment)
      throw new BadRequestException(`Record Doest Not Exist With : ${id}`);
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {

       const appointment = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!appointment) throw new BadRequestException('Record Does not exist');

    // Validate Patient Exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: updateAppointmentDto.patientId },
    });
    if (!patient) throw new BadRequestException('Invalid patientId');

    // Validate Doctor Exists
    const doctor = await this.prisma.doctorProfile.findUnique({
      where: { id: updateAppointmentDto.doctorId },
    });
    if (!doctor) throw new BadRequestException('Invalid doctorId');
    return await this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.appointment.delete({ where: { id } });
  }
}
