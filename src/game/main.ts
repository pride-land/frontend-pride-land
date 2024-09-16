import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { Exchange } from './scenes/Exchange';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { CardShop } from './scenes/CardShop';
import { Inventory } from './scenes/Inventory';
//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        Exchange,
        CardShop,
        Inventory
    ],
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }],
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    dom: {
        createContainer: true,
    }
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}
// function calculateScreenSize () {
//     const xSize = window.innerWidth - 30;
//     const ySize = window.innerHeight - 30;
//     return {xSize, ySize}
// }
export default StartGame;
