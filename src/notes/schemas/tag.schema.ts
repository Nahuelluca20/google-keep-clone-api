import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';
import { Note } from './note.schema';
import { PartialType } from '@nestjs/mapped-types';

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  tagName: string;

  @ApiProperty()
  @Prop({ type: [{ type: Types.ObjectId, ref: Note.name }] })
  notes: Types.Array<Note>;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

export class UpdateTag extends PartialType(Tag) {}
