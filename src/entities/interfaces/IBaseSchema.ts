export interface IBaseSchema {
  createdAt: Date;
  updatedAt: Date;

  createdBy?: string;
  updatedBy?: string;
}

export interface ISoftDeleteBaseSchema {
  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: string;
}
