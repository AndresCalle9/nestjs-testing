import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudService } from './solicitud.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let mockSolicitudRepository = {
    save: jest.fn().mockImplementation((dto) => {
      return {id: Math.floor(Math.random() * 100), ...dto}
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitudService,{
        provide: getRepositoryToken(Solicitud),
        useValue: mockSolicitudRepository
      }],
    }).compile();

    service = module.get<SolicitudService>(SolicitudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a solicitud', async () => {
    const createSolicitudDto : CreateSolicitudDto = {
      nombre: 'John Doe',
      cargo: 'Assistant Professor',
      unidad: 'Informatics Department',
      telefono: '1234',
      email: 'john.doe@gmail.com',
      tipo: '',
      nombreActividad: '',
      start: undefined,
      end: undefined,
      dia: '',
      horaInicio: '',
      horaFin: '',
    }

    expect(await service.create(createSolicitudDto)).toEqual({id: expect.any(Number), ...createSolicitudDto})
  })
});
