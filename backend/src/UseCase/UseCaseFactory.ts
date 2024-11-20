import { Injectable } from '@nestjs/common';
import SaveTaskUseCase from './SaveTask/SaveTaskUseCase';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import UpdateTaskUseCase from './UpdateTask/UpdateTaskUseCase'; // Importer le cas d'utilisation de mise à jour
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class UseCaseFactory {
  constructor(
    private readonly taskRepository: TaskRepository, // Injection du repository
  ) {}

  public create<T>(useCase: new (...args: any[]) => T): T {
    if (useCase === SaveTaskUseCase) {
      return new SaveTaskUseCase(this.taskRepository) as unknown as T; // Fournir le dépôt ici
    }
    if (useCase === DeleteTask) {
      return new DeleteTask(this.taskRepository) as unknown as T; // Fournir le dépôt ici
    }
    if (useCase === GetAllTasksUseCase) {
      return new GetAllTasksUseCase(this.taskRepository) as unknown as T; // Fournir le dépôt ici
    }
    if (useCase === UpdateTaskUseCase) { // Ajout de la condition pour UpdateTaskUseCase
      return new UpdateTaskUseCase(this.taskRepository) as unknown as T; // Fournir le dépôt ici
    }
    throw new Error('Use case not found');
  }
}