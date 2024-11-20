import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateData: Prisma.TaskUpdateInput | Prisma.TaskUncheckedUpdateInput) {
    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  async save(
    data: Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
  ) {
    if ('id' in data && typeof data.id === 'number') {
      const { id, ...updateData } = data;
      // Passer à la méthode update si l'id est fourni
      return this.update(id, updateData as Prisma.TaskUpdateInput);
    }

    // Si aucune id n'est fournie, on crée une nouvelle tâche
    return this.prisma.task.create({
      data: data as Prisma.TaskCreateInput,
    });
  }
}