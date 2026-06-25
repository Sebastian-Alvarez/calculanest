import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import { BadRequestException } from '@nestjs/common';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [
        {
          provide: CalculatorService,
          useValue: {
            sumar: jest.fn().mockReturnValue(8),
            restar: jest.fn().mockReturnValue(2),
            multiplicar: jest.fn().mockReturnValue(15),
            dividir: jest.fn().mockImplementation((a, b) => {
              if (b === 0) {
                throw new BadRequestException('No se puede dividir por cero');
              }
              return 5;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sumar', () => {
    it('should call service.sumar and return structured object', () => {
      const result = controller.sumar(5, 3);
      expect(service.sumar).toHaveBeenCalledWith(5, 3);
      expect(result).toEqual({
        operation: 'sumar',
        a: 5,
        b: 3,
        result: 8,
      });
    });
  });

  describe('restar', () => {
    it('should call service.restar and return structured object', () => {
      const result = controller.restar(5, 3);
      expect(service.restar).toHaveBeenCalledWith(5, 3);
      expect(result).toEqual({
        operation: 'restar',
        a: 5,
        b: 3,
        result: 2,
      });
    });
  });

  describe('multiplicar', () => {
    it('should call service.multiplicar and return structured object', () => {
      const result = controller.multiplicar(5, 3);
      expect(service.multiplicar).toHaveBeenCalledWith(5, 3);
      expect(result).toEqual({
        operation: 'multiplicar',
        a: 5,
        b: 3,
        result: 15,
      });
    });
  });

  describe('dividir', () => {
    it('should call service.dividir and return structured object', () => {
      const result = controller.dividir(10, 2);
      expect(service.dividir).toHaveBeenCalledWith(10, 2);
      expect(result).toEqual({
        operation: 'dividir',
        a: 10,
        b: 2,
        result: 5,
      });
    });

    it('should propagate errors from service.dividir', () => {
      expect(() => controller.dividir(10, 0)).toThrow(BadRequestException);
    });
  });
});
