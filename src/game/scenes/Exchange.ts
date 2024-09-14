import { EventBus } from '../EventBus';
import { Math, Scene } from 'phaser';

export class Exchange extends Scene
{
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

    shopBackground: Phaser.GameObjects.Image;
    exchangeButton: Phaser.GameObjects.Image;
    mushroomIcon: Phaser.GameObjects.Image;

    mushroomExchangeRateTimer: Phaser.Time.TimerEvent;
    numberInput: Phaser.GameObjects.DOMElement;
    purchaseSound: Phaser.Sound.BaseSound;
    constructor(handle: string)
    {
        super(handle + 'Exchange')
    }

    create(data: {mushroomCurrency: number, coins: number})
    {
        
        this.numberInputValue = 1;
        this.todayRate = Math.Between(10, 50);
        this.currentMushrooms = data.mushroomCurrency;
        this.currentCoins = data.coins;
        this.purchaseSound = this.sound.add('purchase').setVolume(0.2);

        //set-up exchange rate background
        this.shopBackground = this.add.image(512, 400, 'background').setScale(0.8).setAlpha(0.7);
        let xButton = this.add.text(110, 90, 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.resume('Game');
        })
        this.todayRateText = this.add.text(270, 100, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black' });

        //setup timer to change price
        this.mushroomExchangeRateTimer = this.time.addEvent({
            callback: () => this.todayRate = Phaser.Math.Between(10, 50),
            callbackScope: this,
            delay: 5000, // 1000 = 1 second
            loop: true
        });

        //conversion text
        this.mushroomIcon = this.add.image(300, 300, 'mushroom4').setScale(0.4);
        this.shopText = this.add.text(380, 290, '', {color: "000000", fontSize: 30, fontFamily: 'Arial Black'});
        this.add.image(570, 310, 'coin').setScale(0.05);

        //display how many mushrooms user has and their offer
        this.youHaveText = this.add.text(450, 150, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black'});
        this.add.image(575, 160, 'mushroom4').setScale(0.1);
        this.userMushroomOffer = this.add.text(420, 450, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black'});
        this.add.image(610, 460, 'mushroom4').setScale(0.1);

        //error message if they do more than they can
        this.errorText = this.add.text(400, 500, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black'});

        //input for how many mushroom you want to offer
        this.numberInput = this.add.dom(650, 400).createFromCache('mushroomForm');
        this.numberInputDiv = this.numberInput.node.querySelector('input');
        this.numberInputDiv!.addEventListener('input', () => {
            this.numberInputValue = Number(this.numberInputDiv!.value);
        });

        //on submit / confirm their trade
        this.exchangeButton = this.add.image(512, 650, 'sellicon').setInteractive().setScale(0.2);
        this.exchangeButton.on('pointerdown', () => {
            if (this.currentMushrooms > 0 && this.currentMushrooms >= this.numberInputValue){
                this.errorText.setVisible(false);
                this.currentMushrooms -= this.numberInputValue;
                this.currentCoins += this.todayRate * this.numberInputValue;
                this.purchaseSound.play();
                //send this signal to main scene followed by these 2 variables (which are 2 numbers)
                EventBus.emit('currency updated', this.currentMushrooms, this.currentCoins);
            };
        });
        
        
        EventBus.emit('current-scene-ready', this);

        //IMPORTANT when checks when the main scene emits this message, and then adds to the mushroom count here
        EventBus.on('mushroom added', () => {
            this.currentMushrooms ++;
        });
    }
    update()
    {   
        if(this.scene) this.todayRateText.setText(`Todays exchange rate is: ${this.todayRate} per mushroom`);
        this.shopText.setText(`x ${this.numberInputValue}     =             x ${this.todayRate * this.numberInputValue}`);
        this.youHaveText.setText(`you have        x ${this.currentMushrooms}`);
        this.userMushroomOffer.setText(`you are giving         x${this.numberInputValue}`);

        if(this.scene.isVisible()) {
            this.input.enable(this.exchangeButton);
            this.numberInputDiv!.style.visibility = 'visible';
            this.scene.bringToTop();
            this.errorText.setVisible(true);
        } else {
            this.input.disable(this.exchangeButton);
            this.numberInputDiv!.style.visibility = 'collapse';
            this.scene.sendToBack();
        };

        if(this.numberInputValue > this.currentMushrooms) this.errorText.setText('Not enough Mushrooms!')
        else this.errorText.setText('');
        
    }
}