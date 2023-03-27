import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateNotesDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @IsBoolean()
  readonly archive: boolean;

  @IsDateString()
  readonly reminder: string;
}

export class UpdateNotesDto extends PartialType(CreateNotesDto) {}
