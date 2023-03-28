import { Tag, UpdateTag } from '@/notes/schemas';
import { TagsService } from '@/notes/services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsSevice: TagsService) {}

  @Post(':id')
  addNoteToTag(@Param('id') id: string, @Body() note: any) {
    return this.tagsSevice.addNoteToTag(id, note);
  }

  @Put(':id')
  removeNoteFromTag(@Param('id') id: string, @Body() note: any) {
    return this.tagsSevice.removeNoteFromTag(id, note);
  }

  @Get()
  findAll() {
    return this.tagsSevice.findAll();
  }

  @Post()
  create(@Body(new ValidationPipe()) createTag: Tag) {
    return this.tagsSevice.create(createTag);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateTag) {
    return this.tagsSevice.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tagsSevice.delete(id);
  }
}
