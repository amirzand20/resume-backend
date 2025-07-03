import { RedisManagerService } from '@/bootstrap/redis/redis-manager.service';
import { Injectable } from '@nestjs/common';
import { Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { randomInt } from 'crypto';
import { exceptions } from 'winston';

@Injectable()
export class ExamPersonnelSchedule {
  constructor(
    readonly redisService: RedisManagerService,
    private schedulerRegistry:SchedulerRegistry
  ) {}

  // @Interval(Number(process.env.INTERVAL_TIME))
  // async handleInterval() {
    // const now = Date.now();
    // console.log(now.toString());
    // const data = await this.redisService.getUserExam(12, null, null,now.toString());
    // console.log(data)

  //   let tName = `TOut:${randomInt(100000)}`
  //   let sec = randomInt(10000)
  //   this.addTimeout(tName,sec)
    // console.log(this.schedulerRegistry.getTimeouts())
    
  //   console.log(this.schedulerRegistry.getTimeouts())
  
  // }


  // addTimeout(name: string, milliseconds: number) {

  //   const callback = (_name) => {
  //     console.warn(`${_name}`);
  //     try{
  //       this.schedulerRegistry.deleteTimeout(_name);
  //     }catch(e){
  //       console.log(e)
  //     }
  //   };
  
  //   const func = setTimeout(()=>callback(name), milliseconds);

  //   this.schedulerRegistry.addTimeout(name,func);
  // }

  // stopInterval(stopFlag){
    //put this code for stop interval 
    // this.stopInterval(process.env.INTERVAL_STATUS ?? false)  

  //   if(stopFlag){
  //     const interval = this.schedulerRegistry.getInterval('handleInterval')
  //     clearInterval(interval);
  //   }
  // }
}
