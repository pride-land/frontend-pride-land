import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'pridelandlogo');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
        this.load.image('shitake','shitakelogo.png');
        this.load.image('log', 'log.png');
        this.load.image('exchangeshopicon', 'exchangeshopicon.png');
        this.load.image('cardshopicon', 'cardshopicon.png');
        this.load.image('waterdrop', 'waterdrop.webp');
        this.load.image('mushroom1', 'mushroom1.png');
        this.load.image('mushroom2', 'mushroom2.png');
        this.load.image('mushroom3', 'mushroom3.png');
        this.load.image('mushroom4', 'mushroom4.png');
        this.load.image('coin', 'coin.png');
        this.load.image('mushroomBook', 'mushroombookcut.png');
        this.load.image('sellicon', 'sellicon.png')
        this.load.image('inventoryBackground', 'inventoryBackground.png');
        this.load.html('mushroomForm', 'mushroomForm.html');
        this.load.image('cardshopbackground', 'cardshopbackground.png');
        this.load.image('mysterycard', 'mysterycard.png');
        this.load.image('cardback', 'cardback.png');
        this.load.image('buyicon', 'buyicon.png');
        //cards
        this.load.image('redcard01', 'cardAssets/redCards/galaxyChicken.png');
        this.load.image('greencard01', 'cardAssets/greenCards/eggsGreen.png');
        //audio
        this.load.audio('exchange', 'sounds/exchange.mp3');
        this.load.audio('cardPurchase', 'sounds/cardPurchase.mp3');
        this.load.audio('rarecard', 'sounds/rarecardboom.mp3');
        this.load.audio('commoncard', 'sounds/commoncardboom.mp3');
        this.load.audio('error', 'sounds/error.mp3');
        this.load.audio('shopbell', 'sounds/shopbell.mp3');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Game');
    }
}
