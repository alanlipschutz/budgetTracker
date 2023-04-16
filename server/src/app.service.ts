import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeToBudget(): string {
    return 'Hello, welcome to budget!';
  }
}
