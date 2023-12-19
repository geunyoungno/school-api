import { HttpException, HttpStatus } from '@nestjs/common';
import { InsertResult } from 'typeorm';

/*
 * auto incremental 을 사용하는 경우 insertId는 다음 증분 값 숫자를 돌려준다. 그래서
 * on duplicate key upate를 사용하는 경우 insertId는 다음 증분 값 숫자를 돌려주고 현재 내가 업데이트한 row의 pk를
 * 돌려주지 않는다, 따라서 on duplicate key upate를 사용하는 경우 이 값을 사용하지 마라
 */
export default function getInsertResultId(result: InsertResult): number {
  if ('raw' in result) {
    const insertId = result.raw.insertId;

    if (typeof insertId === 'number') {
      return insertId;
    }

    return parseInt(insertId, 10);
  }

  throw new HttpException(`id not found`, HttpStatus.NOT_FOUND);
}
