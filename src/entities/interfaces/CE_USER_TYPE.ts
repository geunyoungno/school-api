export const CE_USER_TYPE = {
  ADMINISTRATOR: 'administrator',
  STUDENT: 'student',
} as const;

export type TUserType = (typeof CE_USER_TYPE)[keyof typeof CE_USER_TYPE];
