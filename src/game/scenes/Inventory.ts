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
    sellText: Phaser.GameObjects.Text;
    userCoins: number;
    selectedCardToSell: number | null = null;
    constructor(handle: string)
    {
        super(handle + 'Inventory')
    }

    create(data: {userInventory: string[], coins: number})
    {
        
        this.currentPage = 1;
        this.userCoins = data.coins;
        this.userInventory = data.userInventory;
        this.background = this.add.image(512, 400, 'inventoryBackground').setScale(1.8).setAlpha(1)
        let xButton = this.add.text(110, 90, 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
        xButton.on('pointerover', () => {
            xButton.setStyle({color: '#FFFFFF'} );
        })
        .on('pointerout', () => {
            xButton.setStyle({color: "000000" });
        });
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.stop('Inventory');
            this.scene.resume('Game');
        });

        this.sellText = this.add.text(100, 680, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black'}).setVisible(false)
        .setInteractive().on('pointerdown', () => {
            let cardRarity = this.userInventory[this.selectedCardToSell!].slice(0,3);
            this.userInventory.splice(this.selectedCardToSell!, 1);
            if(cardRarity === 'gre') this.userCoins += 10;
            else if (cardRarity === 'blu') this.userCoins += 20;
            else if (cardRarity === 'yel') this.userCoins += 40;
            else if (cardRarity === 'red') this.userCoins += 50;
            this.updateCards();
            this.sellText.setVisible(false)
            EventBus.emit('card sold', this.userInventory, this.userCoins)
        })
        
        this.pagination();
        this.displayCards();
        
        EventBus.emit('current-scene-ready', this);
    }
    update()
    {
        if(this.scene.isVisible()) {
            this.scene.bringToTop();
            // this.scene.resume('Inventory');
            // this.input.enable(this.sellText);
        } else {
            this.scene.sendToBack();
            // this.scene.pause('Inventory');
            // this.input.disable(this.sellText)
        };
        
    }
    pagination()
    {
        const paginationNumbers = [];
        for (let i=1; i <= Math.CeilTo(this.userInventory.length / 21); i++) {
            paginationNumbers.push(i);
        }
        let x = 400
        for(let number of paginationNumbers){
            this.add.text(x, 630, `${number}`, {color: "000000", fontSize: 20, fontFamily: 'system-ui', stroke: '#FFFFFF', strokeThickness: 6}).setInteractive()
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
            currentCard.preFX?.addShadow(0, 0, 0.05, 0.5)
            this.currentCardObjects.push(currentCard)
            if(currentCard.texture.key.slice(0,3) === 'red' || currentCard.texture.key.slice(0,3) === 'yel') {
                currentCard.preFX?.addShine(0.5, 0.5, 2);
            }
            currentCard.on('pointerdown', () => {
                if(currentCard.scale === 0.1) {
                    currentCard.setScale(0.5).setPosition(512, 384).setDepth(700);
                    this.sellText.setVisible(true);
                    this.selectedCardToSell = this.userInventory.indexOf(card);
                    if(currentCard.texture.key.slice(0,3) === 'gre') {
                        this.sellText.setText('Sell for 10 Coin')
                    } else if(currentCard.texture.key.slice(0,3) === 'blu') {
                        this.sellText.setText('Sell for 20 Coin')
                    } else if(currentCard.texture.key.slice(0,3) === 'yel') {
                        this.sellText.setText('Sell for 40 Coin')
                    } else if(currentCard.texture.key.slice(0,3) === 'red') {
                        this.sellText.setText('Sell for 50 Coin')
                    }
                } else {
                    currentCard.setScale(0.1).setPosition(ownX, ownY).setDepth(0);
                    this.sellText.setVisible(false);
                }
                
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