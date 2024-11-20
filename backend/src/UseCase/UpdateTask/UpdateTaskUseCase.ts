import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import UpdateTaskDto from './UpdateTaskDto'; // Assurez-vous que ce fichier existe
import TaskRepository from 'src/Repositories/TaskRepository'; // Assurez-vous que ce fichier existe

@Injectable()
export default class UpdateTaskUseCase implements UseCase<Promise<Task>, [dto: UpdateTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: UpdateTaskDto): Promise<Task> {
    // Validation DTO
    if (dto.id === null || typeof dto.id !== 'number') {
      throw new BadRequestException('Valid task ID is required');
    }
    
    if (!dto.name || typeof dto.name !== 'string' || dto.name.trim().length === 0) {
      throw new BadRequestException('Task name is required and must be a non-empty string');
    }

    try {
      // Mise à jour dans la base de données via le dépôt
      const updatedTask = await this.taskRepository.update(dto.id, { name: dto.name }); // Changer pour update
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new InternalServerErrorException('Failed to update task');
    }
  }
}