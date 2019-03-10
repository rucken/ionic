import { transformDateToString, transformStringToDate, User } from '@rucken/core';
import { Transform } from 'class-transformer';

export class CustomUser extends User {
    @Transform(transformDateToString, { toClassOnly: true })
    @Transform(transformStringToDate, { toPlainOnly: true })
    dateOfBirth: Date | string = undefined;
}
