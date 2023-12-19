import { HttpException, HttpStatus } from '@nestjs/common';

export default function getHeaderUserId<THeader extends object>(headers: THeader): number {
  if ('userId' in headers && (typeof headers.userId === 'number' || typeof headers.userId === 'string')) {
    return parseInt(`${headers.userId}`, 10);
  }

  // header 에서 loser case로 변환되어서 확인 필요
  if ('userid' in headers && (typeof headers.userid === 'number' || typeof headers.userid === 'string')) {
    return parseInt(`${headers.userid}`, 10);
  }

  throw new HttpException('userId not exist header', HttpStatus.BAD_REQUEST);
}
