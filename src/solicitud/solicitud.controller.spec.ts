import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudServiceMock } from './solicitud-service-mock';

describe('SolicitudController', () => {
  let controller: SolicitudController;
  let service: SolicitudService;

  beforeEach(async () => {
    const SolicitudServiceProvider = {
      provide: SolicitudService,
      useClass: SolicitudServiceMock
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudController],
      providers: [SolicitudService, SolicitudServiceProvider],
    }).overrideProvider(SolicitudService).useClass(SolicitudServiceMock).compile();

    controller = module.get<SolicitudController>(SolicitudController);
    service = module.get<SolicitudService>(SolicitudService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a solicitud', async () => {
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
  expect(await controller.create(createSolicitudDto)).toEqual({id: expect.any(Number), ...createSolicitudDto})
  })

  it('should update a solicitud', async () => {
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
  expect(await controller.update(solicitudId, updateSolicitudDto)).toEqual({id: +solicitudId, ...updateSolicitudDto});
  const updateSpy = jest.spyOn(service, 'update');
  controller.update(solicitudId, updateSolicitudDto);
  expect(updateSpy).toHaveBeenCalledWith(+solicitudId, updateSolicitudDto);
})
});
