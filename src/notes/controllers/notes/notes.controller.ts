import { NotesService } from '@/notes/services';
import { Controller, Get } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesSevice: NotesService) {}

  @Get()
  findAll() {
    return this.notesSevice.findAll();
  }
}
