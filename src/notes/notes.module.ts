import { Module } from '@nestjs/common';
import {
  ArchiveService,
  NotesService,
  ReminderService,
  TagsService,
} from './services';
import {
  TagsController,
  ReminderController,
  NotesController,
  ArchiveController,
} from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }]),
  ],
  providers: [NotesService, ArchiveService, ReminderService, TagsService],
  controllers: [
    TagsController,
    ReminderController,
    NotesController,
    ArchiveController,
  ],
})
export class NotesModule {}
