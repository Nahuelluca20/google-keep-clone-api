import { Note, NoteDocument, UpdateNote } from '@/notes/schemas';
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async findAll() {
    const notes = await this.noteModel.find().exec();
    return notes;
  }

  async findOne(id: string) {
    const note = await this.noteModel.findById(id).exec();
    return note;
  }

  async create(@Body() createNote: Note) {
    const createdNote = await new this.noteModel(createNote);
    return createdNote.save();
  }

  async update(id: string, @Body() changes: UpdateNote) {
    const note = await this.noteModel
      .findByIdAndUpdate(
        id,
        {
          $set: changes,
        },
        { new: true },
      )
      .exec();
    if (!note) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return note;
  }
}
