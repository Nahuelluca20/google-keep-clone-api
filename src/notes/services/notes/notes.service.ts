import { Tasks, TasksDocument } from '@/notes/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<TasksDocument>,
  ) {}

  findAll() {
    const tasks = this.tasksModel.find().exec();
    return tasks;
  }
}
