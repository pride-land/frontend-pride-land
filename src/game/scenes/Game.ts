import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import TextBox from 'phaser3-rex-plugins/templates/ui/textbox/TextBox';
import AIO from 'phaser3-rex-plugins/templates/spinner/aio/AIO';


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
    //set up flags and checks
    isTextDone: boolean;
    hasRun: boolean;
    isLogFull: boolean;
    isLogFullHasRun: boolean;
    tutorialTimerText: Phaser.GameObjects.Text;
    tutorialTimerHarvest: Phaser.Time.TimerEvent;
    isMushroomDone: boolean;
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

    create (data: { fadeIn: boolean })
    {
        this.isTextDone = false;
        this.hasRun = false;
        this.camera = this.cameras.main;
        
        if(data.fadeIn){
            this.camera.fadeIn(2000, 0, 0, 0);
        }

        //set up assets
        this.background = this.add.image(512, 300, 'shed');
        let cardShopIcon = this.add.image(950, 70, 'cardshopicon');
        cardShopIcon.setScale(0.15);
        let exchangeShopIcon = this.add.image(955, 150, 'exchangeshopicon');
        exchangeShopIcon.setScale(0.16);

        //set up log as an physical object
        this.realLogGroup = this.physics.add.staticGroup();
        this.realLog = this.realLogGroup.create(512, 640, 'log')
        this.realLog.setScale(0.6).refreshBody();

        this.tutorialTextBox = this.createTextBox();
        
        this.tutorialTextBox.start('プライドファームのきのこ小屋へようこそ！\f\nここでは、水やり、手入れ、収穫など、自分だけのシイタケを作ることができます！\f\nまずは丸太に水をやりましょう！\f\n画面をクリックすると、水やりが開始されます。', 20);
        // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
        // });
        // English Text: 
        // 'Welcome to the PrideFarm mushroom shed!\f\nHere you will be responsible to water, take care, and harvest your very own Shiitake mushrooms!\f\nLets first water the log!\f\nClick anywhere on the screen to start watering the log.', 20
        
        EventBus.emit('current-scene-ready', this);
    }
    update() 
    {
        if(this.isTextDone && !this.hasRun) {
            this.hasRun = true;
            this.startWatering();
            console.log('waterupdate')
        };

        if(this.isLogFull && !this.isLogFullHasRun){
            this.isLogFullHasRun = true;
            this.startHarvesting();
            console.log('logfull update')
        };

        if(this.tutorialTimerText && !this.isMushroomDone){
            this.tutorialTimerText.setText(`Time Left: ${this.tutorialTimerHarvest.getRemainingSeconds().toString().substring(0, 1)}`);
        };

    }
    startWatering()
    {
        //waterprogress bar filling
        this.waterProgressBar = this.add.rectangle(512, 100, 468, 32).setStrokeStyle(1, 0xffffff);  //outline
        const fillWaterBar = this.add.rectangle(512-230, 100, 4, 28, 0xffffff);                     //actual bar filling needs to finish 464px

        const addProgress = (waterdrop: Phaser.Physics.Arcade.Sprite ) => {
            waterdrop.destroy();
            if(fillWaterBar.width < 468) fillWaterBar.width += 29;
            else this.isLogFull = true;
        }
        this.input.on('pointerdown',  (pointer: MouseEvent) => {
            let waterdrop = this.physics.add.sprite(pointer.x, pointer.y, 'waterdrop');
            waterdrop
            .setBounce(0.03)
            .setScale(0.15)
            .setCollideWorldBounds(false)
            
        
            this.physics.add.collider(waterdrop, this.realLog);
            this.physics.add.overlap(waterdrop, this.realLog, () => addProgress(waterdrop), undefined, this)
            
        }, this);

    }
    startHarvesting()
    {
        !this.isTextDone ? this.isTextDone : !this.isTextDone;
        //disable waterdroplets when progress is done
        this.input.removeAllListeners();
        const harvestText = this.createTextBox();

        this.time.delayedCall(2000, () => {
            harvestText.start('よくやったわ！\f\nキノコを収穫するためには、キノコが成長するのを待たなければなりません。\f\nタイマーが切れるのを待ちましょう。タイマーが終わったら、クリックしてキノコを収穫しましょう。', 20);
            // English:
            // Nice work! Now we must wait for our mushrooms to grow in order to harvest them. Lets wait for the timer to go down. And once that is over, click to harvest the mushrooms
            if(this.isTextDone){
                this.tutorialTimerText = this.add.text(10, 40, 'Time Remaining: ', {
                    color: '#FFFFFF', fontSize: 20, fontFamily: 'Arial Black',
                }).setDepth(200);
                this.tutorialTimerHarvest = this.time.delayedCall(7000, () => {
                    this.isMushroomDone = true;
                    this.mushroomGrowth();
                })
            };
            
        })
        
    }
    mushroomGrowth(){
        console.log('pop')
    }
    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
