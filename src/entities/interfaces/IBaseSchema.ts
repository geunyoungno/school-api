export default interface IBaseSchema {
  createdAt: Date;
  updatedAt: Date;

  createdBy?: string;
  updatedBy?: string;
}
