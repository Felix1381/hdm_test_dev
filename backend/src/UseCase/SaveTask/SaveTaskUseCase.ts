import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository'; // Assurez-vous que ce fichier existe

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validation DTO
    if (!dto.name || typeof dto.name !== 'string' || dto.name.trim().length === 0) {
      throw new BadRequestException('Task name is required and must be a non-empty string');
    }

    try {
      // Sauvegarde dans la base de données via le dépôt
      const task = await this.taskRepository.save(dto); // Changer create en save
      return task;
    } catch (error) {
      console.error('Error saving task:', error);
      throw new InternalServerErrorException('Failed to save task');
    }
  }
}