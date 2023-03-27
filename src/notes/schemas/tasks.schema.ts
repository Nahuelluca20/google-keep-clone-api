import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TasksDocument = HydratedDocument<Tasks>;

@Schema()
export class Tasks {
  @Prop()
  tasks: string;

  @Prop()
  text: string;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
