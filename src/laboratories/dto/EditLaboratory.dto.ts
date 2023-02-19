import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditLaboratoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;
  
  @IsString()
  @IsOptional()
  phone_1?: string;
  
  @IsString()
  @IsOptional()
  phone_2?: String;
  
  @IsString()
  @IsOptional()
  email?: string;
  
  @IsString()
  @IsOptional()
  site?: string;
};
