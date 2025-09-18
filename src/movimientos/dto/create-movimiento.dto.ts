import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovimientoDto {
  @ApiProperty({ description: 'Type of movement (e.g., transfer, deposit, withdrawal)' })
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @ApiProperty({ description: 'Amount in minor units or currency units depending on implementation' })
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty({ description: 'Account from which the movement originates' })
  @IsNotEmpty()
  @IsString()
  readonly accountFrom: string;

  @ApiProperty({ description: 'Account to which the movement is destined' })
  @IsNotEmpty()
  @IsString()
  readonly accountTo: string;

  @ApiPropertyOptional({ description: 'Optional description for the movement' })
  @IsOptional()
  @IsString()
  readonly description?: string;
}
