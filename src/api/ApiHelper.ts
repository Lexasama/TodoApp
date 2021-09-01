async function checkErrors(resp: any) {
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

async function toJSON(resp: any) {
  const result = await resp.text();
  if (result) return JSON.parse(result);
}

async function send(
  url: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  data?: string,
  contentType?: string
) {
  const options: any = {
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

export function postAsync(url: string, data?: any) {
  return send(url, 'POST', data, 'application/JSON');
}
export function putAsync(url: string, data: any) {
  return send(url, 'PUT', data, 'application/json');
}

export async function getAsync(url: string) {
  return send(url, 'GET');
}

export function deleteAsync(url: string) {
  return send(url, 'DELETE');
}
