import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';

describe('SolicitudController', () => {
  let controller: SolicitudController;
  let mockSolicitudService = {}

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
});
