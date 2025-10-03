import * as React from "react"
import { IDataProvider } from "../../../Services/Interface/IDataProvider"
import IPnPQueryOptions from "../../../Services/Interface/IPnPQueryOptions"
import { EmployeeDirectory } from "../../../Common/ListConstants"
import "../../../assets/css/style.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import {  IPersonaSharedProps, Persona, PersonaPresence, PersonaSize } from "@fluentui/react"
import * as moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faBuilding, faCalendar, faEnvelope, faLocation, faMessage, faMobile, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"
export interface IEmployeeDirectoryProps {
    provider: IDataProvider
}
const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    autoplay: true,
    slidesToScroll: 4
};

export const EmployeeDirectoryComponent = (props: IEmployeeDirectoryProps) => {
    const [employeeData, setEmployeeData] = React.useState<any>([])
    const [personaData, setPersonaData] = React.useState<any>([])
    const [selectedEmployeeData, setSelecetdEmployeeData] = React.useState<any>([])
    // const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const getEmployeeData = async () => {
        const queryOptions: IPnPQueryOptions = {
            select: ["*"],
            listName: EmployeeDirectory,
            isSortOrderAsc:true,
            orderBy:"Name"

        };
        await props.provider.getAllItems(queryOptions).then((res: any) => {
            // setFolderData(res)
            setEmployeeData(res)
            // console.log("employe", res)
        })
    }
    React.useEffect(() => {
        getEmployeeData()
    }, [])
    return (
        <>

            <section className="employee-directore">

                <div className="container">
                    <h2>Employee Directory</h2>
                    <Slider {...settings}>
                        {/* <div className="d-flex gap-5"> */}
                        {
                            employeeData.map((i: any) => {
                                const imageJSON = JSON.parse(i.Image);
                                return (

                                    <div className="employee-details" style={{ marginLeft: 5 }}>
                                        <div className="employee-photos">
                                            <img src={imageJSON.serverRelativeUrl} className="img-fluid" />
                                        </div>
                                        <div className="employee-name">
                                            <h3>{i.Name}</h3>
                                            <p>{i.Designation}</p>
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                                                // showModal()

                                                const examplePersona: IPersonaSharedProps = {
                                                    imageUrl: imageJSON.serverRelativeUrl,
                                                    imageInitials: 'AR',
                                                    text: i.Name,
                                                    secondaryText: i.Designation,
                                                    // tertiaryText:"In meting",
                                                    showSecondaryText: true,
                                                };
                                                setPersonaData(examplePersona)
                                                setSelecetdEmployeeData(i)
                                                console.log("example", i);

                                            }}>View Details</a>
                                        </div>

                                    </div>
                                )
                            })
                        }

                        {/* </div> */}
                    </Slider>
                </div>

            </section>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">

                            <Persona
                                {...personaData}
                                size={PersonaSize.size100}
                                presence={PersonaPresence.none}
                                imageAlt="no img"
                            />
                            {/* <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5> */}
                            <button type="button" className="white-btn" data-bs-dismiss="modal" aria-label="Close">X</button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        {/* <IconButton iconProps={{ iconName: 'ProfileSearch' }} />Name */}
                                        <FontAwesomeIcon icon={faUser} style={{ marginRight: 3 }} /><b>Name</b>

                                    </div>
                                    <div className="col">
                                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 3 }} /><b>Email</b>
                                        {/* <IconButton iconProps={{ iconName: 'Mail' }} title="Add" ariaLabel="Add" />Email */}
                                    </div>
                                    <div className="col">
                                        <FontAwesomeIcon icon={faMessage} style={{ marginRight: 3 }} /><b>Chat</b>
                                        {/* <IconButton iconProps={{ iconName: 'Chat' }} title="Add" ariaLabel="Add" />Chat */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>{selectedEmployeeData.Name}</p>
                                    </div>
                                    <div className="col">
                                        <p>{selectedEmployeeData.Email}</p>
                                    </div>
                                    <div className="col">

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <FontAwesomeIcon icon={faMobile} style={{ marginRight: 3 }} /><b>Mobile</b>
                                        {/* <IconButton iconProps={{ iconName: 'CellPhone' }} title="Add" ariaLabel="Add" />Mobile */}
                                    </div>
                                    <div className="col">
                                        <FontAwesomeIcon icon={faPhone} style={{ marginRight: 3 }} /><b>WorkPhone</b>
                                        {/* <IconButton iconProps={{ iconName: 'Phone' }} title="Add" ariaLabel="Add" />WorkPhone */}
                                    </div>
                                    <div className="col">
                                        <FontAwesomeIcon icon={faLocation} style={{ marginRight: 3 }} /><b>Location</b>
                                        {/* <IconButton iconProps={{ iconName: 'Location' }} title="Add" ariaLabel="Add" />Location */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>{selectedEmployeeData.MobilePhone}</p>
                                    </div>
                                    <div className="col">
                                        <p>{selectedEmployeeData.WorkPhone}</p>
                                    </div>
                                    <div className="col">
                                        <p>{selectedEmployeeData.OfficeLocation}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <FontAwesomeIcon icon={faUser} style={{ marginRight: 3 }} /><b>JobTitle</b>
                                        {/* <IconButton iconProps={{ iconName: 'FollowUser' }} title="Add" ariaLabel="Add" />JobTitle */}
                                    </div>
                                    <div className="col">
                                        <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 3 }} /><b>Department</b>
                                        {/* <IconButton iconProps={{ iconName: 'SidePanel' }} title="Add" ariaLabel="Add" />Department */}
                                    </div>
                                    <div className="col">
                                        <FontAwesomeIcon icon={faCalendar} style={{ marginRight: 3 }} /><b>JoinDate</b>
                                        {/* <IconButton iconProps={{ iconName: 'EventDate' }} title="Add" ariaLabel="Add" />JoinDate */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>{selectedEmployeeData.Designation
                                        }</p>
                                    </div>
                                    <div className="col">
                                        <p>{selectedEmployeeData.Department}</p>
                                    </div>
                                    <div className="col">
                                        <p>{moment(selectedEmployeeData.JoinDate).format("DD-MM-YYYY")}</p>
                                    </div>
                                </div>


                                <hr></hr>

                                <div className="row">
                                    <div className="col">
                                        <FontAwesomeIcon icon={faLocation} style={{ marginRight: 3 }} /><b>Home Address</b>
                                        {/* <IconButton iconProps={{ iconName: 'Location' }} />Home Address */}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <p style={{ marginLeft: 10 }}>{selectedEmployeeData.HomeAddress}</p>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col">
                                        <FontAwesomeIcon icon={faLocation} style={{ marginRight: 3 }} /><b> Address</b>
                                        {/* <IconButton iconProps={{ iconName: 'Location' }} />Office Address */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p style={{ marginLeft: 10 }}>{selectedEmployeeData.OfficeAddress}</p>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col">
                                    <FontAwesomeIcon icon={faBook} style={{ marginRight: 3 }} /><b> Description</b>
                                        {/* <IconButton iconProps={{ iconName: 'ReadingMode' }} />Description */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p style={{ marginLeft: 10 }}>{selectedEmployeeData.Description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}