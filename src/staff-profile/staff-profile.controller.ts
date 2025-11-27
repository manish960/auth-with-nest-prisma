import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffProfileService } from './staff-profile.service';
import { CreateStaffProfileDto } from './dto/create-staff-profile.dto';
import { UpdateStaffProfileDto } from './dto/update-staff-profile.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Staff Profile')
@Controller('staff-profile')
export class StaffProfileController {
  constructor(private readonly staffProfileService: StaffProfileService) {}

  @Post()
  create(@Body() createStaffProfileDto: CreateStaffProfileDto) {
    return this.staffProfileService.create(createStaffProfileDto);
  }

  @Get()
  findAll() {
    return this.staffProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffProfileDto: UpdateStaffProfileDto) {
    return this.staffProfileService.update(+id, updateStaffProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffProfileService.remove(+id);
  }
}
