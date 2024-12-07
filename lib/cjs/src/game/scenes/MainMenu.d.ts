import { GameObjects, Scene } from 'phaser';
export declare class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    startButton: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;
    coins: number;
    mushrooms: number;
    cards: string[];
    tutorialFinished: boolean;
    constructor();
    create(): void;
    changeScene(): void;
    moveLogo(vueCallback: ({ x, y }: {
        x: number;
        y: number;
    }) => void): void;
}
