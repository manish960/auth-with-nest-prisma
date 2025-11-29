import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPatientDto: CreatePatientDto) {
    return await this.prisma.patient.create({
      data: {
        ...createPatientDto,
        dateOfBirth: new Date(createPatientDto.dateOfBirth),
      },
    });
  }

  async findAll() {
    return await this.prisma.patient.findMany();
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });

    if (!patient)
      throw new BadRequestException(`Record Doest Not Exist With : ${id}`);
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    let payload = { ...updatePatientDto };
    if (updatePatientDto.dateOfBirth) {
      payload.dateOfBirth = new Date(payload.dateOfBirth) as any;
    }
    return await this.prisma.patient.update({ where: { id }, data: payload });
  }

  async remove(id: number) {
    return await this.prisma.patient.delete({ where: { id } });
  }
}
