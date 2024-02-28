import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';

describe('SolicitudController', () => {
  let controller: SolicitudController;
  let mockSolicitudService = {
    create: jest.fn((dto) => {
      return {
        id: Math.random()* (1000-1)+1,
        ... dto
      }
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ... dto
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudController],
      providers: [SolicitudService],
    }).overrideProvider(SolicitudService).useValue(mockSolicitudService).compile();

    controller = module.get<SolicitudController>(SolicitudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a solicitud', () => {
    const createSolicitudDto : CreateSolicitudDto = {
      nombre: 'Jhon Doe',
      cargo: 'Desarrollador',
      unidad: 'TIC',
      telefono: '1234567890',
      email: 'jhondoe@gmail.com',
      tipo: '',
      nombreActividad:'',
      start: undefined,
      end: undefined,
      dia:'',
      horaInicio:'',
      horaFin:'',
    }
  expect(controller.create(createSolicitudDto)).toEqual({id: expect.any(Number), ...createSolicitudDto})
  })

  it('should update a solicitud', () => {
    const updateSolicitudDto : UpdateSolicitudDto = {
      nombre: 'Jhon Calle',
      cargo: 'Desarrollador',
      unidad: 'Software',
      telefono: '1234567890',
      email: 'jhondoe@gmail.com',
      tipo: '',
      nombreActividad:'',
      start: undefined,
      end: undefined,
      dia:'',
      horaInicio:'',
      horaFin:''
  }
  const solicitudId = '2';
  expect(controller.update(solicitudId, updateSolicitudDto)).toEqual({id: +solicitudId, ...updateSolicitudDto});
  expect(mockSolicitudService.update).toHaveBeenCalledWith(+solicitudId, updateSolicitudDto);
})
});
