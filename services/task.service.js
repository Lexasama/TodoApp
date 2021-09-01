import {
  createTaskAsync,
  deleteTaskAsync,
  getAllAsync,
  updateTaskAsync,
} from '../api/task/TaskApi';
class TaskService {
  async create(title) {
    return await createTaskAsync(title);
  }
  async delete(id) {
    return await deleteTaskAsync(id);
  }
  async list() {
    return await getAllAsync();
  }
  async update(id, task) {
    return await updateTaskAsync(id, task);
  }
}
export default new TaskService();
//# sourceMappingURL=task.service.js.map
