import {postAsync, getAsync, deleteAsync, putAsync} from '../ApiHelper';
const endpoint = 'http://localhost:5000' + '/api/tasks';
export async function getAllAsync() {
  return await getAsync(endpoint);
}
export async function createTaskAsync(title) {
  return await postAsync(endpoint, {title: title});
}
export async function deleteTaskAsync(id) {
  return await deleteAsync(`${endpoint}/${id}`);
}
export async function updateTaskAsync(id, model) {
  return await putAsync(`${endpoint}/${id}`, model);
}
//# sourceMappingURL=TaskApi.js.map
