import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notes extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  archive: boolean;

  @Prop({ type: Date, default: null })
  reminder: Date;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);
