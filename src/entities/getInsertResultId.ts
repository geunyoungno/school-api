import IInsertIdentifier from '#entities/interfaces/IInsertIdentifier';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InsertResult } from 'typeorm';

export default function getInsertResultId(result: InsertResult): number {
  if ('identifiers' in result && Array.isArray(result.identifiers) && result.identifiers.length > 0) {
    const [identifier] = result.identifiers as IInsertIdentifier[];
    const id = identifier.id;

    return id;
  }

  throw new HttpException(`id not found`, HttpStatus.NOT_FOUND);
}
