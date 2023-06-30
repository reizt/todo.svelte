import { CreateTask } from '#/defs/core/CreateTask';
import type { z } from 'zod';

export const TaskPopUpSchema = CreateTask.request.body.shape.data.pick({
  title: true,
  description: true,
});
export type TaskPopUpInput = z.infer<typeof TaskPopUpSchema>;