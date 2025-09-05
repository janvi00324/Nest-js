import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor() {}

  //Explicit name added to avoid crypto.randomUUID() error in Node 18+ environments
  //   @Cron('* * * * * *', { name: 'sendMailReminder' })
  @Cron(CronExpression.EVERY_SECOND, { name: 'sendMailReminder' })
  async sendMailReminder() {
    console.log('Cron job runs');
  }
}
