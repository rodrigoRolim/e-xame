import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLaboratoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
  
  @IsString()
  phone_1: string;
  
  @IsString()
  @IsOptional()
  phone_2?: string;
  
  @IsString()
  email: string;
  
  @IsString()
  @IsOptional()
  site?: string;
};
