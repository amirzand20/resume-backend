import { Inject, Injectable, Delete } from '@nestjs/common';
import { log } from 'console';
import IORedis from 'ioredis';

@Injectable()
export class RedisManagerService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: IORedis) {}

  private async setKey(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  private async getKey(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }
  private async deleteKey(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async setUserExam(
    userId: number,
    examId: number,
    endTime: string,
  ): Promise<any> {
    if (userId == null || examId == null || endTime == null) return false;
    else {
      this.setKey(`${userId}:${examId}:${endTime}`, '0');
      return true;
    }
  }
  async getUserExam(
    userId: number = null,
    examId: number = null,
    endTime: string = null,
    currentTime: string = null,
  ): Promise<any> {
    let pointer = 0;
    let a: any[] = [];
    let dataPointer: any = {};
    do {
      dataPointer = await this.userExamChecker(
        userId,
        examId,
        endTime,
        currentTime,
      );
    } while (pointer != 0);
    {
      dataPointer = await this.userExamChecker(
        userId,
        examId,
        endTime,
        currentTime,
      );
    }

    return dataPointer.data;
  }

  private async userExamChecker(
    userId,
    examId,
    endTime = null,
    currentTime = null,
  ) {
    let [pointer, data] = await this.redisClient.scan(
      0,
      'MATCH',
      `${userId ?? '*'}:${examId ?? '*'}:${endTime ?? '*'}`,
      'COUNT',
      1000,
    );
    const expiredKeys: any = [];
    for (const key of data) {
      if (key.split(':')[2] <= currentTime || key.split(':')[2] === 'null') {
        expiredKeys.push(key);
      }
    }
    expiredKeys.length > 0 ? this.deleteKey(expiredKeys) : '';
    return { pointer: pointer, data: data };
  }
}
