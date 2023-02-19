import { Module } from "@nestjs/common";
import { LaboratoryController } from "./laboratories.controller";
import { LaboratoryService } from "./laboratories.service";

@Module({
  controllers: [LaboratoryController],
  providers: [LaboratoryService]
})
export class LaboratoryModule {}
