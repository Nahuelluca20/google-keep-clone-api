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
import { Note, NoteSchema, Tag, TagSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
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
