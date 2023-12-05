import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-view-menu',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './view-menu.component.html',
  styleUrl: './view-menu.component.scss'
})
export class ViewMenuComponent {
  menus = ['Normal','Invierno','Verano'];
  state = this.menus[0];
  columns = ['Name','Image','price']
  menuProducts = [
    {
      id: "1",
      nombre: 'Pozole',
      descripcion: 'tostadas de pollo, con verduras frescas y arroz',
      imagen: 'https://scontent.fntr6-1.fna.fbcdn.net/v/t1.6435-9/106673059_1182365365436128_3304146531639679157_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeEsdzOTEfSOn-IkXbyj41vvMP4-LIA_b0Yw_j4sgD9vRrdSgwmMfUSosQVqDpEWEbcUp1h_N-1wPxz-A_A2r33J&_nc_ohc=zx_nsg_DR8EAX9QCNLo&_nc_ht=scontent.fntr6-1.fna&oh=00_AfAmaT32U1X62t_XDMsVPOcF4cfXlAQhfQqcPW0GZMHN7w&oe=65960EAF',
      precio: '55$'
    },
    {
      id: "2",
      nombre: 'Hamburguesa',
      descripcion: 'tostadas de pollo, con verduras frescas y arroz',
      imagen: 'https://scontent.fntr6-1.fna.fbcdn.net/v/t1.6435-9/106673059_1182365365436128_3304146531639679157_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeEsdzOTEfSOn-IkXbyj41vvMP4-LIA_b0Yw_j4sgD9vRrdSgwmMfUSosQVqDpEWEbcUp1h_N-1wPxz-A_A2r33J&_nc_ohc=zx_nsg_DR8EAX9QCNLo&_nc_ht=scontent.fntr6-1.fna&oh=00_AfAmaT32U1X62t_XDMsVPOcF4cfXlAQhfQqcPW0GZMHN7w&oe=65960EAF',
      precio: '55$'
    },
    {
      id: "3",
      nombre: 'Tostadas de pollo',
      descripcion: 'tostadas de pollo, con verduras frescas y arroz',
      imagen: 'https://scontent.fntr6-1.fna.fbcdn.net/v/t1.6435-9/106673059_1182365365436128_3304146531639679157_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeEsdzOTEfSOn-IkXbyj41vvMP4-LIA_b0Yw_j4sgD9vRrdSgwmMfUSosQVqDpEWEbcUp1h_N-1wPxz-A_A2r33J&_nc_ohc=zx_nsg_DR8EAX9QCNLo&_nc_ht=scontent.fntr6-1.fna&oh=00_AfAmaT32U1X62t_XDMsVPOcF4cfXlAQhfQqcPW0GZMHN7w&oe=65960EAF',
      precio: '55$'
    }
  ]

}
