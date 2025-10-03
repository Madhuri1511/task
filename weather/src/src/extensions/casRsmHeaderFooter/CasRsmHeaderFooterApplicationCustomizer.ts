import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min"

import * as strings from 'CasRsmHeaderFooterApplicationCustomizerStrings';
import "../../assets/css/topbar-style.css"
// import "../../assets/css/topbar-style.css"
import { HeaderMenu } from '../../Common/ListConstants';
import { SITE_URL } from '../../Common/constants/urlsConstants';
import { Web } from 'sp-pnp-js';
import "../../assets/css/footer.css"
// require("../../assets/css/topbar-style.css")
// const imgUrl=require("../../assets/img/img-1.jpg")
const LOG_SOURCE: string = 'CasRsmHeaderFooterApplicationCustomizer';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICasRsmHeaderFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class CasRsmHeaderFooterApplicationCustomizer
  extends BaseApplicationCustomizer<ICasRsmHeaderFooterApplicationCustomizerProperties> {

  // These have been added
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    return this._renderMenu()

  }
  private async _renderMenu(): Promise<void> {
    const items = await this._getMenuItems();
    const placeholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose }
    );

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      // The extension should not assume that the expected placeholder is available.
      if (this.properties) {
        const MasterMenu = items.filter((i: any) => i.MenuType === "Header")
        const Submenu = items.filter((i: any) => i.MenuType === "Link")
        let menuHtml = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
              <a class="navbar-brand" href="#"><img src="${require("../../assets/img/Casino-RSM-Logo-1.png")}"></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse justify-content-end" id="navbarNav"> 
                <ul class="navbar-nav">
  `;

        MasterMenu.forEach((item: any, ind: any) => {
          const menu = Submenu.filter((i: any) => i.ParentId == item.Id)
          if (menu.length > 0) {
            menuHtml += `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 ${item.Title}
           </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
           `
            menu.map((i: any) => {
              menuHtml += `<li><a class="dropdown-item" href="${i.MenuLink}">${i.Title}</a></li>`

            })
            menuHtml += `</ul></li>`
          }
          else{
            // const active=item.Title=="Home" ?"active":
            menuHtml += `<li class="nav-item"><a class="nav-link" href="${item.MenuLink}" }>${item.Title}</a>`;
          }
        })
        console.log("menuhtml",menuHtml)
        menuHtml += `
          </ul>
        </div>
        </div>
        </nav>
      `;

        if (placeholder) {
          placeholder.domElement.innerHTML = menuHtml;
        }

      }
    }

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

        if (this._bottomPlaceholder) {
          this._bottomPlaceholder.domElement.innerHTML = `
           <div class="sub-footer">
            <p>© All Rights Reserved.</p>
        </div>
         `
        }
      
    }

  }
  private async _getMenuItems(): Promise<any[]> {
    let web = new Web(SITE_URL)
    let listItems = await web.lists.getByTitle(HeaderMenu).items.select("Id", "Title", "MenuLink", "MenuType","MenuOrder","ParentId").filter(`Active eq 'Yes'`).orderBy("MenuOrder",true).get()
    return listItems ? listItems : []
  }
  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
