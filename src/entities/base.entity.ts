import IBaseSchema from '#entities/interfaces/IBaseSchema';
import { EntitySchemaColumnOptions } from 'typeorm';

export const createdAt: EntitySchemaColumnOptions = {
  type: 'timestamp',
  name: 'created_at',
  default: () => 'CURRENT_TIMESTAMP',
  comment: '필드 생성한 날짜',
  nullable: false,
};

export const createdBy: EntitySchemaColumnOptions = {
  type: 'varchar',
  name: 'created_by',
  comment: '처음으로 필드를 생성한 사용자',
  nullable: true,
};

export const updatedAt: EntitySchemaColumnOptions = {
  type: 'timestamp',
  name: 'updated_at',
  default: () => 'CURRENT_TIMESTAMP',
  onUpdate: 'CURRENT_TIMESTAMP',
  comment: '필드 수정한 날짜',
  nullable: false,
};

export const updatedBy: EntitySchemaColumnOptions = {
  type: 'varchar',
  name: 'updated_by',
  comment: '마지막으로 필드를 수정한 사용자',
  nullable: true,
};

const BaseEntity = {
  columns: {
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
  } satisfies Record<keyof IBaseSchema, EntitySchemaColumnOptions>,
};

export default BaseEntity;
