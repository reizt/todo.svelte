import type { ApiRequest, ApiResponse } from '#/defs/lib/api';
import { makeRealPath } from './make-real-path';

export const execApiRequest = async (req: ApiRequest): Promise<ApiResponse> => {
  const path = makeRealPath(req.path, req.params);
  const res = await fetch(`/api${path}`, {
    method: req.method.toUpperCase(),
    body: req.body != null ? JSON.stringify(req.body) : null,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
  });
  let json: any = null;
  try {
    json = await res.json();
  } catch {}
  return {
    status: res.status,
    body: json,
    cookies: {},
  };
};