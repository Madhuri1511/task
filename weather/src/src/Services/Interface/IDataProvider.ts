
import { IFileWithBlob } from "./IFileWithBlob";
import IPnPQueryOptions from "./IPnPQueryOptions";

export interface IDataProvider {
    createItem(objItems: any, listName: string): Promise<any>;
    createItemInBatch(objItems: any[], listName: string): Promise<any>;
    getItemsByQuery(queryOptions: IPnPQueryOptions): Promise<any[]>;
    getAllItems(queryOptions: IPnPQueryOptions): Promise<any[]>;
    getByItemByID(listName: string, id: number): Promise<any>;
    updateListItemsInBatchPnP(listName: string, objItems: any[]): Promise<any>;
    updateListItemsInMultipleListInBatchPnP(objItems: any[]): Promise<any>;
    getCurrentUser(): Promise<any>;
    getPropertiesFor(usersArray: any): Promise<any>;
    updateItemWithPnP(objItems: any, listName: string, itemId: number): Promise<any>;
    // getSearchDocument(data: any): Promise<any>;
    deleteItem(listName: string, itemId: number): Promise<any>;
    createFolder(folderUrl: string): Promise<any>;
    uploadFile(file: IFileWithBlob, metadataUpdate?: boolean, metadata?: any): Promise<any>;
    getVersionHistoryById(listName: string, itemId: number): Promise<any>;
    // getUserId(currentUser: any): Promise<IUserItem[]>;
    getItemsByCAMLQuery(listName: string, xmlQuery: string, overrideParameters?: any): Promise<any[]>;
  
    publishDocumentByURL(fileRef: string, comment: string): Promise<any>;
    getListId(listName: string): Promise<string>;
    getUserById(userId: number): Promise<any>;
    downloadFile(filePath: string, fileName: string): Promise<any>;
}