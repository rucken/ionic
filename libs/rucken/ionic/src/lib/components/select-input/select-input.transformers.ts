export function keyToSelectInput(
    options: {
        idField?: string;
        titleField?: string;
        items?: { id: string | number, title: string }[],
        isArray?: boolean;
    }
) {
    return (
        key:
            string |
            number |
            (string | number)[]
    ) => {
        if (options.isArray === undefined) {
            options.isArray = false;
        }
        if (options.idField === undefined) {
            options.idField = 'id';
        }
        const itemsIsEmpty = !options.items || options.items.length === 0;
        if (itemsIsEmpty) {
            options.items = [];
        }
        const keys = (
            options.isArray ? key : (key !== undefined ? [key] : [])
        ) as (string | number)[];
        keys.forEach(eachKey => {
            if (itemsIsEmpty) {
                options.items.push({
                    id: eachKey,
                    title: eachKey as string,
                });
            }
        });
        const transformedItems = options.items.map(
            item => ({
                id: item[options.idField],
                title: options.titleField ? item[options.titleField] : (item || item['title'] || ''),
            })
        );
        const items = keys.map(
            eachKey =>
                transformedItems.filter(item =>
                    item.id === eachKey
                )[0]
        );
        return options.isArray ? items : items[0];
    };
}
export function selectInputToKey(
    options: {
        idField?: string;
        titleField?: string;
        items?: { id: string | number, title: string }[],
        isArray?: boolean;
    }
) {
    return (
        object:
            { id: string | number, title: string } |
            { id: string | number, title: string }[]
    ) => {
        if (options.isArray === undefined) {
            options.isArray = false;
        }
        if (options.idField === undefined) {
            options.idField = 'id';
        }
        const itemsIsEmpty = !options.items || options.items.length === 0;
        if (itemsIsEmpty) {
            options.items = [];
        }
        const objects = (
            options.isArray ? object : (object ? [object] : [])
        ) as { id: string | number, title: string }[];
        objects.forEach(eachObject => {
            if (itemsIsEmpty) {
                options.items.push(eachObject);
            }
        });
        const transformedItems = options.items.map(
            item => ({
                id: item[options.idField],
                title: options.titleField ? item[options.titleField] : (item || item['title'] || '')
            })
        );
        const keys = objects.map(
            eachObject => {
                const item = transformedItems.filter(eachItem =>
                    eachItem.id === eachObject.id
                )[0];
                return item ? item.id : item;
            }
        );
        return options.isArray ? keys : keys[0];
    };
}
