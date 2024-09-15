import { Dispatch, forwardRef, SetStateAction, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';

export interface IRefPhaserGame
{
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps
{
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
    setUserCoins: Dispatch<SetStateAction<number | 0>>;
    setUserMushrooms: Dispatch<SetStateAction<number | 0>>;
    setUserCards: Dispatch<SetStateAction<string []>>;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene, setUserCoins, setUserMushrooms, setUserCards}, ref)
{
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() =>
    {
        if (game.current === null)
        {

            game.current = StartGame("game-container");

            if (typeof ref === 'function')
            {
                ref({ game: game.current, scene: null });
            } else if (ref)
            {
                ref.current = { game: game.current, scene: null };
            }

        }

        return () =>
        {
            if (game.current)
            {
                game.current.destroy(true);
                if (game.current !== null)
                {
                    game.current = null;
                }
            }
        }
    }, [ref]);

    useEffect(() =>
    {
        EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) =>
        {
            if (currentActiveScene && typeof currentActiveScene === 'function')
            {

                currentActiveScene(scene_instance);

            }

            if (typeof ref === 'function')
            {
                ref({ game: game.current, scene: scene_instance });
            } else if (ref)
            {
                ref.current = { game: game.current, scene: scene_instance };
            }
            
        });
        return () =>
        {
            EventBus.removeListener('current-scene-ready');
        }
    }, [currentActiveScene, ref]);

    //update coins when card back bought
    useEffect(() => {
        EventBus.on('card pack bought', (coins: number) => {
            setUserCoins(coins);
        })
    }, [currentActiveScene, ref]);

    //update user inventory after card pack bought
    useEffect(() => {
        EventBus.on('inventory updated', (userInventory: string[]) => {
            setUserCards(userInventory);
        })
    }, [currentActiveScene, ref]);

    //update user inventory and coins after card sold
    useEffect(() => {
        EventBus.on('card sold',(userInventory: string[], coins: number) => {
            setUserCards(userInventory);
            setUserCoins(coins);
        })
    }, [currentActiveScene, ref])

    //update when mushroom exchanged
    useEffect(() => {
        EventBus.on('currency updated', (newMushroomCount: number, newCoinCount: number) => {
            setUserCoins(newCoinCount);
            setUserMushrooms(newMushroomCount);
        })
    }, [currentActiveScene, ref]);

    //update when user picks mushrooms
    useEffect(() => {
        EventBus.on('mushroom added', (currentMushrooms: number) => {
            
            setUserMushrooms(currentMushrooms);
        })
    }, [currentActiveScene, ref]);

    return (
        <div id="game-container"></div>
    );

});
