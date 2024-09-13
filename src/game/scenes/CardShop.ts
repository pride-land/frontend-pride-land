import { EventBus } from '../EventBus';
import { Math, Scene } from 'phaser';

export class CardShop extends Scene
{
    shopBackground: Phaser.GameObjects.Image;

    constructor(handle: string)
    {
        super(handle + 'CardShop')
    }

    create(data: {coinCurrency: number})
    {
        this.shopBackground = this.add.image(512, 300, 'background').setScale(0.9).setAlpha(0.7);
        let xButton = this.add.text(80,10 , 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.resume('Game');
            this.scene.stop;
        }).setDepth(710)

        EventBus.emit('current-scene-ready', this);
    }
    update()
    {   
        // if(this.scene.isVisible()) this.input.enable(this.exchangeButton);
        // else this.input.disable(this.exchangeButton);
    }
}