import { IBaseSchema, ISoftDeleteBaseSchema } from '#entities/interfaces/IBaseSchema';
import { EntitySchemaColumnOptions } from 'typeorm';

export const createdAt: EntitySchemaColumnOptions = {
  type: 'timestamp',
  name: 'created_at',
  default: () => 'CURRENT_TIMESTAMP',
  comment: '생성 시점',
  nullable: false,
};

export const createdBy: EntitySchemaColumnOptions = {
  type: 'varchar',
  name: 'created_by',
  comment: '생성한 사용자',
  nullable: true,
};

export const updatedAt: EntitySchemaColumnOptions = {
  type: 'timestamp',
  name: 'updated_at',
  default: () => 'CURRENT_TIMESTAMP',
  onUpdate: 'CURRENT_TIMESTAMP',
  comment: '수정 시점',
  nullable: false,
};

export const updatedBy: EntitySchemaColumnOptions = {
  type: 'varchar',
  name: 'updated_by',
  comment: '가장 최근에 수정한 사용자',
  nullable: true,
};

export const isDeleted: EntitySchemaColumnOptions = {
  type: 'boolean',
  default: false,
  comment: '삭제 여부',
  name: 'is_deleted',
};

export const deletedAt: EntitySchemaColumnOptions = {
  type: 'timestamp',
  nullable: true,
  comment: '삭제 시점',
  name: 'deleted_at',
};

export const deletedBy: EntitySchemaColumnOptions = {
  type: 'varchar',
  name: 'deletedBy',
  comment: '삭제한 사용자',
  nullable: true,
};

export const BaseEntity = {
  columns: {
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
  } satisfies Record<keyof IBaseSchema, EntitySchemaColumnOptions>,
};

export const SoftDeleteBaseEntity = {
  columns: {
    ...BaseEntity.columns,
    isDeleted,
    deletedAt,
    deletedBy,
  } satisfies Record<keyof ISoftDeleteBaseSchema, EntitySchemaColumnOptions>,
};
