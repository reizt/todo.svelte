import type { IDatabase } from './db';
import type { IHasher } from './hasher';
import type { IMailer } from './mailer';
import type { ISigner } from './signer';

export type Context = {
  db: IDatabase;
  signer: ISigner;
  mailer: IMailer;
  hasher: IHasher;
};
