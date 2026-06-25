import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  sumar(a: number, b: number): number {
    return a + b;
  }

  restar(a: number, b: number): number {
    return a - b;
  }

  multiplicar(a: number, b: number): number {
    return a * b;
  }

  dividir(a: number, b: number): number {
    if (b === 0) {
      throw new BadRequestException('No se puede dividir por cero');
    }
    return a / b;
  }
}
