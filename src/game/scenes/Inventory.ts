import { EventBus } from '../EventBus';
import { Math, Scene } from 'phaser';

export class Inventory extends Scene
{
    background: Phaser.GameObjects.Image;



    constructor(handle: string)
    {
        super(handle + 'Inventory')
    }

    create()
    {
        this.background = this.add.image(512, 400, 'inventoryBackground').setScale(1.8).setAlpha(0.6)
        let xButton = this.add.text(110, 90, 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.resume('Game');
        });

        EventBus.emit('current-scene-ready', this);
    }
    update()
    {

    }
}