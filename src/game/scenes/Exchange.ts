import { EventBus } from '../EventBus';
import { Math, Scene } from 'phaser';

export class Exchange extends Scene
{
    shopBackground?: Phaser.GameObjects.Image;
    todayRateText: Phaser.GameObjects.Text;
    todayRate: number;
    mushroomExchangeRateTimer: Phaser.Time.TimerEvent;
    exchangeButton: Phaser.GameObjects.Image;

    constructor(handle: string)
    {
        super(handle + 'Exchange')
    }

    create(data: {mushroomCurrency: number})
    {
        this.todayRate = Math.Between(10, 50);
        //set-up exchange rate background
        this.shopBackground = this.add.image(512, 400, 'background').setScale(0.8).setAlpha(0.7);
        let xButton = this.add.text(110, 90, 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.input.disable(this.exchangeButton);
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
        this.exchangeButton = this.add.image(512, 300, 'star').setInteractive();
        this.exchangeButton.on('pointerdown', () => console.log('bought!'));
        EventBus.emit('current-scene-ready', this);
    }
    update()
    {   
        console.log(this.todayRate)
        if(this.scene) this.todayRateText.setText(`Todays exchange rate is: ${this.todayRate} per mushroom`);

    }
}