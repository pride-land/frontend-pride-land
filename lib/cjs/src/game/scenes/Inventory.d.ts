import GridTable from 'phaser3-rex-plugins/plugins/gridtable';
import { Scene } from 'phaser';
export declare class Inventory extends Scene {
    background: Phaser.GameObjects.Image;
    userInventory: string[];
    scrollMenu: GridTable;
    currentPage: number;
    currentCardObjects: Phaser.GameObjects.Image[];
    sellText: Phaser.GameObjects.Text;
    userCoins: number;
    selectedCardToSell: number | null;
    sellSound: Phaser.Sound.BaseSound;
    pageflipSound: Phaser.Sound.BaseSound;
    constructor(handle: string);
    create(data: {
        userInventory: string[];
        coins: number;
    }): void;
    update(): void;
    pagination(): void;
    displayCards(): void;
    updateCards(): void;
}
