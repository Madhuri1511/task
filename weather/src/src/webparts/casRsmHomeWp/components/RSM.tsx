import * as React from "react"
import { IDataProvider } from "../../../Services/Interface/IDataProvider"
import IPnPQueryOptions from "../../../Services/Interface/IPnPQueryOptions"
import { AboutRSM, QuickLinks, UsefulArticles } from "../../../Common/ListConstants"

export interface IRSmProps {
    provider: IDataProvider
}

export const Rsm = (props: IRSmProps) => {
    const [rsmData, setRsmData] = React.useState<any>([])
    const [articlesData, setArticlesData] = React.useState<any>([])
    const [quickLinkData, setQuickLinkData] = React.useState<any>([])
    const getRSMdata = async () => {
        //  const Active="Yes"
        const queryOptions: IPnPQueryOptions = {
            select: ["Id", "Title", "Image", "Active", "DressCode", "PrivacyPolicy"],
            listName: AboutRSM,
            filter: `Active eq 'Yes'`
        };

        await props.provider.getAllItems(queryOptions).then((res: any) => {
            setRsmData(res)
        })
    }
    const getArticles = async () => {
        const queryOptions: IPnPQueryOptions = {
            select: ["Id", "Title", "Description", "Link", "ArticlesOrder", "Active"],
            listName: UsefulArticles,
            filter: `Active eq 'Yes'`,
             isSortOrderAsc:true,
            orderBy:"ArticlesOrder"
        };
        await props.provider.getAllItems(queryOptions).then((res: any) => {
            setArticlesData(res)
        })
    }
    const getQuickLinksData = async () => {
        const queryOptions: IPnPQueryOptions = {
            select: ["Id", "Title", "Description", "Link", "LinkOrder", "Active"],
            listName: QuickLinks,
            filter: `Active eq 'Yes'`,
            isSortOrderAsc:true,
            orderBy:"LinkOrder"
        };

        await props.provider.getAllItems(queryOptions).then((res: any) => {
            setQuickLinkData(res)
        })
    }
    React.useEffect(() => {
        void getRSMdata()
        void getArticles()
        void getQuickLinksData()
    }, [])
    return (

        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md-6 quickforms">
                        {
                            rsmData.map((i: any) => {
                                const imageJSON = JSON.parse(i.Image);
                                return (
                                    <>
                                        <div className="col-12">
                                            <img src={imageJSON.serverRelativeUrl} height={50} width={75}></img>
                                        </div>
                                        <div className="col-6">
                                            <p>{i.Title}</p>
                                        </div>

                                        <div className="col-6">
                                            <a href={i.PrivacyPolicy.Url}>PrivacyPolicy</a>
                                        </div>

                                        <div className="col-6">
                                            <a href={i.DressCode.Url}>DressCode</a>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="col-12 col-md-3 quicklinks">
                        <h5>Quick Links</h5>
                        <ul className="">
                            {
                                quickLinkData.map((i: any) => {
                                    return (
                                        <li className="mb-2"><a href={i.Link}>{i.Title}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    <div className="col-12 col-md-3 quicklinks">
                        <h5>Useful Articles</h5>
                        <ul className="">
                            {
                                articlesData.map((i: any) => {
                                    return (
                                        <li className="mb-2"><a href={i.Link}>{i.Title}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}