import { Note, NoteDocument, UpdateNote } from '@/notes/schemas';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async findAll(): Promise<Note[]> {
    const notes = await this.noteModel.find().populate('tags').exec();
    return notes;
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id).exec();
    return note;
  }

  async create(createNote: Note): Promise<Note> {
    const createdNote = await new this.noteModel(createNote);
    return createdNote.save();
  }

  async delete(id: string): Promise<Note> {
    const note = await this.noteModel.findByIdAndDelete(id).exec();
    if (!note) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return note;
  }

  async addTagsToNote(noteId: string, tags: string[]): Promise<UpdateResult> {
    return this.noteModel.findByIdAndUpdate(
      noteId,
      { $addToSet: { tags: { $each: tags } } },
      { new: true },
    );
  }

  async update(id: string, changes: UpdateNote): Promise<Note> {
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
