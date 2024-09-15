import { EventBus } from '../EventBus';
import { Math, Scene } from 'phaser';
import pick from 'pick-random-weighted';

export class CardShop extends Scene 
{
    currentCoins: number;
    cardPrice: number;
    shopBackground: Phaser.GameObjects.Image;
    currentCoinsText: Phaser.GameObjects.Text;
    cardText: Phaser.GameObjects.Text;
    errorText: Phaser.GameObjects.Text;
    purchaseButton: Phaser.GameObjects.Image;
    mysteryCardIcon: Phaser.GameObjects.Image;
    cardBack: Phaser.GameObjects.Sprite;
    purchaseSound: Phaser.Sound.BaseSound;
    rarecardBoom: Phaser.Sound.BaseSound;
    commoncardBoom: Phaser.Sound.BaseSound;
    constructor(handle: string) {
        super(handle + 'CardShop');
    }

    create(data: {coins: number}) {

        this.currentCoins = data.coins;
        this.cardPrice = 100;
        this.cardBack = this.add.sprite(-200, 400, 'cardback').setVisible(true).setDepth(300).setScale(0.8).setInteractive();
        this.cardBack.preFX?.addShadow(0, 0, 0.05, 0.5);
        this.purchaseSound = this.sound.add('cardPurchase').setVolume(0.3);
        this.rarecardBoom = this.sound.add('rarecard').setVolume(0.4).setRate(1.2);
        this.commoncardBoom = this.sound.add('commoncard').setVolume(0.3);
        //set-up shop background and close button 
        this.shopBackground = this.add.image(512, 450, 'cardshopbackground').setScale(1.5);
        let xButton = this.add.text(270, 160, 'x', {color: "000000", fontSize: 30, fontFamily: 'Arial Black' }).setInteractive().setOrigin(0);
        xButton.on('pointerdown', () => {
            this.scene.setVisible(false);
            this.scene.stop('CardShop');
            this.scene.resume('Game');
        });

        this.currentCoinsText = this.add.text(380, 240, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black' }); //you have __ coins available!
     

        //display how many coins user has and their offer
        this.add.image(360, 250, 'coin').setScale(0.02);
        this.add.image(670, 416, 'coin').setScale(0.05);
        this.mysteryCardIcon = this.add.image(480, 410, 'mysterycard').setScale(0.3)
   

        this.cardText = this.add.text(380, 400, '', {color: "000000", fontSize: 30, fontFamily: 'Arial Black'});
        this.errorText = this.add.text(430, 550, '', {color: "000000", fontSize: 20, fontFamily: 'Arial Black'})
        //exhange coins for cards
        this.purchaseButton = this.add.image(530, 620 ,'star' ).setInteractive();
        this.purchaseButton.on('pointerdown', () => {
            if(this.currentCoins >= 100){
                this.purchaseSound.play();
                this.input.disable(this.purchaseButton)
                let chosenCard = this.randomCardChooser();
                this.currentCoins -= 100;

                let chosenCardSprite = this.add.sprite(520, 400, chosenCard).setScale(0, 0.25).setDepth(301).setInteractive();
                chosenCardSprite.preFX?.addShadow(0, 0, 0.05, 0.5);
                this.tweens.add({
                    targets: this.cardBack,
                    x: {
                        value: 530,
                        duration: 200,
                    }
                });
                this.cardBack.on('pointerdown', () => {
                    this.tweens.add({
                        targets: this.cardBack,
                        scaleX: {
                            value: 0,
                            duration: 200
                        },
                        onComplete: () => {
                            this.cardBack.setScale(0.8);
                            this.cardBack.setX(-200);
                        }
                    });
                    this.tweens.add({
                        targets: chosenCardSprite,
                        scaleX: {
                            value: 0.3,
                            duration: 200,
                            delay: 200
                        }
                    })
                    if(chosenCard.slice(0,3) === 'red' || chosenCard.slice(0,3) === 'yel'){
                        this.tweens.add({
                            targets: chosenCardSprite,
                            scale: {
                                value: 0.5,
                                duration: 100,
                                delay: 400
                            },
                            yoyo: true,
                            onComplete: () => {
                                if(chosenCardSprite.postFX){
                                    chosenCardSprite.postFX.addShine(0.5, 0.5, 2);
                                    this.rarecardBoom.play();
                                }
                            }
                        });
                        this.tweens.add({
                            targets: chosenCardSprite,
                            angle: {
                                value: 40,
                                duration: 50,
                                delay: 300,
                            },
                            yoyo: true,
                            onComplete: () => {
                                this.tweens.add({
                                    targets: chosenCardSprite,
                                    angle: {
                                        value: -40,
                                        duration: 50,
                                    },
                                    yoyo: true,
                                })
                            }
                        })
                    } else this.commoncardBoom.play();
                });
                chosenCardSprite.on('pointerdown', () => {
                    this.tweens.add({
                        targets: chosenCardSprite,
                        y: {
                            value: 1000,
                            duration: 300,
                        },
                        onComplete: () => {
                            this.input.enable(this.purchaseButton)
                            chosenCardSprite.destroy(true);
                        }
                    })
                })

                EventBus.emit('card pack bought', this.currentCoins, chosenCard);
            };
        });


        EventBus.emit('current-scene-ready', this);

        EventBus.on('currency updated', (newMushroomCount: number, newCoinCount: number) => {
            newMushroomCount;
            this.currentCoins = newCoinCount;
        });

    }
    update()
    {   
        this.currentCoinsText.setText(`You have ${this.currentCoins} coins available!`);
        this.cardText.setText(`x1            = ${this.cardPrice}`)

        if(this.scene.isVisible()) {
            this.scene.bringToTop();
        } else {
            this.scene.sendToBack();
        };

        if (this.currentCoins < 100) this.errorText.setText('not enough coins!');
        else this.errorText.setText('');
    }
    randomCardChooser()
    {
        const rarities = [
            ['greencard', 70],
            ['bluecard', 20],
            ['yellowcard', 9.5],
            ['redcard', 0.5]
        ];
        let rarity = pick(rarities);
        let randomIndex = Math.Between(1, 20);
        if (randomIndex < 10) {
            return rarity + '0' + randomIndex;
        } else {
            return rarity + randomIndex;
        }
        
    }
}
