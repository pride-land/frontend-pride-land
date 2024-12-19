import { Scene } from 'phaser';
export declare class CardShop extends Scene {
    currentCoins: number;
    cardPrice: number;
    shopBackground: Phaser.GameObjects.Image;
    currentCoinsText: Phaser.GameObjects.Text;
    cardText: Phaser.GameObjects.Text;
    errorText: Phaser.GameObjects.Text;
    purchaseButton: Phaser.GameObjects.Image;
    mysteryCardIcon: Phaser.GameObjects.Image;
    cardBack: Phaser.GameObjects.Sprite;
    purchaseSound: Phaser.Sound.BaseSound;
    rarecardBoom: Phaser.Sound.BaseSound;
    commoncardBoom: Phaser.Sound.BaseSound;
    errorSound: Phaser.Sound.BaseSound;
    shopBell: Phaser.Sound.BaseSound;
    constructor(handle: string);
    create(data: {
        coins: number;
    }): void;
    update(): void;
    randomCardChooser(): any;
    hoverPurchase(): void;
    restPurchase(): void;
}
