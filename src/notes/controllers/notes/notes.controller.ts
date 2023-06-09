import { Note, UpdateNote } from '@/notes/schemas';
import { NotesService } from '@/notes/services';
import { ValidationPipe } from '@/pipes/validation.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesSevice: NotesService) {}

  @Post(':id/tags')
  addTagsToNote(@Param('id') id: string, @Body('tags') tags: string[]) {
    return this.notesSevice.addTagsToNote(id, tags);
  }

  @Delete(':id/tag/:tagId')
  removeTagsFromNote(@Param('id') id: string, @Param('tagId') tagId: string) {
    return this.notesSevice.removeTagsFromNote(id, tagId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesSevice.findOne(id);
  }

  @Get()
  findAll() {
    return this.notesSevice.findAll();
  }

  @Post()
  create(@Body(new ValidationPipe()) createNote: Note) {
    return this.notesSevice.create(createNote);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateNote) {
    return this.notesSevice.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesSevice.delete(id);
  }
}
