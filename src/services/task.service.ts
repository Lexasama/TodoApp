import {
  createTaskAsync,
  deleteTaskAsync,
  getAllAsync,
  updateTaskAsync,
} from '../api/task/TaskApi';
import {Task} from '../models/task/Task';

class TaskService {
  async create(title: string) {
    return await createTaskAsync(title);
  }
  async delete(id: number) {
    return await deleteTaskAsync(id);
  }

  async list(): Promise<Array<Task>> {
    return await getAllAsync();
  }

  async update(id: number, task: Task) {
    return await updateTaskAsync(id, task);
  }
}

export default new TaskService();
