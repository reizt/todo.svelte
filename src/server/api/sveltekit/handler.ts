import * as endpints from '#/def/export-endpoints';
import type { RequestHandler } from '@sveltejs/kit';
import { app } from '../../app';
import { parseOutput } from '../lib/parse-output';
import { parseRequest } from '../lib/parse-request';
import { makeResponse } from './make-response';
import { parseEvent } from './parse-event';

export const svelteKitApiHandler: RequestHandler = async (event) => {
  const parsedEvent = await parseEvent(endpints, event, '/api');
  if (parsedEvent == null) {
    return new Response(null, { status: 404 });
  }
  const { request, procedureId } = parsedEvent;

  let input: any;
  try {
    input = parseRequest(request, endpints[procedureId]);
  } catch (err) {
    console.error(err);
    const body = { message: 'Validation Failed', errors: err };
    return new Response(JSON.stringify(body), { status: 422 });
  }
  const output = await app[procedureId](input);
  const response = parseOutput(output, endpints[procedureId]);
  console.log(`[SvelteKit] ${request.method} ${request.path} ${response.status}`);
  return makeResponse(response);
};