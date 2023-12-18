import { DataSource, EntityManager } from 'typeorm';

export type TConn = DataSource | EntityManager;
