import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from '@/notes/entities';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes.name) private notesModel: Model<Notes>) {}

  async findAll() {
    const notes = await this.notesModel.find().exec();
    return notes;
  }
}
