import { Scene } from "phaser";

export class TextButton extends Phaser.GameObjects.Text {
    constructor(scene: Scene, x: number , y: number, text: string, style: Phaser.Types.GameObjects.Text.TextStyle, callback: any) {
        //super ensures that the parent class constructor is called before doing anything specific
        super(scene, x, y, text, style);

        this.setInteractive()
            .on('pointerover', () => this.hoverStartButton())
            .on('pointerout', () => this.restStateStartButton())
            .on('pointerdown', () => this.pointerDownStartButton())
            .on('pointerup', () => {
                this.hoverStartButton();
                callback();
            })
    }

    hoverStartButton = () => {
        this.setStyle({
            fill: '#2B673B',
            stroke: '#F8EE53'
        });
        
    };
    
    restStateStartButton = () => {
        this.setStyle({ 
            fill: '#305658',
            stroke: '#FFF'
        });
    };

    pointerDownStartButton = () => {
        this.setStyle({ 
            fill : '#F8EE53',
            stroke: '#2B673B'
        })
    };
}
