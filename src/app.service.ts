import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Hello from AppService!');
    return `${process.env.APP_NAME} is running on port ${process.env.APP_PORT ?? 3000}`;
  }
}
