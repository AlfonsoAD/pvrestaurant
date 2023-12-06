import { Menu } from "./menu.interface";
import { Product } from "./products.interface";

export interface informationMenu {
    id: number;
    is_active: boolean;
    created_at: string;
    menu: Menu;
    product: Product;
}