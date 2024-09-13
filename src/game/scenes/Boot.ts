import { Scene } from 'phaser';
export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        // Core assets (Stored user side)
        this.load.image('background', 'assets/bg.png');
        this.load.image('shitakelogo', 'assets/shitakelogo.png')
        this.load.image('shed', 'assets/shed.webp');

        // Local environment assets (To be replaced with backend paths to the assets hosted in the backend database later)
        // this.load.image('log', 'assets/temp/log.png');
        // this.load.image('cardshopicon', 'assets/temp/cardshopicon.png');
        // this.load.image('exchangeshopicon', 'assets/temp/exchangeshopicon.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
