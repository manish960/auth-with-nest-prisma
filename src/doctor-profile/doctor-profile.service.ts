import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDoctorProfileDto: CreateDoctorProfileDto) {
    return await this.prisma.doctorProfile.create({
      data: createDoctorProfileDto,
    });
  }

  async findAll() {
    return await this.prisma.doctorProfile.findMany();
  }

  async findOne(id: number) {
    const doctorProfile = await this.prisma.doctorProfile.findUnique({
      where: { id },
    });

    if (!doctorProfile)
      throw new BadRequestException(`Record Doest Not Exist With : ${id}`);
    return doctorProfile;
  }

  async update(id: number, updateDoctorProfileDto: UpdateDoctorProfileDto) {
    return await this.prisma.doctorProfile.update({
      where: { id },
      data: updateDoctorProfileDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.doctorProfile.delete({ where: { id } });
  }
}
