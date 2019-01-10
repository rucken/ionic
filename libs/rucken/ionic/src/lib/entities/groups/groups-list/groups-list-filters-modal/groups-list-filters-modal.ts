import { Group, serializeModel, translate } from '@rucken/core';
import { plainToClass, Transform, Type } from 'class-transformer';
import { IModel } from 'ngx-repository';
import { SelectInput } from '../../../../components/select-input/select-input';
import { keyToSelectInput, selectInputToKey } from '../../../../components/select-input/select-input.transformers';

export class GroupsListFiltersModal implements IModel {
    static strings = {
        sortField: translate('Sort field'),
        sortType: translate('Sort type')
    };
    static sortFields: SelectInput[] = [
        { id: 'id', title: translate('Id') },
        { id: 'name', title: translate('Name') },
        { id: 'title', title: translate('Title') }
    ];
    static sortTypes: SelectInput[] = [
        { id: 'asc', title: translate('Asc') },
        { id: 'desc', title: translate('Desc') }
    ];
    id = undefined;
    @Type(serializeModel(SelectInput))
    @Transform(
        keyToSelectInput({ items: GroupsListFiltersModal.sortFields }),
        { toClassOnly: true, groups: ['manual'] }
    )
    @Transform(
        selectInputToKey({ items: GroupsListFiltersModal.sortFields }),
        { toPlainOnly: true, groups: ['manual'] }
    )
    sortField: SelectInput = undefined;
    @Type(serializeModel(SelectInput))
    @Transform(
        keyToSelectInput({ items: GroupsListFiltersModal.sortTypes }),
        { toClassOnly: true, groups: ['manual'] }
    )
    @Transform(
        selectInputToKey({ items: GroupsListFiltersModal.sortTypes }),
        { toPlainOnly: true, groups: ['manual'] }
    )
    sortType: SelectInput = undefined;

    static default() {
        return plainToClass(
            GroupsListFiltersModal,
            {
                sortField: 'id',
                sortType: 'desc'
            },
            {
                groups: ['manual']
            }
        );
    }
}
