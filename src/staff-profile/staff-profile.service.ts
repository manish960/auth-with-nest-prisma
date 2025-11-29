import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffProfileDto } from './dto/create-staff-profile.dto';
import { UpdateStaffProfileDto } from './dto/update-staff-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffProfileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStaffProfileDto: CreateStaffProfileDto) {
    return this.prisma.staffProfile.create({
      data: createStaffProfileDto,
    });
  }

  async findAll() {
    return await this.prisma.staffProfile.findMany();
  }

  async findOne(id: number) {
    const staffProfile = await this.prisma.staffProfile.findUnique({ where: { id } });

    if (!staffProfile)
      throw new BadRequestException(`Record Doest Not Exist With : ${id}`);
    return staffProfile;
  }

  update(id: number, updateStaffProfileDto: UpdateStaffProfileDto) {
    return this.prisma.staffProfile.update({
      where: { id },
      data: updateStaffProfileDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.staffProfile.delete({ where: { id } });
  }
}
