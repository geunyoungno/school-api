export const CE_AUTHORIZATION_ROLE = {
  ADMINISTRATOR: 'administrator',
  STUDENT: 'student',
} as const;

export type TAuthorizationRole = (typeof CE_AUTHORIZATION_ROLE)[keyof typeof CE_AUTHORIZATION_ROLE];
