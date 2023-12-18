export const CE_AUTHORIZATION_TARGET = {
  SCHOOL: 'school',
} as const;

export type TAuthorizationTarget = (typeof CE_AUTHORIZATION_TARGET)[keyof typeof CE_AUTHORIZATION_TARGET];
