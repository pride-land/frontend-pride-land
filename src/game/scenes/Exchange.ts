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
        this.purchaseSound = this.sound.add('exchange').setVolume(0.2).setRate(1.9);
        this.errorSound = this.sound.add('error').setVolume(0.5);
        this.owlhoot = this.sound.add('owlhoot').setVolume(0.8);
        this.owlhoot.play();
        //set-up exchange rate background
        this.shopBackground = this.add.image(512, 400, 'exchangebg').setScale(1, 0.8).setAlpha(1).setTint();
        this.add.rectangle(121,107,40,40,0xFFFFFF).setAlpha(0.7)
        let xButton = this.add.text(110, 90, 'X', {color: "000000", fontSize: 30, fontFamily: 'Helvetica-Bold' }).setInteractive().setOrigin(0);
        xButton.on('pointerover', () => {
            xButton.setStyle({color: '#CC0000'} );
        })
        .on('pointerout', () => {
            xButton.setStyle({color: "000000" });
        });
        
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.resume('Game');
        })
        this.todayRateText = this.add.text(450, 350, '', {color: "000000", fontSize: 14, fontFamily: 'Helvetica-Bold' });

        //setup timer to change price
        this.mushroomExchangeRateTimer = this.time.addEvent({
            callback: () => this.todayRate = Phaser.Math.Between(10, 50),
            callbackScope: this,
            delay: 120000, // 1000 = 1 second
            loop: true
        });

        //conversion text
        this.mushroomIcon = this.add.image(330, 300, 'mushroom4').setScale(0.4);
        this.shopText = this.add.text(380, 290, '', {color: "000000", fontSize: 30, fontFamily: 'Helvetica-Bold'});
        this.add.image(520, 310, 'coin').setScale(0.05);

        //display how many mushrooms user has and their offer
        this.youHaveText = this.add.text(450, 240, '', {color: "000000", fontSize: 20, fontFamily: 'Helvetica-Bold'});
        this.add.image(555, 250, 'mushroom4').setScale(0.1);
        this.userMushroomOffer = this.add.text(420, 450, '', {color: "000000", fontSize: 20, fontFamily: 'Helvetica-Bold'});
        this.add.image(440, 460, 'mushroom4').setScale(0.1);
        this.add.image(510, 462, 'coin').setScale(0.018)
        //error message if they do more than they can
        this.errorText = this.add.text(400, 500, '', {color: "000000", fontSize: 20, fontFamily: 'Helvetica-Bold'});

        //input for how many mushroom you want to offer
        this.numberInput = this.add.dom(512, 400).createFromCache('mushroomForm');
        this.numberInputDiv = this.numberInput.node.querySelector('input');
        this.numberInputDiv!.addEventListener('input', () => {
            this.numberInputValue = Number(this.numberInputDiv!.value);
        });

        this.maxButton = this.add.image(600, 400, 'max').setScale(0.1).setInteractive();
        this.maxButton.on('pointerdown', () => {
            if(this.currentMushrooms > 0){
                this.numberInputValue = this.currentMushrooms;
                this.numberInputDiv!.value = String(this.currentMushrooms)
            }
        })

        //on submit / confirm their trade
        this.exchangeButton = this.add.image(525, 550, 'sellicon').setInteractive().setScale(0.1)
        .on('pointerover', () => {
            this.exchangeButton.setScale(0.22)
        })
        .on('pointerout', () => {
            this.exchangeButton.setScale(0.1)
        })
        this.exchangeButton.on('pointerdown', () => {
            if (this.currentMushrooms > 0 && this.currentMushrooms >= this.numberInputValue){
                this.errorText.setVisible(false);
                this.currentMushrooms -= this.numberInputValue;
                this.currentCoins += this.todayRate * this.numberInputValue;
                this.purchaseSound.play();
                //send this signal to main scene followed by these 2 variables (which are 2 numbers)
                EventBus.emit('currency updated', this.currentMushrooms, this.currentCoins);
            } else{
                this.errorSound.play();
            }
        });
        
        
        EventBus.emit('current-scene-ready', this);

        //IMPORTANT when checks when the main scene emits this message, and then adds to the mushroom count here
        EventBus.on('mushroom added', () => {
            this.currentMushrooms ++;
        });
        EventBus.on('card pack bought', () => {
            this.currentCoins -= 100;
        })
    }
    update()
    {   
        this.secondsLeft = this.mushroomExchangeRateTimer.getRemainingSeconds().toString().substring(0, 3);
        this.todayRateText.setText(`Price time left: ${this.secondsLeft}`);
        this.shopText.setText(`x ${this.numberInputValue}                    x  ${this.todayRate * this.numberInputValue}`);
        this.youHaveText.setText(`you have        x ${this.currentMushrooms}`);
        this.userMushroomOffer.setText(`        x1 =     x${this.todayRate}`);

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