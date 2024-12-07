import { Dispatch, SetStateAction } from 'react';
export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}
interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
    setUserCoins: Dispatch<SetStateAction<number | 0>>;
    setUserMushrooms: Dispatch<SetStateAction<number | 0>>;
    setUserCards: Dispatch<SetStateAction<string[]>>;
    setUserTutorial: Dispatch<SetStateAction<boolean>>;
}
export declare const PhaserGame: import("react").ForwardRefExoticComponent<IProps & import("react").RefAttributes<IRefPhaserGame>>;
export {};
