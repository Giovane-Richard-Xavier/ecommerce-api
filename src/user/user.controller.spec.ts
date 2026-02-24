import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let cusersController: UserController;

  const mockUserService = {
    create: jest.fn(),
    findAllUsers: jest.fn(),
    findUserById: jest.fn(),
    Patch: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    cusersController = module.get<UserController>(UserController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(cusersController).toBeDefined();
  });

  it('create', async () => {
    const userDto: CreateUserDto = {
      name: 'Giovane Richard',
      email: 'giovanerichard@email.com',
      password: '123456',
    };

    await cusersController.create(userDto);

    expect(mockUserService.create).toHaveBeenCalledTimes(1);
    expect(mockUserService.create).toHaveBeenCalledWith(userDto);
  });
});
