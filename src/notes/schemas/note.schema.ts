import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { Tag } from './tag.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  title: string;

  @Prop()
  @ApiProperty()
  @IsString()
  content: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: () => Tag }] })
  tags: Tag | Types.Array<Tag>;

  @Prop()
  @ApiProperty()
  @IsString()
  reminder: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Prop()
  archived: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

export class UpdateNote extends PartialType(Note) {}
