
import { IDataProvider } from "./Interface/IDataProvider";
import { SPFI } from "@pnp/sp";
import IPnPQueryOptions from "./Interface/IPnPQueryOptions";
import { IFileWithBlob } from "./Interface/IFileWithBlob";
import { getSP } from "./PnPConfig";
export default class Service implements IDataProvider {
    private _sp: SPFI;
    constructor(_context: any) {
        this._sp = getSP(_context);
    
    }
    getItemsByCAMLQuery(listName: string, xmlQuery: string, overrideParameters?: any): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    public createItem(objItems: any, listName: string): Promise<any> {
        return new Promise<any>((resolve: (results: any) => void, reject: (error: any) => void): void => {
            this._sp.web.lists.getByTitle(listName).items.add(objItems).then((itemAddedResult: any): any => {
                resolve(itemAddedResult);
            }, (error: any): any => {
                console.log("Error in Creating Item");
                reject(error);
            });
            
        });
    }

    public createItemInBatch(objItems: any[], listName: string): Promise<any[]> {
        return new Promise<any>((resolve: (results: any) => void, reject: (error: any) => void): void => {
            const [batchedSP, execute] = this._sp.batched();

            const list = batchedSP.web.lists.getByTitle(listName);
            const res: any[] = [];
            for (let index = 0; index < objItems.length; index++) {
                const element = objItems[index];
                list.items.add(element).then((r:any) => res.push(r)).catch((err:any) => { console.log(err); reject(err); });
            }
            // Executes the batched calls
            execute().then(() => {
                resolve(res);
            }, (error: any): any => {
                console.log("Error in Creating Item");
                reject(error);
            });
        });
    }

    public async getItemsByQuery(queryOptions: IPnPQueryOptions): Promise<any[]> {
        try {
            const { filter, select, expand, top, skip, listName, orderBy, isSortOrderAsc } = queryOptions;
            const fetchTop = !!top ? (top >= 5000 ? 4999 : top) : 4999;
          
            const _list:any = this._sp.web.lists.getByTitle(listName);
            console.log("list",_list)
            console.log("listItms",_list.items())
            let result = await _list.items;
            if (select) result = result.select(...select);
            if (filter) result = result.filter(filter);
            if (expand) result = result.expand(...expand);
            if (fetchTop) result = result.top(fetchTop);
            if (orderBy) result = result.orderBy(orderBy, isSortOrderAsc);
            if (skip) result = result.skip(skip);
            let listItems = [];
            let items;
            items = await result()
            listItems = items.results;
            while (items.hasNext) {
                items = await items.getNext();
                listItems = [...listItems, ...items.results];
            }
            return listItems;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getAllItems(queryOptions: IPnPQueryOptions): Promise<any[]> {
        try {
            const { filter, select, expand, top, skip, listName, orderBy, isSortOrderAsc } = queryOptions;
            const _list = this._sp.web.lists.getByTitle(listName);
            let result = _list.items;
            if (filter) result = result.filter(filter);
            if (select) result = result.select(...select);
            if (expand) result = result.expand(...expand);
            if (top) result = result.top(top);
            if (orderBy) result = result.orderBy(orderBy, isSortOrderAsc);
            if (skip) result = result.skip(skip);
            return await result()
        } catch (e) {
            throw new Error(e);
        }
    }

    

    public updateItemWithPnP(objItems: any, listName: string, itemId: number): Promise<any> {
        return new Promise<any>((resolve: (results: any) => void, reject: (error: any) => void): void => {
            this._sp.web.lists.getByTitle(listName).items
                .getById(itemId).update(objItems)
                .then((itemUpdateResult: any) => {
                    resolve(itemUpdateResult);
                }, (error: any): void => {
                    console.log("Error in updating item in -" + listName);
                    reject(error);
                });
        });
    }

    // public getUserId = async (currentUser: any): Promise<IUserItem[]> => {
    //     // try {
    //     //     const select = ["ID", "Title", "TeamId", "User/Title", "User/Id", "Team/Code"];
    //     //     const queryOptions: IPnPQueryOptions = {
    //     //         select: select,
    //     //         listName: UsersListName,
    //     //         expand: ["User", "Team"],
    //     //         filter: `User eq ${currentUser.Id}`
    //     //     };

    //     //     let resultData = await this.getItemsByQuery(queryOptions);
    //     //     return resultData.map((item: any, index: number) => ({
    //     //         Id: item.Id as number,
    //     //         Title: item.Title,
    //     //         TeamId: item.TeamId,
    //     //         User: item.User != null ? item.User : null,
    //     //         TeamCode: item.Team.Code,
    //     //         Team: item.Team
    //     //     }));
    //     // } catch (error) {
    //     //     console.log("[getUsers] function: ", error);
    //     //     throw new Error(error);
    //     // }
    // };

    getByItemByID(listName: string, id: number): Promise<any> {
        try {
            return this._sp.web.lists.getByTitle(listName).items.getById(id)();
        }
        catch (error) { throw new Error(error); }
    }

    public updateListItemsInBatchPnP(listName: string, objItems: any[]): Promise<any> {
        return new Promise<any>((resolve: (results: any) => void, reject: (error: any) => void): void => {
            const [batchedSP, execute] = this._sp.batched();

            const list = batchedSP.web.lists.getByTitle(listName);
            const res: any[] = [];
            for (let index = 0; index < objItems.length; index++) {
                const element = objItems[index];
                const obj = { ...element };
                delete obj.Id;
                list.items.getById(element.Id).update(obj).then(r => res.push(r)).catch(err => { console.log(err); reject(err); });
            }
            // Executes the batched calls
            execute().then(() => {
                resolve(res);
            }, (error: any): any => {
                console.log("Error in Creating Item");
                reject(error);
            });
        });
    }

    updateListItemsInMultipleListInBatchPnP(objItems: any[]): Promise<any> {
        return new Promise<any>((resolve: (results: any) => void, reject: (error: any) => void): void => {
            const [batchedSP, execute] = this._sp.batched();

            const res: any[] = [];
            for (let index = 0; index < objItems.length; index++) {
                const element = objItems[index];
                const obj = { ...element };
                delete obj.Id;
                delete obj.listName;
                const list = batchedSP.web.lists.getByTitle(element.listName);
                list.items.getById(element.Id).update(obj).then(r => res.push(r)).catch(err => { console.log(err); reject(err); });
            }
            // Executes the batched calls
            execute().then(() => {
                resolve(res);
            }, (error: any): any => {
                console.log("Error in Creating Item");
                reject(error);
            });
        });
    }

    public async getCurrentUser(): Promise<any> {
        try {
            return await this._sp.web.currentUser();
        }
        catch (error) {
            throw new Error(error);
        }
    }

    public async createFolder(folderUrl: string): Promise<any> {
        this._sp.web.folders.addUsingPath(folderUrl)
            .then(function (data:any) {
                console.log("Folder is created at " + data.data.ServerRelativeUrl);
                return data.data.ServerRelativeUrl;
            }).catch(function (data:any) {
                console.log(data);
            });
    }

    public async uploadFile(file: IFileWithBlob, metadataUpdate?: boolean, metadata: any = null): Promise<any> {
        let fileUpload: any;
        const fileUrl:string=file.folderServerRelativeURL?file.folderServerRelativeURL:""
        if (file.file?.size <= 10485760) {
            fileUpload = await this._sp.web.getFolderByServerRelativePath(fileUrl).
                files.addUsingPath(file.name, file.file, { Overwrite: true });
            if (metadataUpdate) {
                const item = await fileUpload.file.getItem();
                await item.update(metadata);
            }
        }
        else {
            //large upload
         
            fileUpload = await this._sp.web.getFolderByServerRelativePath(fileUrl).files
                .addChunked(file.name, file.file, 
                );
            if (metadataUpdate) {
                const item = await fileUpload.file.getItem();
                await item.update(metadata);
            }
        }
        return fileUpload;
    }

    public deleteItem(listName: string, itemId: number): Promise<boolean> {
        return new Promise<any>((resolve: (results: any) => void, reject: (error: any) => void): void => {
            this._sp.web.lists.getByTitle(listName).items.getById(itemId).delete()
                .then((_: any) => {
                    resolve(true);
                }, (error: any): void => {
                    console.log("Error in deleting Item from -" + listName);
                    reject(false);
                });
        });
    }

    public async getVersionHistoryById(listName: string, itemId: number): Promise<any[]> {
        return new Promise<any>((resolve: (results: any[]) => void, reject: (error: any) => void): void => {
            this._sp.web.lists.getByTitle(listName).items.getById(itemId).versions()
                .then((itemVersionHistory: any[]) => {
                    const sortedItemVersionHistory = itemVersionHistory.sort((a: any, b: any) => b.VersionId - (a.VersionId));
                    resolve(sortedItemVersionHistory);
                }, (error: any): void => {
                    console.log("Error in get version history by -" + listName);
                    reject([]);
                });
        });
    }

    getPropertiesFor(usersArray: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public publishDocumentByURL(fileRef: string, comment: string = ""): Promise<void> {
        //getFileByServerRelativeUrl
        return this._sp.web.getFileByServerRelativePath(fileRef).publish(comment).then((_: any) => {
            //console.log("File published!");
        });
    }

    getListId = async (listName: string): Promise<string> => {
        return (await this._sp.web.lists.getByTitle(listName).select('Id')()).Id;
    }

    getUserById = async (userId: number): Promise<any> => {
        return await this._sp.web.getUserById(userId)();
    }

    downloadFile = async (filePath: string, fileName: string): Promise<any> => {
        return await this._sp.web.getFileByServerRelativePath(filePath).getBlob()
            .then((blob: any) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
            });
    }
}