# 🌻 Project-Pride-Land

## 🐐 Goal
This is the front-end repository for our project Pride Farm! Our mission is to assist the farm NPO ぷらいどらんど in making a website for its community:
a place where everyone can come together and particpate in farming regardless of their health conditions.

## 💬 Mission
We aim to clearly express what ぷらいどらんど stands for and ensure that its message of companionship, acceptance, and community is conveyed. Additionally, we strive to make this website easy for the NPO staff to maintain and understand.

## 💻 Built with:

Our Front-End Tech stack: <br>

```
• React-Vite
• Typescript
• TailwindCSS
• PHASER
``` 
# 👷 Contributing
Make sure to clone our repo, and fill out the information in the PR message template! If you have any questions feel free to reach out to any of our members.

# 🔧 Setting up Development

Here's a quick guide and run down on how to setup the environment and start contributing to the project.

### Prerequisites
```
• Node / NPM
```
### Nice to Have
```
• VS Code extensions for React and Tailwind, such as Tailwind CSS IntelliSense
```

### Initial Setup:

```
# install dependencies
$ npm install

# run the development server with hot-reloading on localhost:5173 
$ npm run dev
```

# 📁 Folder Structure

### public
* contains assets and pictures used throught various parts of the webapp
    * **/assets** : contains all the assets utilized in our Phaser game
### src
* holds all of our pages, components, the game and webapp itself, etc.
    * **/admin**: contains everything related to our admin page
        * <ins>/admin-api</ins>: contains our fetches for the admin side
        * <ins>/admin-authContext</ins>: code to ensure routes are protected
        * <ins>/admin-components</ins>: components utilized for the admin page
        * <ins>/admin-interface</ins>: holds all types throughout this folder
        * <ins>/admin-pages</ins>: contains all the pages of admin end
        * <ins>/admin-utils</ins>: ensure navigation to this part of the webapp thru private routing
    * **/api**: holds all fetches for the user-end portion of the webapp
    * **/components**: contains folders for components used in various pages of the user-end
        * <ins>/blogComponents</ins>: components used in the blogs page
        * <ins>/homeComponents</ins>: components used in the index
        * <ins>/volunteerComponents</ins>: components used in the volunteer sign-up page
    * **/game**: please read below for further details
    * **/i18n/locales**: contains .json files that have translations for all words on the website
    * **/interfaces**: holds all types throughout user-end files
    * **/pages**: contains all pages of user-end
    * **App.tsx**: has all routes needed to reach different parts of the web app

# 👾 Getting involved with the game

**Disclaimer** : it is very important you look at the <a href="https://newdocs.phaser.io/docs/3.85.2">Phaser Documentation</a> in order to contribute.
## 🤔 Why is there a game in the first place?

### The Problem
One of ぷらいどらんど 's missions is to highlight inclusivity at the farm, but unfortunately due to the circumstances in Japan, it is very difficult
to have batches of farmland that are all right next to each other. One of their biggest harvests are Shiitake mushrooms, but it is in a location that is very difficult to reach for a person with a mobility impairment.

### Our solution
We wanted to create a game that mimics the process of growing and harvesting Shiitake mushrooms, giving everyone an engaging experience while also allowing players to learn about the farm.

## 🎲 The gameplay loop
1. Water the log by tapping/pressing on the screen to fill up the bar
2. Wait a couple seconds so that the mushrooms can grow
3. Harvest them by pressing/dragging the mushrroms off the branch
4. Sell mushrooms in the Exchange shop (price change after a certain amount of time) for gold
5. Use gold to buy card packs which contain neat pictures and descriptions of the farm

## 🍄 Understanding whats going on and and how to begin
Make sure that you navigate to ``src/game/scenes``. This is where the actual code for the game is. Here you will see various "scenes" for the game, and most features are done in ``Game.ts``.
* **Boot.ts**: load assets for Preloader, such as logo/background; leads to ``PreLoader``
* **Preloader.ts**: loads assets for the game; leads to ``MainMenu``
* **MainMenu.ts**: title screen for the game; initializes ``Game``
* **Game.ts**: the main game scene where the action happens
* **Exchage.ts**: holds the exchange shop to trade mushrooms for gold
* **CardShop.ts**: holds the shop to buy cardpacks with gold
* **Inventory.ts**: displays all of the players cards; they can look at them closely and sell

#### For development, its best to change various variables to lower numbers for convenience.
* For example, changing ``this.waterFillProgressBar.width += 16`` to ``this.waterFillProgressBar.width += 230``.

### Adding a new asset
Make sure to add the file to ``public/assets`` and to add the file to ``game/scenes/preloader.ts``.
```
# adding a image that can be referred in the game code as 'logo' 
this.load.image('logo', 'logo.png')
```

### Interacting with React
Phaser has a thing called ``EventBus``, and this can be used to send signals. Which means that you can make a function that does something somewhere else in the webapp when said signal is received. <br>
Knowing this, we are able to bridge a connection between the phaser game itself and react with ``useEffects``.

```
# Send signal from Game.ts to say user has finished tutorial

EventBus.emit('tutorial finished')

# update state when user finishes tutorial in PhaserGame.tsx
# setUserTutorial is a setState prop from MushroomGame.tsx

useEffect(() => {
    EventBus.on('tutorial finished', () => {
        setUserTutorial(true);
    })
}, [currentActiveScene, ref]);
```

* **PhaserGame.tsx** is the container that holds the game while ``MushroomGame.ts``, in ``src/pages`` is the page that holds said game, along with the user login. 
* Studying these two files will help you understand how the game can interact with React.
