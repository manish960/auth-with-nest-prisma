import { Test, TestingModule } from '@nestjs/testing';
import { StaffProfileController } from './staff-profile.controller';
import { StaffProfileService } from './staff-profile.service';

describe('StaffProfileController', () => {
  let controller: StaffProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffProfileController],
      providers: [StaffProfileService],
    }).compile();

    controller = module.get<StaffProfileController>(StaffProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
