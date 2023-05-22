import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.trim())
  public email: string;

  @IsNotEmpty()
  @MinLength(10)
  public password: string;
}

// Also check, OmitType, PickType, PartialType, IntersectionType
