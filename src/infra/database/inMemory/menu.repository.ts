import { Menu } from '@domain/entities/place/menu/menu';
import { MenuRepository } from '@domain/repositories/menu.repository';

export class InMemoryMenuRepository implements MenuRepository {
    private menus: Menu[] = [];

    async create(menu: Menu): Promise<void> {
        this.menus.push(menu);
    }

    async update(menu: Menu): Promise<void> {
        const current = this.menus.find((u) => u.id === menu.id);
        if (current) {
            current.update(menu);
        }
    }

    async findById(id: string): Promise<Menu | null> {
        const menu = this.menus.find((Menu) => Menu.id === id);
        if (menu) {
            return menu;
        }
        return null;
    }

    async findAll(): Promise<Menu[]> {
        return this.menus.filter((Menu) => Menu.isActive);
    }

    async delete(id: string): Promise<void> {
        const current = this.menus.find((Menu) => Menu.id === id);
        if (current) {
            current.update({ isActive: false });
        }
    }

    reset() {
        this.menus = [];
    }
}
