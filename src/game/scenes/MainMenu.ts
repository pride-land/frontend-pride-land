import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';
import { TextButton } from '../game-objects/text-button';

export class MainMenu extends Scene
{
    //set types here
    background: GameObjects.Image;
    logo: GameObjects.Image;
    startButton: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'shitake');
        this.logo.setScale(0.5);

        // on click display particles; anonymous function 2nd argument
        this.input.on('pointerdown',  (pointer: MouseEvent) => {
            this.add.particles(pointer.x, pointer.y, 'star', {
                speed: 100,
                duration: 10,
                scale: { start: 0.5, end: 0 },
            })
        }, this)
        
        this.startButton = new TextButton(this, 512, 600, 'Start Game!', {
            color: '#305658', fontSize: 30, fontFamily: 'Arial Black',
            align: 'center',
            stroke: '#FFFFFF', strokeThickness: 10
        }, () => this.changeScene()).setOrigin(0.45);

        this.add.existing(this.startButton)

        // this.title = this.add.text(512, 460, 'ほほ', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5).setDepth(100);

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }
        this.cameras.main.fadeOut(1500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            //stay in black for 1 second
            this.time.delayedCall(1000, () => {
                this.scene.start('Game', { fadeIn: true });  //just passing in data to see how passing data works between scenes
            });
        });
    }

    moveLogo (vueCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        } 
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                // y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback)
                    {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
