import { Tag, TagDocument, UpdateTag } from '@/notes/schemas';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async findAll() {
    const tags = await this.tagModel.find().populate('notes').exec();
    return tags;
  }

  async create(createTag: Tag) {
    const createdNote = await new this.tagModel(createTag);
    return createdNote.save();
  }

  async delete(id: string) {
    const tag = await this.tagModel.findByIdAndDelete(id).exec();
    if (!tag) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return tag;
  }

  async addNoteToTag(tagId: string, note: any) {
    const tag = await this.tagModel.updateOne({ _id: tagId }, { $push: note });
    return tag;
  }

  async removeNoteFromTag(tagId: string, note: any) {
    const tag = await this.tagModel.updateOne({ _id: tagId }, { $pull: note });
    return tag;
  }

  async update(id: string, changes: UpdateTag) {
    const note = await this.tagModel
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
