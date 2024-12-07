import { Scene } from "phaser";
export declare class TextButton extends Phaser.GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, text: string, style: Phaser.Types.GameObjects.Text.TextStyle, callback: any);
    hoverStartButton: () => void;
    restStateStartButton: () => void;
    pointerDownStartButton: () => void;
}
