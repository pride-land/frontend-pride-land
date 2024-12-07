import { Scene } from 'phaser';
export declare class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText: Phaser.GameObjects.Text;
    constructor();
    create(): void;
    changeScene(): void;
}
