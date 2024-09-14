import { EventBus } from '../EventBus';
import { Scene } from 'phaser';


export class CardShop extends Scene 
{
    shopBackground: Phaser.GameObjects.Image;
    coinCurrency: number;  // Track the coin currency
    coinDisplay: Phaser.GameObjects.Text;
    currentCoins: number;
    cardInputValue: number;
    currentCards: number; 
    cardPacks: any[];       // Array to hold card packs and their prices
    cardChoices: Phaser.GameObjects.Text[]; // To track card choice texts
    youHaveText: Phaser.GameObjects.Text;
    totalCoinsText:  Phaser.GameObjects.Text;
    userPurchaseCardOffer:Phaser.GameObjects.Text;
    exchangeButton: Phaser.GameObjects.Image;
    todayRate: number;

    cardText: Phaser.GameObjects.Text;
    purchaseButton: Phaser.GameObjects.Image;
    cardCount: number;
    totalPurchaseCoins: number;
    todayRateText: Phaser.GameObjects.Text;
    currentCoinsText: Phaser.GameObjects.Text;
    shopText: Phaser.GameObjects.Text;
    errorText: Phaser.GameObjects.Text;
    cardImage: Phaser.GameObjects.Image;
    purchaseSound: Phaser.Sound.BaseSound;
    cardPrice: number;

  
    numberInputValue: number;
    numberInputDiv: HTMLInputElement | null;
    numberInput: Phaser.GameObjects.DOMElement;

    constructor(handle: string) {
        super(handle + 'CardShop');
    }

    init(data: { coinCurrency: number }) {
        this.coinCurrency = data.coinCurrency;
    }

    create(data: {coins:number, cardValue: number}) {

        this.cardInputValue = 1; //number of cards to buy
        this.currentCoins = 200 ; //data.coins
        this.currentCards = data.cardValue
        this.totalPurchaseCoins = 0;
        this.cardPrice = 100;
        
        //set-up shop background and close button 
        this.shopBackground = this.add.image(512, 400, 'background').setScale(0.8).setAlpha(0.7);
        let xButton = this.add.text(110, 90, 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
            xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.resume('Game');
        });

        this.currentCoinsText = this.add.text(380, 210, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black' }); //you have __ coins available!
     

        //display how many coins user has and their offer
        this.youHaveText = this.add.text(450, 350, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black'});
        this.add.image(330, 220, 'coin').setScale(0.05);
        this.userPurchaseCardOffer = this.add.text(420, 450, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black'});
        this.add.image(705, 410, 'coin').setScale(0.05);
        this.add.image(320, 410, 'card').setScale(0.1);

        this.cardText = this.add.text(380, 400, '', {color: "000000", fontSize: 30, fontFamily: 'Arial Black'});

        //input how many cards you want to purchase
        // this.numberInputDiv = this.numberInput.node.querySelector('input');
        // this.numberInputDiv!.addEventListener('input', () => {
        //     this.numberInputValue = Number(this.numberInputDiv!.value);
            // });

        

        //exhange coins for cards
        this.purchaseButton = this.add.image(530, 620 ,'star' ).setInteractive();
        this.purchaseButton.on('pointerdown', () => {
            if(this.currentCoins > 0){
                this.errorText.setVisible(false);
                this.currentCoins -= this.totalPurchaseCoins;
                this.purchaseSound.play();

                EventBus.emit('currency updated', this.currentCards, this.currentCoins);
            };
        });


        EventBus.emit('current-scene-ready', this);

        EventBus.on('new cards added', () => {
            this.currentCards ++;
        });
    }
    update()
    {   
        if(this.scene) this.currentCoinsText.setText(`You have ${this.currentCoins} coins available!`);
        this.cardText.setText(`x            = ${this.totalPurchaseCoins} coins`)

        if(this.scene.isVisible()) {
            this.input.enable(this.purchaseButton);
            // this.numberInputDiv!.style.visibility = 'visible';
            this.scene.bringToTop();
        } else {
            this.input.disable(this.exchangeButton);
            this.numberInputDiv!.style.visibility = 'collapse';
            this.scene.sendToBack();
        }

        if(this.currentCoins < 100) this.errorText.setText('not enough coins!')
        // else this.errorText.setText('')
    }
  
}



    //     if(this.scene) this.todayRateText.setText(`Todays exchange rate is: ${this.todayRate} per mushroom`);
    //     this.shopText.setText(`x 1     =             x ${this.todayRate}`);
    //     this.youHaveText.setText(`you have        x ${this.currentCoins}`);
    //     this.userPurchaseCardOffer.setText(`you are giving         x${this.numberInputValue}`);

    //     if(this.scene.isVisible()) {
    //         this.input.enable(this.exchangeButton);
    //         this.numberInputDiv!.style.visibility = 'visible';
    //         this.scene.bringToTop();
    //         this.errorText.setVisible(true);
    //     } else {
    //         this.input.disable(this.exchangeButton);
    //         this.numberInputDiv!.style.visibility = 'collapse';
    //         this.scene.sendToBack();
    //     };

    //     if(this.numberInputValue > this.currentCoins) this.errorText.setText('Not enough Coins!')
    //     else this.errorText.setText('');
        
    // Handle card pack purchase
    // purchaseCardPack() {
    //     const packCost = 100 //  cost of a card pack

    //     if (this.coinCurrency >= packCost) {
    //         this.coinCurrency -= packCost; // Deduct coins
    //         this.coinDisplay.setText(`Coins: ${this.coinCurrency}`); // Update coin display
    //         this.openCardPack();
    //     } else {
    //         console.log("Not enough coins!");
    //     }
    // }

    // //  card opening animation
    // openCardPack() { this.tweens.add({ targets: this.shopBackground, scale: 1.1, duration: 500, ease: 'Power2', yoyo: true,
    //         onComplete: () => { this.showCardChoices();
    //     }});
    // }

    // // Display choices of 3 cards
    // showCardChoices() {
    //     if (this.cardChoices) {
    //         this.cardChoices.forEach(choice => choice.destroy()); // Clean up previous choices
    //     }

    //     this.cardChoices = []; // Initialize cardChoices array

    //     // card choices
    //     let card1 = this.add.text(200, 400, 'Card 1', { color: "#ff0000", fontSize: 24, fontFamily: 'Arial' })
    //         .setInteractive().on('pointerdown', () => this.selectCard(1));
    //     let card2 = this.add.text(400, 400, 'Card 2', { color: "#00ff00", fontSize: 24, fontFamily: 'Arial' })
    //         .setInteractive().on('pointerdown', () => this.selectCard(2));
    //     let card3 = this.add.text(600, 400, 'Card 3', { color: "#0000ff", fontSize: 24, fontFamily: 'Arial' })
    //         .setInteractive().on('pointerdown', () => this.selectCard(3));

    //     this.cardChoices.push(card1, card2, card3); // Track choices
    // }

    // // Handle card selection
    // selectCard(cardNumber: number) {
    //     console.log(`Selected card number: ${cardNumber}`);

    
    // }
