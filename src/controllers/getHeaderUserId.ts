import { HttpException, HttpStatus } from '@nestjs/common';

export default function getHeaderUserId<THeader extends object>(headers: THeader): number {
  if (
    'userId' in headers &&
    (typeof getHeaderUserId(headers) === 'number' || typeof getHeaderUserId(headers) === 'string')
  ) {
    return parseInt(`${getHeaderUserId(headers)}`, 10);
  }

  // header 에서 loser case로 변환되어서 확인 필요
  if ('userid' in headers && (typeof headers.userid === 'number' || typeof headers.userid === 'string')) {
    return parseInt(`${headers.userid}`, 10);
  }

  throw new HttpException('userId not exist header', HttpStatus.BAD_REQUEST);
}
