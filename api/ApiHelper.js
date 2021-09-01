async function checkErrors(resp) {
  if (resp.ok) {
    return resp;
  }
  let errorMsg = `ERROR ${resp.status} (${resp.statusText})`;
  const serverText = await resp.text();
  if (serverText) {
    errorMsg = `${errorMsg}: ${serverText}`;
  }
  const error = new Error(errorMsg);
  error.message = resp;
  throw error;
}
async function toJSON(resp) {
  const result = await resp.text();
  if (result) return JSON.parse(result);
}
async function send(url, method, data, contentType) {
  const options = {
    method: method,
    headers: {},
    mode: 'cors',
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  if (contentType) {
    options.headers['Content-Type'] = contentType;
  }
  const result = await fetch(url, options);
  await checkErrors(result);
  return await toJSON(result);
}
export function postAsync(url, data) {
  return send(url, 'POST', data, 'application/JSON');
}
export function putAsync(url, data) {
  return send(url, 'PUT', data, 'application/json');
}
export async function getAsync(url) {
  return send(url, 'GET');
}
export function deleteAsync(url) {
  return send(url, 'DELETE');
}
//# sourceMappingURL=ApiHelper.js.map
