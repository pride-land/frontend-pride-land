import GridTable from 'phaser3-rex-plugins/plugins/gridtable';
import { EventBus } from '../EventBus';
import { Math, Scene } from 'phaser';

export class Inventory extends Scene
{
    background: Phaser.GameObjects.Image;
    userInventory: string [];
    cardpic: Phaser.GameObjects.Image
    scrollMenu: GridTable;
    constructor(handle: string)
    {
        super(handle + 'Inventory')
    }

    create(data: {userInventory: string[]})
    {
        this.userInventory = data.userInventory;
        this.background = this.add.image(512, 400, 'inventoryBackground').setScale(1.8).setAlpha(1)
        let xButton = this.add.text(110, 90, 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.resume('Game');
        });

        let xSpacePerCard = 100
        let y = 200;
        let cardInRow = 0
        let maxPerRow = 7;
        for(let card of this.userInventory) {
            if(cardInRow === maxPerRow){
                y += 150;
                xSpacePerCard = 100;
                cardInRow = 0;
            }
            let ogX = 100 + xSpacePerCard;
            let currentCard: Phaser.GameObjects.Image = this.add.image(ogX, y, card).setScale(0.1).setInteractive();
            currentCard.on('pointerdown', () => {
                if(currentCard.scale === 0.1) currentCard.setScale(0.5).setPosition(512, 384).setDepth(700);
                else currentCard.setScale(0.1).setPosition(ogX, y).setDepth(0);
            })
            xSpacePerCard += 100;
            cardInRow ++;
        }
        
        

        EventBus.emit('current-scene-ready', this);
    }
    update()
    {
        
    }
}