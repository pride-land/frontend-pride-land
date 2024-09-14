import GridTable from 'phaser3-rex-plugins/plugins/gridtable';
import { EventBus } from '../EventBus';
import { Math, Scene } from 'phaser';

export class Inventory extends Scene
{
    background: Phaser.GameObjects.Image;
    userInventory: string [];
    scrollMenu: GridTable;
    currentPage: number;
    currentCardObjects: Phaser.GameObjects.Image [] = []; //cards that are displayed on the page which are gonna be destroyed later
    constructor(handle: string)
    {
        super(handle + 'Inventory')
    }

    create(data: {userInventory: string[]})
    {
        this.currentPage = 1;
        this.userInventory = data.userInventory;
        this.background = this.add.image(512, 400, 'inventoryBackground').setScale(1.8).setAlpha(1)
        let xButton = this.add.text(110, 90, 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.resume('Game');
        });

        this.pagination();
        this.displayCards();
        
        EventBus.emit('current-scene-ready', this);
    }
    update()
    {
        if(this.scene.isVisible()) {
            this.scene.bringToTop();
            this.scene.resume('Inventory');
        } else {
            this.scene.sendToBack();
            this.scene.pause('Inventory');
        };
    }
    pagination()
    {
        const paginationNumbers = [];
        for (let i=1; i <= Math.CeilTo(this.userInventory.length / 21); i++) {
            paginationNumbers.push(i);
        }
        let x = 470
        for(let number of paginationNumbers){
            this.add.text(x, 630, `${number}`, {color: "000000", fontSize: 20, fontFamily: 'Arial Black' }).setInteractive()
            .on('pointerdown', () => {
                this.currentPage = number;
                this.updateCards();
            })
            x += 20
        }
    }
    displayCards()
    {
        let indexOfLastCard = this.currentPage * 21;
        let indexOfFirstCard = indexOfLastCard - 21;
        let currentCards = this.userInventory.slice(indexOfFirstCard, indexOfLastCard);

        let xSpacePerCard = 100
        let y = 200;
        let count = 0;
        let cardInRow = 0
        let maxPerRow = 7;
        for(let card of currentCards) {
            if(cardInRow === maxPerRow){
                y += 150;
                xSpacePerCard = 100;
                cardInRow = 0;
            }
            let ownY = y
            let ownX = 100 + xSpacePerCard;
            let currentCard: Phaser.GameObjects.Image = this.add.image(ownX, ownY, card).setScale(0.1).setInteractive();
            this.currentCardObjects.push(currentCard)
            if(currentCard.texture.key.slice(0,3) === 'red') currentCard.preFX?.addShine();
            currentCard.on('pointerdown', () => {
                if(currentCard.scale === 0.1) currentCard.setScale(0.5).setPosition(512, 384).setDepth(700);
                else currentCard.setScale(0.1).setPosition(ownX, ownY).setDepth(0);
            })
            xSpacePerCard += 100;
            cardInRow ++;
            count++;
        }
    }
    updateCards()
    {
        //this function is to destroy the game objects so it can be filled with the ones on the next page.
        for(let card of this.currentCardObjects) {
            card.destroy();
        }
        this.currentCardObjects = [];
        this.displayCards();
    }
}