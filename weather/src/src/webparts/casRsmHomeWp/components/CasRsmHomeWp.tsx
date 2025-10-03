import * as React from "react"
import { ICasRsmHomeWpProps } from "./ICasRsmHomeWpProps"
import { HomeImageSliders } from "./ImageSliders"
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import { EmployeeAnnouncementAndUpcomingEvents } from "./EmployeeAnnouncementAndUpcomingEvents"
import { EmployeeDirectoryComponent } from "./EmployeeDirectory"
import "../../../assets/css/animate.min.css" 
import "../../../assets/css/slick-theme.css"
import "../../../assets/css/slick.css"
import { Rsm } from "./RSM"
import "../../../assets/css/style.css"

export const CasRsmHomeWp = (props: ICasRsmHomeWpProps) => {
  return (
    <>
      <HomeImageSliders provider={props.provider} />
      {/* <img src="../../../assets/img/Casino-RSM-Logo-1.png" width="70" height="60"></img> */}
      <EmployeeAnnouncementAndUpcomingEvents provider={props.provider}/>
      <EmployeeDirectoryComponent provider={props.provider}/>
      <Rsm provider={props.provider}/>
    </>
  )
}