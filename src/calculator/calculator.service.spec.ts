import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { BadRequestException } from '@nestjs/common';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sumar', () => {
    it('should correctly sum two numbers', () => {
      expect(service.sumar(5, 3)).toBe(8);
      expect(service.sumar(-5, 5)).toBe(0);
    });
  });

  describe('restar', () => {
    it('should correctly subtract two numbers', () => {
      expect(service.restar(10, 4)).toBe(6);
      expect(service.restar(5, 8)).toBe(-3);
    });
  });

  describe('multiplicar', () => {
    it('should correctly multiply two numbers', () => {
      expect(service.multiplicar(3, 4)).toBe(12);
      expect(service.multiplicar(-2, 5)).toBe(-10);
    });
  });

  describe('dividir', () => {
    it('should correctly divide two numbers', () => {
      expect(service.dividir(10, 2)).toBe(5);
    });

    it('should throw BadRequestException when dividing by zero', () => {
      expect(() => service.dividir(10, 0)).toThrow(BadRequestException);
      expect(() => service.dividir(10, 0)).toThrow('No se puede dividir por cero');
    });
  });
});
