import { plainToClass } from 'class-transformer';
import { IRestProviderOptions, PaginationMeta, ProviderActionEnum } from 'ngx-repository';
import { CustomUser } from '../models/custom-user';

export const IONIC_DEFAULT_USERS_CONFIG: IRestProviderOptions<CustomUser> = {
    name: 'user',
    pluralName: 'users',
    autoload: true,
    paginationMeta: {
        perPage: 5
    },
    actionOptions: {
        responseData: (data: any, action: ProviderActionEnum) => {
            if (action === ProviderActionEnum.Delete) {
                return true;
            } else {
                if (action === ProviderActionEnum.LoadAll) {
                    return plainToClass(CustomUser, data && data.body && data.body.users);
                } else {
                    return plainToClass(CustomUser, data && data.body && data.body.user);
                }
            }
        },
        responsePaginationMeta: (data: any, action: ProviderActionEnum): PaginationMeta => {
            return { totalResults: data && data.body && data.body.meta && data.body.meta.totalResults, perPage: undefined };
        }
    },
    restOptions: {
        limitQueryParam: 'per_page',
        pageQueryParam: 'cur_page',
        searchTextQueryParam: 'q'
    }
};
