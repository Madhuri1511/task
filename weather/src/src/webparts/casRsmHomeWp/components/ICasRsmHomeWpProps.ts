import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDataProvider } from "../../../Services/Interface/IDataProvider";

export interface ICasRsmHomeWpProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context:WebPartContext;
  provider:IDataProvider
}
