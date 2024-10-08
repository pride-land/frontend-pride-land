import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { EventBus } from '../EventBus';
import { Math, Scene } from 'phaser';
import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox';
import AIO from 'phaser3-rex-plugins/templates/spinner/aio/AIO';
import { Exchange } from './Exchange';
import { CardShop } from './CardShop';
import { Inventory } from './Inventory';
import pick from 'pick-random-weighted';

//to appease custom property on the mushroom counter error;
interface ExtendedSprite extends Phaser.Physics.Arcade.Sprite {
    tweenPlayed: boolean;  // Optional custom property
}

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    rexUI: UIPlugin;
    tutorialTextBox: TextBox;
    realLogGroup: Phaser.Physics.Arcade.StaticGroup
    realLog: Phaser.Physics.Arcade.Sprite
    waterProgressBar: Phaser.GameObjects.Shape
    waterFillProgressBar: Phaser.GameObjects.Shape
    //set up flags and checks
    isTextDone: boolean;
    hasRun: boolean;
    isLogFull: boolean;
    isLogFullHasRun: boolean;
    isMushroomDone: boolean;
    isCurrentBatchHarvested: boolean;
    
    waterDropListener: Phaser.Events.EventEmitter;
    tutorialTimerText: Phaser.GameObjects.Text;
    tutorialTimerHarvest: Phaser.Time.TimerEvent;
    mushroomSprite: Phaser.Physics.Arcade.Sprite;
    mushroomTween: Phaser.Tweens.Tween | null;
    mushroomCurrency: number;
    mushroomCurrencyText: Phaser.GameObjects.Text;
    numberOfMushrooms: number;
    mushroomGroup: Phaser.Physics.Arcade.StaticGroup;
    count: number
    shopContainer: Phaser.GameObjects.Container;
    coins: number;
    coinsText: Phaser.GameObjects.Text;
    shopScene: Phaser.Scene | null;
    cardShopScene: Phaser.Scene | null;
    exchangeShopIcon: Phaser.GameObjects.Image;
    cardShopIcon: Phaser.GameObjects.Image;
    inventoryIcon: Phaser.GameObjects.Image;
    inventoryScene: Phaser.Scene | null;
    userInventory: string [];
    themeSong: Phaser.Sound.WebAudioSound;
    pop1: Phaser.Sound.BaseSound;
    pop2: Phaser.Sound.BaseSound;
    pop3: Phaser.Sound.BaseSound;
    pop4: Phaser.Sound.BaseSound;
    waterdropSound: Phaser.Sound.BaseSound;
    muteButton: Phaser.GameObjects.Image;
    mushroomGrowSound: Phaser.Sound.BaseSound;
    userFinishTutorial: boolean;
    constructor ()
    {
        super('Game');

    }

    //create method to makes as much textboxes as wanted
    createTextBox(): TextBox 
    {
        const textbox = new TextBox(this, {
            x: 512,
            y: 200,
            width: 400,
            height: 50,
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0x4e342e),
            text: this.add.text(0, 0, '', {
                fontSize: '20px',
                wordWrap: { width: 380 },
                maxLines: 4
            }),
            page: {
                pageBreak: '\f\n'
            },
            action: this.rexUI.add.aioSpinner({
                width: 30, height: 30,
                duration: 2000,
                animationMode: 'puff',
            }).setVisible(false),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                text: 10,
            }
        }).setDepth(200);
        
        this.add.existing(textbox);

        textbox.setInteractive()
        .on('pointerdown', () => {
            let animation = textbox.getElement('action');
            if(animation instanceof AIO){
                animation.stop().setVisible(false);
            }

            if(textbox.isTyping){
                textbox.stop(true);
            } else {
                textbox.typeNextPage();
            }
            }, textbox)
        .on('pageend', () => {
            if(textbox.isLastPage) return;
            let animation: any = textbox.getElement('action');
            animation.setVisible(true).start();
            textbox.resetChildVisibleState(animation);
        })
        .on('complete', () => {
            textbox.onClick(() => {
                textbox.setVisible(false);
                this.isTextDone = true;
            }); 
        })
        return textbox;
    }

    create (data: { fadeIn: boolean, coins: number, mushrooms: number, cards: string[], tutorialFinished: boolean})
    {

        //mute song button
        this.muteButton = this.add.image(950,700,'mute').setScale(0.05).setInteractive().setDepth(200).setTintFill();
        this.muteButton.on('pointerover', () => {
            this.tweens.add({
                targets: this.muteButton,
                scale: {
                    value: 0.07,
                    duration: 100
                }
            });
        })
        .on('pointerout', () => {
            this.muteButton.setScale(0.05);
        });
        
        this.add.rectangle(0,50,450,200,0x000000).setDepth(200).setAlpha(0.5);
        this.pop1 = this.sound.add('pop1').setVolume(0.06);
        this.pop2 = this.sound.add('pop2').setVolume(0.06);
        this.pop3 = this.sound.add('pop3').setVolume(0.06);
        this.pop4 = this.sound.add('pop4').setVolume(0.06);
        this.mushroomGrowSound = this.sound.add('mushroomgrow').setVolume(0.3).setRate(1.6);
        
        this.waterdropSound = this.sound.add('waterdrop').setVolume(0.5);

        const themeSong = this.sound.add('mushroomsong').setLoop(true).setVolume(0.2);
        if(themeSong instanceof Phaser.Sound.WebAudioSound) this.themeSong = themeSong;
        this.themeSong.play();
        this.muteButton.on('pointerdown', () => {
            this.themeSong.volume !== 0 ? this.themeSong.setVolume(0) : this.themeSong.setVolume(0.2);
        })

        this.userInventory = data.cards || [];


        // this.userInventory.push('redcard01');
        // for(let i = 0; i<23; i++) {
        //     this.userInventory.push('greencard01');

        // }

        this.coins = data.coins || 0;
        this.mushroomCurrency = data.mushrooms || 0;
        this.isTextDone = false;
        this.userFinishTutorial = data.tutorialFinished || false;

        if(data.mushrooms && data.coins && data.tutorialFinished) {
            EventBus.emit('currency updated', data.mushrooms, data.coins);
            EventBus.emit('tutorial finished');
        }
   
        //intro textbox text check
        this.hasRun = false;

        //tutorial log filled check
        this.isLogFull = false;
        this.isLogFullHasRun = false;
        
        this.camera = this.cameras.main;
        
        this.mushroomCurrencyText = this.add.text(10, 70, "", {
            color: '#9fd412', fontSize: 20, fontFamily: 'Helvetica',
        }).setDepth(200)

        this.coinsText = this.add.text(10, 100, "", {
            color: '#9fd412', fontSize: 20, fontFamily: 'Helvetica',
        }).setDepth(200)

        if(data.fadeIn){
            this.camera.fadeIn(2000, 0, 0, 0);
        }

        //set up assets
        this.background = this.add.image(512, 300, 'shed');

        this.cardShopIcon = this.add.image(950, 70, 'cardshopicon').setVisible(false);
        this.cardShopIcon.setScale(0.15).setInteractive().setDepth(701)
        .on('pointerover', () => {
            this.tweens.add({
                targets: this.cardShopIcon,
                scale: {
                    value: 0.2,
                    duration: 100
                }
            });
        })
        .on('pointerout', () => {
            this.cardShopIcon.setScale(0.15);
        })
        this.cardShopIcon.on('pointerup', () => {
            if (!this.cardShopScene) this.createShopScene(CardShop);
            else {
                this.cardShopScene.scene.restart({coins:this.coins});
            }
            this.scene.pause();
        })

        this.exchangeShopIcon = this.add.image(955, 190, 'exchangeshopicon');
        this.exchangeShopIcon.setScale(0.16).setInteractive().setDepth(702)
        .on('pointerover', () => {
            this.tweens.add({
                targets: this.exchangeShopIcon,
                scale: {
                    value: 0.2,
                    duration: 100
                }
            });
        })
        .on('pointerout', () => {
            this.exchangeShopIcon.setScale(0.16);
        })
        this.exchangeShopIcon.on('pointerup', () => {
            if (!this.shopScene) this.createShopScene(Exchange);
            else {
                this.shopScene.scene.setVisible(true);
            }
            this.scene.pause();
            // this.waterDropListener.once
        })

        this.inventoryIcon = this.add.image(70, 690, 'mushroomBook').setScale(0.3).setVisible(false)
        .on('pointerover', () => {
            this.tweens.add({
                targets: this.inventoryIcon,
                scale: {
                    value: 0.4,
                    duration: 100
                }
            });
        })
        .on('pointerout', () => {
            this.inventoryIcon.setScale(0.3);
        })
        this.inventoryIcon.setInteractive()
        .on('pointerup', () => {
            if (!this.inventoryScene) this.createShopScene(Inventory);
            else {
                this.inventoryScene.scene.restart();
            }
            this.scene.pause();
        })

        //set up log as an physical object
        this.realLogGroup = this.physics.add.staticGroup();
        this.realLog = this.realLogGroup.create(512, 640, 'log')
        this.realLog.setScale(0.6).refreshBody().setDepth(300);

        this.tutorialTextBox = this.createTextBox();
        
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            if(!this.userFinishTutorial)this.tutorialTextBox.start('Welcome to the Pride Farm mushroom shed!\f\nHere you will be responsible to water, take care of, and harvest your very own Shiitake mushrooms!\f\nLets first water the log!\f\nClick anywhere on the screen to start watering the log.', 20);
            else {
                this.isTextDone = true;
                this.hasRun = true;
                this.startWatering();
            }
        });
        // English Text: 
        // 'Welcome to the PrideFarm mushroom shed!\f\nHere you will be responsible to water, take care, and harvest your very own Shiitake mushrooms!\f\nLets first water the log!\f\nClick anywhere on the screen to start watering the log.', 20

        EventBus.emit('current-scene-ready', this);

        //IMPORANT when main game receives this exact signal; increase/decrease user currencies
        EventBus.on('currency updated', (newMushroomCount: number, newCoinCount: number) => {
            this.mushroomCurrency = newMushroomCount; 
            this.coins = newCoinCount;
        });

        //update when selling acrd
        EventBus.on('card sold', (newInventory: string [], newCoinCount: number) => {
            this.userInventory = newInventory;
            this.coins = newCoinCount;
        })

        //update when card pack bought
        EventBus.on('card pack bought', (newCoinCount: number, newCard: string) => {
            this.coins = newCoinCount;
            this.userInventory.push(newCard);

            EventBus.emit('inventory updated', this.userInventory);
        })

        //update when userfinishes tutorial
        EventBus.on('tutorial finished', () => {
            this.userFinishTutorial = true;
        })
    }
    
    createShopScene(func: any)
    {
        const x = 512;
        const y = 400;

        const handle = 'window' + this.count++;
        const win = this.add.zone(x, y, 300, 300).setInteractive().setOrigin(0);
        const demo = new func(handle, win);
        if(!this.shopScene){
            this.shopScene = this.scene.add(handle, demo, true, {mushroomCurrency: this.mushroomCurrency, coins: this.coins});
        } 
        else if(!this.cardShopScene){
            this.cardShopScene = this.scene.add(handle, demo, true, {coins: this.coins});
        } else {
            this.inventoryScene = this.scene.add(handle, demo, true, {userInventory: this.userInventory, coins: this.coins});
        }
    }
    
    update() 
    {
        //number of mushrooms on the log
        // this.numberOfMushrooms = this.children.list.filter(child => child instanceof Phaser.Physics.Arcade.Sprite).length - 1;
        
        if(this.mushroomGroup?.getChildren().length === 0 && !this.isCurrentBatchHarvested) {

            this.isCurrentBatchHarvested = true;
            this.isLogFull = false;
            this.isLogFullHasRun = false;
            this.time.delayedCall(2000, () => {
                this.startWatering();
            });
        };

        if(this.isTextDone && !this.hasRun) {
            this.hasRun = true;
            this.startWatering();
        };
        

        if(this.isLogFull && !this.isLogFullHasRun){
            this.isLogFullHasRun = true;
            this.time.delayedCall(2000, () => {
                this.waterProgressBar.destroy();
                this.waterFillProgressBar.destroy();
            });
            this.startHarvesting();
        };

        if(this.tutorialTimerText && !this.isMushroomDone){
            this.tutorialTimerText.setText(`Time Left: ${this.tutorialTimerHarvest.getRemainingSeconds().toString().substring(0, 1)}`);
        };
        //currency setup
        this.mushroomCurrencyText.setText(`Mushroom count: ${this.mushroomCurrency}`)
        this.coinsText.setText(`Coins: ${this.coins}`)

        if(this.tutorialTimerText) this.exchangeShopIcon.setVisible(true);
        if(this.shopScene) this.cardShopIcon.setVisible(true);
        if(this.cardShopScene) this.inventoryIcon.setVisible(true);
        
    }
    startWatering()
    {
        //waterprogress bar filling
        this.waterProgressBar = this.add.rectangle(512, 100, 468, 32).setStrokeStyle(1, 0xffffff);  //outline
        this.waterFillProgressBar = this.add.rectangle(512-230, 100, 4, 28, 0xffffff);                     //actual bar filling needs to finish 464px

        const addProgress = (waterdrop: Phaser.Physics.Arcade.Sprite ) => {
            waterdrop.destroy();
            if(this.waterFillProgressBar.width < 468) this.waterFillProgressBar.width += 16;
            else this.isLogFull = true;
        }
        this.waterDropListener = this.input.on('pointerdown',  (pointer: MouseEvent) => {
            let waterdrop = this.physics.add.sprite(pointer.x, pointer.y, 'waterdrop');

            waterdrop
            .setBounce(0.03)
            .setScale(0.15)
            .setCollideWorldBounds(false)
        
            this.physics.add.collider(waterdrop, this.realLog);
            this.physics.add.overlap(waterdrop, this.realLog, () => {
                this.tweens.add({
                    targets: waterdrop,
                    scale: {
                        value: 0,
                        duration: 50
                    },
                    onComplete: () => {
                        addProgress(waterdrop);
                    }
                });
                this.waterdropSound.play();
            }, undefined, this)
            
        }, this);

        this.isMushroomDone = false;
    }
    startHarvesting()
    {

        //disable waterdroplets when progress is done
        this.input.removeAllListeners();
        const harvestText = this.createTextBox();
        
        this.time.delayedCall(2000, () => {
            if(!this.mushroomGroup && !this.userFinishTutorial) harvestText.start('Nice work!\f\nNow we must wait for our mushrooms to grow in order to harvest them.\f\nIn the top left corner, there is a timer that will tell you when the mushrooms are finished growing.\f\nOnce that is over, click on the mushrooms to harvest them!\f\nAfterwards, you may water the log again and harvest as many mushrooms as you would like!\f\nThen, using the two shop icons in the top right, you can purchase coins and cool collectors cards!\f\nHappy harvesting!', 20);
            // English:
            // Nice work! Now we must wait for our mushrooms to grow in order to harvest them. Lets wait for the timer to go down. And once that is over, click to harvest the mushrooms
            if(this.isTextDone === true || this.mushroomGroup){
                if(!this.tutorialTimerText) this.tutorialTimerText = this.add.text(10, 40, '', {
                    color: '#9fd412', fontSize: 20, fontFamily: 'Helvetica',
                }).setDepth(200);
                this.tutorialTimerHarvest = this.time.delayedCall(7000, () => {
                    this.mushroomGrowSound.play();
                    this.isMushroomDone = true;
                    this.mushroomGrowth();                    
                })
            };
            if(!this.userFinishTutorial) {
                this.userFinishTutorial = true;
                EventBus.emit('tutorial finished');
            };
            
        })
        
    }
    
    createMushrooms(): Phaser.Physics.Arcade.Sprite
    {
        const mushroom = this.physics.add.staticSprite(
            Phaser.Math.Between(265, 777) , 
            Phaser.Math.Between(563,671),
            `mushroom${Math.Between(1,4)}`
        ).setScale(0).setDepth(301);

        this.tweens.add({
            targets: mushroom,
            scale: {
                value: 0.2,
                duration: 1500,
                ease: 'Bounce.easeOut'
            }
        });

        mushroom.setImmovable(false).setInteractive({draggable: true}).refreshBody().on('pointerdown', () => this.playRandom());

        //make mushrooms draggable
        this.input.on('dragstart', (_pointer: PointerEvent, gameObject: Phaser.Physics.Arcade.Sprite) => {
            gameObject.setTint(0x00ffa6)
        });

        this.input.on('drag', (_pointer: PointerEvent, gameObject: Phaser.Physics.Arcade.Sprite , dragX: number, dragY: number) => {
            gameObject.x = dragX
            gameObject.y = dragY
        });

        this.input.on('dragend', (_pointer: Phaser.Input.Pointer , gameObject: ExtendedSprite) => {
            gameObject.clearTint();
            
            if(!gameObject.tweenPlayed){
                gameObject.tweenPlayed = true;
                this.tweens.add({
                    targets: gameObject,
                    y: {
                        value: 800,
                        duration: 1000,
                    },
                    angle: {
                        value: 360,
                        duration: 1000
                    }
                }).on('complete', () => {
                    this.mushroomCurrency++;
                    gameObject.destroy();

                    //tell Other scenes that a mushroom was added to the account
                    EventBus.emit('mushroom added', this.mushroomCurrency)
                })
            } 
        });
        

        return mushroom;
    }
    mushroomGrowth()
    {
        if(!this.mushroomGroup) this.mushroomGroup = this.physics.add.staticGroup(this.mushroomSprite);
        for(let i=0; i<Phaser.Math.Between(25, 50); i++){
            this.mushroomSprite = this.createMushrooms();
            this.mushroomGroup.add(this.mushroomSprite);
        }
        
        this.isCurrentBatchHarvested = false;
        // this.realLog.setInteractive().on('pointerdown', (pointer:PointerEvent) => console.log(pointer.x , pointer.y))
        //leftmost growth 265 most bottom 671 rightmost 777 topmost 563
    }
    changeScene ()
    {
        this.scene.start('GameOver');
    }
    playRandom()
    {
        const sounds = [
            [this.pop1, 1],
            [this.pop2, 1],
            [this.pop3, 1],
            [this.pop4, 1]
        ];
        let chosenSound = pick(sounds);
        chosenSound.play();
    }
}
