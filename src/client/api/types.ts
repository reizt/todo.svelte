import type { Endpoint } from '#/def/lib/endpoint';
import type { z } from 'zod';

type OptionalInfer<T, F> = T extends z.ZodTypeAny ? z.infer<T> : F;
export type InferClientIn<T extends Endpoint> = OptionalInfer<T['request']['body'], {}> &
  OptionalInfer<T['request']['query'], {}> &
  OptionalInfer<T['request']['params'], {}>;
export type InferClientOut<T extends Endpoint> = OptionalInfer<T['response']['body'], undefined>;
