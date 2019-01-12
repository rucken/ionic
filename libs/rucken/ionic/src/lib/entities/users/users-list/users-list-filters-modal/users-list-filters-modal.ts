import { Group, serializeIdToObject, serializeModel, serializeObjectToId, translate } from '@rucken/core';
import { plainToClass, Transform, Type } from 'class-transformer';
import { IModel } from 'ngx-repository';
import { SelectInput } from '../../../../components/select-input/select-input';
import { keyToSelectInput, selectInputToKey } from '../../../../components/select-input/select-input.transformers';

export class UsersListFiltersModal implements IModel {
    static strings = {
        groups: translate('Groups'),
        sortField: translate('Sort field'),
        sortType: translate('Sort type')
    };
    static sortFields: SelectInput[] = [
        { id: 'id', title: translate('Id') },
        { id: 'username', title: translate('Username') },
        { id: 'isSuperuser', title: translate('Administrator') },
        { id: 'isStaff', title: translate('Staff') },
        { id: 'isActive', title: translate('User') },
        { id: 'firstName', title: translate('First name') },
        { id: 'lastName', title: translate('Last name') },
        { id: 'email', title: translate('Email') },
        { id: 'lastLogin', title: translate('Last login') },
        { id: 'dateJoined', title: translate('Date joined') },
        { id: 'dateOfBirth', title: translate('Date of birth') }
    ];
    static sortTypes: SelectInput[] = [
        { id: 'asc', title: translate('Asc') },
        { id: 'desc', title: translate('Desc') }
    ];
    id = undefined;
    @Type(serializeModel(Group))
    @Transform(
        serializeIdToObject(Group),
        { toClassOnly: true, groups: ['manual'] }
    )
    @Transform(
        serializeObjectToId(Group),
        { toPlainOnly: true, groups: ['manual'] }
    )
    group: Group = undefined;
    @Type(serializeModel(SelectInput))
    @Transform(
        keyToSelectInput({ items: UsersListFiltersModal.sortFields }),
        { toClassOnly: true, groups: ['manual'] }
    )
    @Transform(
        selectInputToKey({ items: UsersListFiltersModal.sortFields }),
        { toPlainOnly: true, groups: ['manual'] }
    )
    sortField: SelectInput = undefined;
    @Type(serializeModel(SelectInput))
    @Transform(
        keyToSelectInput({ items: UsersListFiltersModal.sortTypes }),
        { toClassOnly: true, groups: ['manual'] }
    )
    @Transform(
        selectInputToKey({ items: UsersListFiltersModal.sortTypes }),
        { toPlainOnly: true, groups: ['manual'] }
    )
    sortType: SelectInput = undefined;

    static default() {
        return plainToClass(
            UsersListFiltersModal,
            {
                group: '',
                sortField: 'id',
                sortType: 'desc'
            },
            {
                groups: ['manual']
            }
        );
    }
}
