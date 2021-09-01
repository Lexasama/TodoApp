import {Task} from '../../models/task/Task';
import {postAsync, getAsync, deleteAsync, putAsync} from '../ApiHelper';

const endpoint = 'http://localhost:5000' + '/api/tasks';

export async function getAllAsync() {
  return await getAsync(endpoint);
}

export async function createTaskAsync(title: string) {
  return await postAsync(endpoint, {title: title});
}

export async function deleteTaskAsync(id: number) {
  return await deleteAsync(`${endpoint}/${id}`);
}

export async function updateTaskAsync(id: number, model: Task) {
  return await putAsync(`${endpoint}/${id}`, model);
}
