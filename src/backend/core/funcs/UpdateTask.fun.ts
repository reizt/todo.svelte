import { authorizeLogin } from '#/backend/core/modules/authorize-login';
import type { CoreFun } from '#/backend/core/types';

export const UpdateTask: CoreFun<'UpdateTask'> = async (input, ctx) => {
  const currentUser = await authorizeLogin({ authToken: input.authToken }, ctx);
  const task = await ctx.db.tasks.findById({
    where: { id: input.id },
  });
  if (task == null || task.userId !== currentUser.id) {
    throw new Error('task not found');
  }

  const updatedTask = await ctx.db.tasks.update({
    where: { id: task.id },
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
    },
  });
  return updatedTask;
};