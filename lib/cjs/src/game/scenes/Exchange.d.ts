import { Scene } from 'phaser';
export declare class Exchange extends Scene {
    todayRate: number;
    currentMushrooms: number;
    currentCoins: number;
    selectedAmount: number;
    numberInputValue: number;
    numberInputDiv: HTMLInputElement | null;
    todayRateText: Phaser.GameObjects.Text;
    shopText: Phaser.GameObjects.Text;
    youHaveText: Phaser.GameObjects.Text;
    userMushroomOffer: Phaser.GameObjects.Text;
    errorText: Phaser.GameObjects.Text;
    errorSound: Phaser.Sound.BaseSound;
    shopBackground: Phaser.GameObjects.Image;
    exchangeButton: Phaser.GameObjects.Image;
    mushroomIcon: Phaser.GameObjects.Image;
    maxButton: Phaser.GameObjects.Image;
    mushroomExchangeRateTimer: Phaser.Time.TimerEvent;
    secondsLeft: string;
    numberInput: Phaser.GameObjects.DOMElement;
    purchaseSound: Phaser.Sound.BaseSound;
    owlhoot: Phaser.Sound.BaseSound;
    constructor(handle: string);
    create(data: {
        mushroomCurrency: number;
        coins: number;
    }): void;
    update(): void;
}
