
// import pnp and pnp logging system
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/site-users/web";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import { spfi, SPFI, SPFx } from "@pnp/sp";

// eslint-disable-next-line no-var
var _sp: SPFI

export const getSP = (context?: any): SPFI => {
   
    
    if (context != null) { // eslint-disable-line eqeqeq
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    return _sp;
};