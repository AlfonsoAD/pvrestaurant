import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { Menu } from '../../../interfaces/menu.interface';
import { MenuService } from '../../services/menu.service';
import { informationMenu } from '../../../interfaces/informationMenu.interface';
import { informationmenuService } from '../../services/informationmenu.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-view-menu',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss'
})
export class ViewMenuComponent {
  menus: Menu[] = []
  stateTitle: String = "";
  stateID: string = "";
  details: informationMenu[] = []
  imageLink:string = environment.cloudinaryURL
  constructor(private menuService: MenuService, private detailsService: informationmenuService) {}

  ngOnInit(): void {
    this.syncData();
  }

  syncData(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus().subscribe({
      next: (response: any) => {
        if (response.ok) {
          this.menus = response.results;
          this.stateTitle = this.menus[0].name;
          this.stateID = String(this.menus[0].id);
          this.getInformation(this.stateID);
          console.log(this.menus)
          console.log(this.stateID)
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getInformation(id: string) {
    this.detailsService.getMenusDetails(id).subscribe({
      next: (response: any) => {
        if (response.ok) {
          this.details = response.results;
          console.log(this.details);
          console.log(this.details[0].product)
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  changeState(tittle: string, id: string) {
    this.stateID = id;
    this.stateTitle = tittle;
    this.getInformation(this.stateID)
    console.log(this.stateID);
  }
}
