// mongoose-plugins.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import mongoose from 'mongoose';
import { accessibleRecordsPlugin } from '@casl/mongoose';

@Module({})
export class MongoosePluginsModule implements OnModuleInit {
  onModuleInit() {
    mongoose.plugin(accessibleRecordsPlugin);
  }
}