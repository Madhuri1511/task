export default interface IPnPQueryOptions {
    select?: string[];
    filter?: string;
    expand?: string[];
    top?: number;
    skip?: number;
    orderBy?: string;
    isSortOrderAsc?: boolean;
    listName: string;
    listInternalName?: string;
}