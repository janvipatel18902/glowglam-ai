import { Module } from '@nestjs/common';
import { SkinTestController } from './skin-test.controller';
import { SkinTestService } from './skin-test.service';
import { SkinTestAnalysisService } from './skin-test-analysis.service';

@Module({
  controllers: [SkinTestController],
  providers: [SkinTestService, SkinTestAnalysisService],
})
export class SkinTestModule {}
