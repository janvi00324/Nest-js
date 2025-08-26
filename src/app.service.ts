import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT 1');
      console.log('DB is connected and responding');
    } catch (error) {
      console.error('Failed to connect to the database:', error.message);
    }
  }
}
