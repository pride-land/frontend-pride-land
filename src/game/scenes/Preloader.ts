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
        this.load.image('max', 'max.png');
        this.load.image('exchangebg', 'exchangebg.png');
        this.load.image('mute', 'mute.png');
        this.load.image('exitbutton', 'exitbutton.png');
        this.load.image('exitmushroom', 'exitmushroom.png');
        //cards
        this.load.image('greencard01', 'cardAssets/greenCards/green01.png');
        this.load.image('greencard02', 'cardAssets/greenCards/green02.png');
        this.load.image('greencard03', 'cardAssets/greenCards/green03.png');
        this.load.image('greencard04', 'cardAssets/greenCards/green04.png');
        this.load.image('greencard05', 'cardAssets/greenCards/green05.png');
        this.load.image('greencard06', 'cardAssets/greenCards/green06.png');
        this.load.image('greencard07', 'cardAssets/greenCards/green07.png');
        this.load.image('greencard08', 'cardAssets/greenCards/green08.png');

        this.load.image('bluecard01', 'cardAssets/blueCards/blue01.png');
        this.load.image('bluecard02', 'cardAssets/blueCards/blue02.png');
        this.load.image('bluecard03', 'cardAssets/blueCards/blue03.png');
        this.load.image('bluecard04', 'cardAssets/blueCards/blue04.png');
        this.load.image('bluecard05', 'cardAssets/blueCards/blue05.png');
        this.load.image('bluecard06', 'cardAssets/blueCards/blue06.png');
        this.load.image('bluecard07', 'cardAssets/blueCards/blue07.png');
        this.load.image('bluecard08', 'cardAssets/blueCards/blue08.png');

        this.load.image('yellowcard01', 'cardAssets/yellowCards/yellow01.png');
        this.load.image('yellowcard02', 'cardAssets/yellowCards/yellow02.png');
        this.load.image('yellowcard03', 'cardAssets/yellowCards/yellow03.png');
        this.load.image('yellowcard04', 'cardAssets/yellowCards/yellow04.png');
        this.load.image('yellowcard05', 'cardAssets/yellowCards/yellow05.png');
        this.load.image('yellowcard06', 'cardAssets/yellowCards/yellow06.png');
        this.load.image('yellowcard07', 'cardAssets/yellowCards/yellow07.png');
        this.load.image('yellowcard08', 'cardAssets/yellowCards/yellow08.png');
        this.load.image('yellowcard09', 'cardAssets/yellowCards/yellow09.png');
        this.load.image('yellowcard10', 'cardAssets/yellowCards/yellow10.png');
        this.load.image('yellowcard11', 'cardAssets/yellowCards/yellow11.png');
        this.load.image('yellowcard12', 'cardAssets/yellowCards/yellow12.png');
        this.load.image('yellowcard13', 'cardAssets/yellowCards/yellow13.png');
        this.load.image('yellowcard14', 'cardAssets/yellowCards/yellow14.png');
        this.load.image('yellowcard15', 'cardAssets/yellowCards/yellow15.png');
        this.load.image('yellowcard16', 'cardAssets/yellowCards/yellow16.png');

        this.load.image('redcard01', 'cardAssets/redCards/red01.png');
        this.load.image('redcard02', 'cardAssets/redCards/red02.png');
        this.load.image('redcard03', 'cardAssets/redCards/red03.png');
        this.load.image('redcard04', 'cardAssets/redCards/red04.png');
        this.load.image('redcard05', 'cardAssets/redCards/red05.png');
        this.load.image('redcard06', 'cardAssets/redCards/red06.png');
        this.load.image('redcard07', 'cardAssets/redCards/red07.png');
        this.load.image('redcard08', 'cardAssets/redCards/red08.png');
        this.load.image('redcard09', 'cardAssets/redCards/red09.png');
        this.load.image('redcard10', 'cardAssets/redCards/red10.png');
        this.load.image('redcard11', 'cardAssets/redCards/red11.png');
        //audio
        this.load.audio('exchange', 'sounds/exchange.mp3');
        this.load.audio('cardPurchase', 'sounds/cardPurchase.mp3');
        this.load.audio('rarecard', 'sounds/rarecardboom.mp3');
        this.load.audio('commoncard', 'sounds/commoncardboom.mp3');
        this.load.audio('error', 'sounds/error.mp3');
        this.load.audio('shopbell', 'sounds/shopbell.mp3');
        this.load.audio('mushroomsong', 'sounds/mushroomsong.mp3');
        this.load.audio('pop1', 'sounds/pop1.mp3');
        this.load.audio('pop2', 'sounds/pop2.mp3');
        this.load.audio('pop3', 'sounds/pop3.mp3');
        this.load.audio('pop4', 'sounds/pop4.mp3');
        this.load.audio('waterdrop', 'sounds/waterdrop.mp3');
        this.load.audio('mushroomgrow', 'sounds/mushroomgrow.mp3');
        this.load.audio('pageflip', 'sounds/pageflip.mp3');
        this.load.audio('owlhoot', 'sounds/owlhoot.mp3');

    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
