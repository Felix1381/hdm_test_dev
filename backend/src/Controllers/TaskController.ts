import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import UpdateTaskDto from '../UseCase/UpdateTask/UpdateTaskDto'; // Assurez-vous que ce fichier existe
import UpdateTaskUseCase from 'src/UseCase/UpdateTask/UpdateTaskUseCase';
import UseCaseFactory from '../UseCase/UseCaseFactory';

@Controller('tasks')
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get()
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post()
  async create(@Body() dto: SaveTaskDto) {
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const taskId = Number(id);
    dto.id = taskId; // Ajout de l'ID à l'objet DTO
    return (await this.useCaseFactory.create(UpdateTaskUseCase)).handle(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}