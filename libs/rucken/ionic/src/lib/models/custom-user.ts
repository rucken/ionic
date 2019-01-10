import { User, transformDateToString } from '@rucken/core';
import { Transform } from 'class-transformer';

export class CustomUser extends User {
    @Transform(transformDateToString, { toClassOnly: true })
    @Transform(transformDateToString, { toPlainOnly: true })
    dateOfBirth: Date = undefined;
}
