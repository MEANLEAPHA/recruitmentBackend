import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [AuthenticationModule, JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
