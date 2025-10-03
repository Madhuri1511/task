import * as React from "react"
import { IDataProvider } from "../../../Services/Interface/IDataProvider"
import IPnPQueryOptions from "../../../Services/Interface/IPnPQueryOptions"
import { Announcements, CRSMDocuments, Events, UpcomingEvents } from "../../../Common/ListConstants"
import * as moment from "moment"
import { FontIcon, Link } from "@fluentui/react"
export interface IEmployeeProps {
    provider: IDataProvider
}


export const EmployeeAnnouncementAndUpcomingEvents = (props: IEmployeeProps) => {
    // const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [upcomingEventsdata, setUpcomingEventsdata] = React.useState<any>([])
    const [selectedEvent, setSelectedEvent] = React.useState<any>([])
    const [employeeAnnounceData, setEmployeeAnnounceData] = React.useState<any>([])
    // const [topEmployeeAnnounce, setTopEmployeeAnnounceData] = React.useState<any>([])
    const [modalMsg, setModalMsg] = React.useState<string>("")
    const [selectedAnnouncement, setSelectedAnnouncement] = React.useState<any>([])
    const [folderData, setFolderData] = React.useState<any>([])
    const [calenderData, setCalenderData] = React.useState<any>([])
    const [selectedCalenderEvent, setSelectedCalenderEvent] = React.useState<any>([])

    const handleClick = (Id: any, msg: any) => {
        if (msg === "selectEmployeeAnnouncement") {
            const selctedEmployeeAnnouncement = employeeAnnounceData.filter((i: any) => i.Id === Id)
            setModalMsg("Employee Announcements")
            setSelectedAnnouncement(selctedEmployeeAnnouncement)
        }
        if (msg == "selectedEvents") {
            const selctedEvent = upcomingEventsdata.filter((i: any) => i.Id === Id)
            setModalMsg("Upcoming Events")
            setSelectedEvent(selctedEvent)
        }
        if (msg == "Calender") {
            setModalMsg("Calender")
            const selectedEvent = calenderData.filter((i: any) => i.Id === Id)
            setSelectedCalenderEvent(selectedEvent)
        }
    }

    const getUpcomingEvents = async () => {
        const TodaysDate = new Date().toISOString()
        const queryOptions: IPnPQueryOptions = {
            select: ["*", "Id", "Title", "StartDateTime", "EndDateTime", "Image", "Active", "Description"],
            listName: UpcomingEvents,
            filter: `Active eq 'Yes' and StartDateTime ge datetime'${TodaysDate}'`
        };
        await props.provider.getAllItems(queryOptions).then((res: any) => {
            // setTopUpcomingEvents(res(0,2))
            setUpcomingEventsdata(res)

        })
    }

    const getEmployeeAnnouncementData = async () => {
        const queryOptions: IPnPQueryOptions = {
            select: ["Id", "Title", "AnnouncementDate", "Image", "Active", "Description"],
            listName: Announcements,
            filter: `Active eq 'Yes'`,
            isSortOrderAsc:false,
            orderBy:"AnnouncementDate"
            
        };
        await props.provider.getAllItems(queryOptions).then((res: any) => {
            setEmployeeAnnounceData(res)
            // console.log("anno",res);

        })
    }
    const getCasinorsmDocuments = async () => {
        const queryOptions: IPnPQueryOptions = {
            select: ["FileLeafRef", "FileRef", "Id", "Modified", "Editor/Title", "ServerRedirectedEmbedUrl"],
            listName: CRSMDocuments,
            expand: ["Editor"],
              isSortOrderAsc:false,
            orderBy:"Modified"

        };
        await props.provider.getAllItems(queryOptions).then((res: any) => {
            setFolderData(res)
        })
    }
    const getCalenderData = async () => {
        const queryOptions: IPnPQueryOptions = {
            select: ["*"],
            listName: Events,
        };
        await props.provider.getAllItems(queryOptions).then((res: any) => {
            setCalenderData(res)
        })
    }
    React.useEffect(() => {
        void getUpcomingEvents()
        void getEmployeeAnnouncementData()
        void getCasinorsmDocuments()
        void getCalenderData()
    }, [])
    return (
        <>
            <section className="content-box">
                <div className="container">
                    <div className="row g-3 mb-5">
                        <div className="col-4">
                            <div className="box-all h-100">
                                <div className="box-title">
                                    <i className="bi bi-calendar"></i>
                                    <h2>Upcoming Events</h2>
                                </div>
                                <div className="box-content-text">
                                    <div className="upcoming-date">
                                        {upcomingEventsdata.slice(0, 2).map((i: any) => {
                                            return (
                                                <>
                                                    <div className="upcoming-event" data-bs-toggle="modal" data-bs-target="#selectedDataModal" onClick={() => {
                                                        handleClick(i.Id, "selectedEvents")
                                                        // showModal()

                                                    }}>
                                                        <div className="date">
                                                            <p>{moment(i.StartDateTime).format("MMMM")}</p>
                                                            <h3>{moment(i.StartDateTime).format("DD")}</h3>
                                                        </div>
                                                        <div className="date-text">
                                                            <p>{i.Title}</p>
                                                            <p>Location:{i.Location}</p>
                                                            <p>Time: {moment(i.StartDateTime).format("HH:MM a")}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                        }
                                        <div style={{ float: "inline-end" }}>
                                            <a href="#" style={{ textDecoration: "none", float: "inline-end" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                setModalMsg("Upcoming Events")
                                            }}>View More</a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="box-all">
                                <div className="box-title">
                                    <i className="bi bi-megaphone-fill"></i>
                                    <h2>Employee Announcements</h2>
                                </div>
                                <div className="box-content-text p-3">
                                    {employeeAnnounceData.slice(0, 5).map((i: any) => {
                                        return (
                                            <div className="announcement-content" data-bs-toggle="modal" data-bs-target="#selectedDataModal" onClick={() => {
                                                // showModal()
                                                handleClick(i.Id, "selectEmployeeAnnouncement")
                                            }}
                                            >
                                                <FontIcon aria-label="Compass" iconName="ChevronRight" />
                                                <p>{i.Title}</p>
                                            </div>
                                        )
                                    })}
                                    <div style={{ float: "inline-end" }} >
                                        <a href="#" style={{ textDecoration: "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                            setModalMsg("Employee Announcements")
                                        }}>View More</a>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="box-all">
                                <div className="box-title">
                                    <i className="bi bi-folder-fill"></i>
                                    <h2>Public Folder</h2>
                                </div>
                                <div className="box-content-text p-3">
                                    <table className="table public-folder mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col"><i className="bi bi-check-lg"></i></th>
                                                <th scope="col"><i className="bi bi-file-text"></i>Name</th>
                                                <th scope="col">Modified</th>
                                                <th scope="col">Modified By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                folderData.slice(0, 5).map((i: any) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row"></th>
                                                            <td><i className="bi bi-filetype-pdf"></i><Link href={i.ServerRedirectedEmbedUrl}>{i.FileLeafRef}</Link></td>
                                                            <td>{moment(i.Modified).format("DD MMMM YYYY")}</td>
                                                            <td>{i.Editor.Title}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                    <a href="#" style={{ textDecoration: "none", float: "inline-end" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                        setModalMsg("Public Folder")
                                    }}>View More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="box-all">
                                <div className="box-title">
                                    <i className="bi bi-calendar3"></i>
                                    <h2>Calendars</h2>
                                </div>
                                <div className="box-content-text">
                                    <div className="calendar-data">
                                        {
                                            calenderData.slice(0, 5).map((i: any) => {
                                                return (
                                                    <div className="calender-text" data-bs-toggle="modal" data-bs-target="#selectedDataModal" onClick={() => {
                                                        // showModal()
                                                        handleClick(i.Id, "Calender")
                                                    }}>
                                                        <div className="date">{moment(i.EventDate).format("DD MMMM YYYY")}</div>
                                                        <p>{i.Title}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div style={{ float: "inline-end" }}>
                                            <a href="#" style={{ textDecoration: "none", float: "inline-end" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                setModalMsg("Calender")
                                            }}>View More</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {modalMsg === "Employee Announcements" && <>Employee Announcement</>}
                                {modalMsg === "Upcoming Events" && <>Upcoming Events</>}
                                {modalMsg === "Public Folder" && <>Public Folder</>}
                                {modalMsg === "Calender" && <>Calender</>}
                            </h5>
                            <button type="button" className="white-btn" data-bs-dismiss="modal" aria-label="Close">x</button>
                        </div>
                        <div className="modal-body">
                            {
                                modalMsg === "Employee Announcements" &&
                                <div className="box-content-text p-3">
                                    {
                                        employeeAnnounceData.map((i: any) => {
                                            return (
                                                <div className="announcement-content" data-bs-toggle="modal" data-bs-target="#selectedDataModal" onClick={() => {

                                                    handleClick(i.Id, "selectEmployeeAnnouncement")
                                                    // showModal()
                                                }}>
                                                    <FontIcon aria-label="Compass" iconName="ChevronRight" />
                                                    <p>{i.Title}</p>
                                                </div>)
                                        })
                                    }
                                </div>
                            }
                            {
                                modalMsg === "Upcoming Events" &&
                                <>
                                    {upcomingEventsdata.slice(0, 2).map((i: any) => {
                                        return (
                                            <>
                                                <div className="upcoming-event" data-bs-toggle="modal" data-bs-target="#selectedDataModal" onClick={() => {

                                                    handleClick(i.Id, "selectedEvents")
                                                    // showModal()

                                                }}>
                                                    <div className="date">
                                                        <p>{moment(i.StartDateTime).format("MMMM")}</p>
                                                        <h3>{moment(i.StartDateTime).format("DD")}</h3>
                                                    </div>
                                                    <div className="date-text">
                                                        <p>{i.Title}</p>
                                                        <p>Location:{i.Location}</p>
                                                        <p>Time: {moment(i.StartDateTime).format("HH:MM a")}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    }
                                </>
                            }
                            {
                                modalMsg === "Public Folder" &&
                                <>
                                    <table className="table public-folder mb-0">

                                        <thead>
                                            <tr>
                                                <th scope="col"><i className="bi bi-check-lg"></i></th>
                                                <th scope="col"><i className="bi bi-file-text"></i>Name</th>
                                                <th scope="col">Modified</th>
                                                <th scope="col">Modified By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                folderData.map((i: any) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <th scope="row"></th>
                                                                <td><i className="bi bi-filetype-pdf"></i><Link href={i.ServerRedirectedEmbedUrl}>{i.FileLeafRef}</Link></td>
                                                                <td>{moment(i.Modified).format("DD MMMM YYYY")}</td>
                                                                <td>{i.Editor.Title}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                            }
                            {
                                modalMsg === "Calender" &&
                                <>

                                    <div className="calendar-data">
                                        {
                                            calenderData.map((i: any) => {
                                                return (
                                                    <div className="calender-text" data-bs-toggle="modal" data-bs-target="#selectedDataModal" onClick={() => {
                                                        handleClick(i.Id, "Calender")
                                                        
                                                        // showModal()
                                                    }}>
                                                        <div className="date">{moment(i.EventDate).format("DD MMMM YYYY")}</div>
                                                        <p>{i.Title}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </>
                            }


                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="selectedDataModal" aria-labelledby="selectedDataModals" data-bs-backdrop="static" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="selectedDataModals">
                                {modalMsg === "Employee Announcements" && <>Employee Announcement</>}
                                {modalMsg === "Upcoming Events" && <>Upcoming Events</>}
                                {modalMsg === "Calender" && <>Calender</>}
                            </h5>
                            <button type="button" className="white-btn" data-bs-dismiss="modal" aria-label="Close"
                          
                            >x</button>
                        </div>
                        <div className="modal-body">
                        {
                        modalMsg === "Upcoming Events" &&
                        <>
                            {selectedEvent.map((i: any) => {
                                const imageJSON = JSON.parse(i.Image);
                                return (
                                    <div className="container">
                                        <div className="row">
                                            <p className="title">{i.Title}</p>
                                        </div>
                                        <div className="row">
                                            <img src={imageJSON.serverRelativeUrl}></img>
                                        </div>
                                        <div className="row borderBott" >
                                            <p style={{ marginTop: 10 }}>{i.Description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    }
                           {
                        modalMsg === "Calender" &&
                        <>

                            <div className="calendar-data">
                                {

                                    selectedCalenderEvent.map((i: any) => {
                                        const div = document.createElement("div")
                                        div.innerHTML = i.Description
                                        return (
                                            <div>

                                                <p>{i.Title}</p>
                                                <p> <FontIcon iconName="DateTime" />{moment(i.EventDate).format("DD MMMM YYYY")}</p>
                                                <p>{div.innerText}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </>
                    }
                            {
                                modalMsg === "Employee Announcements" &&
                                <>
                                    {selectedAnnouncement.map((i: any) => {
                                        const imageJSON = JSON.parse(i.Image);
                                        return (
                                            <div className="container">
                                                <div className="row">
                                                    <p className="title">{i.Title}</p>
                                                </div>
                                                <div className="row">
                                                    <img src={imageJSON.serverRelativeUrl}></img>
                                                </div>
                                                <div className="row borderBott" >
                                                    <p style={{ marginTop: 10 }}>{i.Description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </div>

                    </div>
                </div>
            </div>
            {/* <Modal
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isModeless={true}
                containerClassName={contentStyles.container}
            // dragOptions={isDraggable ? dragOptions : undefined}
            >
                <div className={contentStyles.header}>
                    <h2 className={contentStyles.heading}>
                        {modalMsg === "Employee Announcements" && <>Employee Announcement</>}
                        {modalMsg === "Upcoming Events" && <>Upcoming Events</>}
                        {modalMsg === "Calender" && <>Calender</>}
                    </h2>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={hideModal}
                    />
                </div>

                <div className={contentStyles.body}>
                    {
                        modalMsg === "Employee Announcements" &&
                        <>
                            {selectedAnnouncement.map((i: any) => {
                                const imageJSON = JSON.parse(i.Image);
                                return (
                                    <div className="container">
                                        <div className="row">
                                            <p className="title">{i.Title}</p>
                                        </div>
                                        <div className="row">
                                            <img src={imageJSON.serverRelativeUrl}></img>
                                        </div>
                                        <div className="row borderBott" >
                                            <p style={{ marginTop: 10 }}>{i.Description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    }
                    {
                        modalMsg === "Upcoming Events" &&
                        <>
                            {selectedEvent.map((i: any) => {
                                const imageJSON = JSON.parse(i.Image);
                                return (
                                    <div className="container">
                                        <div className="row">
                                            <p className="title">{i.Title}</p>
                                        </div>
                                        <div className="row">
                                            <img src={imageJSON.serverRelativeUrl}></img>
                                        </div>
                                        <div className="row borderBott" >
                                            <p style={{ marginTop: 10 }}>{i.Description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    }
                    {
                        modalMsg === "Calender" &&
                        <>

                            <div className="calendar-data">
                                {

                                    selectedCalenderEvent.map((i: any) => {
                                        const div = document.createElement("div")
                                        div.innerHTML = i.Description
                                        return (
                                            <div>

                                                <p>{i.Title}</p>
                                                <p> <FontIcon iconName="DateTime" />{moment(i.EventDate).format("DD MMMM YYYY")}</p>
                                                <p>{div.innerText}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </>
                    }
                </div>
            </Modal> */}
        </>
    )
}