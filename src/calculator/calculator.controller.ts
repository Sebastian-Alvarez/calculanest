import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('sumar')
  sumar(
    @Query('a', ParseFloatPipe) a: number,
    @Query('b', ParseFloatPipe) b: number,
  ) {
    return {
      operation: 'sumar',
      a,
      b,
      result: this.calculatorService.sumar(a, b),
    };
  }

  @Get('restar')
  restar(
    @Query('a', ParseFloatPipe) a: number,
    @Query('b', ParseFloatPipe) b: number,
  ) {
    return {
      operation: 'restar',
      a,
      b,
      result: this.calculatorService.restar(a, b),
    };
  }

  @Get('multiplicar')
  multiplicar(
    @Query('a', ParseFloatPipe) a: number,
    @Query('b', ParseFloatPipe) b: number,
  ) {
    return {
      operation: 'multiplicar',
      a,
      b,
      result: this.calculatorService.multiplicar(a, b),
    };
  }

  @Get('dividir')
  dividir(
    @Query('a', ParseFloatPipe) a: number,
    @Query('b', ParseFloatPipe) b: number,
  ) {
    return {
      operation: 'dividir',
      a,
      b,
      result: this.calculatorService.dividir(a, b),
    };
  }
}
