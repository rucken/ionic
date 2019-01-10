import { IModel } from 'ngx-repository';

export class SelectInput implements IModel {
    id: string | number;
    title: string;
}
