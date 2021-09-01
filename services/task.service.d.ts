import {Task} from '../models/task/Task';
declare class TaskService {
  create(title: string): Promise<any>;
  delete(id: number): Promise<any>;
  list(): Promise<Array<Task>>;
  update(id: number, task: Task): Promise<any>;
}
declare const _default: TaskService;
export default _default;
//# sourceMappingURL=task.service.d.ts.map
