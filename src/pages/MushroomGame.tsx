import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame';
import { MainMenu } from '../game/scenes/MainMenu';
import { auth , db} from "../firebase.ts";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Auth from '../game/Authentication.tsx';
import { onAuthStateChanged } from 'firebase/auth';

function MushroomGame() {
    const [user, setUser] = useState<string | any>(null);
    const [userCoins, setUserCoins] = useState<number | 0>(0);
    const [userMushrooms, setUserMushrooms] = useState<number | 0>(0);
    const [userCards, setUserCards] = useState<string []>([]);
    // const [gameData, setGameData] = useState();
    // const [fetchedData, setFetchedData] = useState();
    // const [data, setData] = useState();
    const [previousData, setPreviousData] = useState<any>(null); // Store previous game data
    const [documentData, setDocumentData] = useState<any>({});

    // authenticate 
    useEffect(() => {
        inventory();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [ userCoins,userCards,userMushrooms]);

    // fetch and update game data on login
    useEffect(() => {
        if (user) {
            fetchData(user);
        }
    }, [user]);

    // fetch game data from db
    async function fetchData(user: any) {
        try {
            const docRef = doc(db, 'game-data', user.uid);
            const docSnap = await getDoc(docRef); //get request from db

            if (user && docSnap.exists()) {
                const data = docSnap.data();
                setDocumentData(data);
                setPreviousData(data); // Initialize previousData with fetched data
            } else {
                const defaultData = {
                    coins: 0,
                    mushroom: 0,
                    cards: [],
                };
                // default state if guest
                setDocumentData(defaultData);
                setPreviousData(defaultData); // Initialize previousData with default data
            }
        } catch (error) {
            console.error('Error fetching document:', error);
        } 
    }

    // auto-save game
    useEffect(() => {
        if (!user || !documentData) return; // user is authenticated and data is available

        const autoSaveInterval = 5000; // save interval in ms.
        const intervalId = setInterval(() => {
            if (previousData && JSON.stringify(previousData) !== JSON.stringify(documentData)) {
                fetchAndUpdateGameProgress(user.uid, documentData);
                setPreviousData(documentData); // update previousData after saving
            }
        }, autoSaveInterval);

        return () => clearInterval(intervalId); 
    }, [user, documentData, previousData]);

    // fetch and update data
    async function fetchAndUpdateGameProgress(userId: string, currentData: any) {
        try {
            const docRef = doc(db, 'game-data', userId);

            // Fetch the existing document
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Document exists, check if there's a difference
                const existingData = docSnap.data();

                // Compare existingData with currentData
                if (JSON.stringify(existingData) !== JSON.stringify(currentData)) {
                    // Data has changed, update with new data
                    await updateDoc(docRef, currentData, { merge: false }); // update request to db
                    console.log('Game progress updated!');
                } else {
                    console.log('No changes detected');
                }
            } else {
                // Document does not exist, create new document
                await setDoc(docRef, currentData);
                console.log('New game');
            }
        } catch (error) {
            console.error('error fetching or updating:', error);
        }
    }
    
    const inventory = () => {
        let userInventory: any = {
            coins: userCoins,
            mushrooms: userMushrooms,
            cards: userCards
        }
    //     console.log(userInventory)
    //    let data =  Object.assign({}, userInventory, previousData);
       setDocumentData(userInventory);
    } 
    
    console.log('current',documentData)
    console.log('fetched',previousData)


    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {

        if(phaserRef.current)
        {     
            const scene = phaserRef.current.scene as MainMenu;
            
            if (scene)
            {
                scene.changeScene();
            }
        }
    }

    const moveSprite = () => {

        if(phaserRef.current)
        {

            const scene = phaserRef.current.scene as MainMenu;

            if (scene && scene.scene.key === 'MainMenu')
            {
                // Get the update logo position
                scene.moveLogo(({ x, y }) => {

                    setSpritePosition({ x, y });

                });
            }
        }

    }

    const addSprite = () => {

        if (phaserRef.current)
        {
            const scene = phaserRef.current.scene;

            if (scene)
            {
                // Add more stars
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);
    
                //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
                const star = scene.add.sprite(x, y, 'star');
    
                //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
                //  You could, of course, do this from within the Phaser Scene code, but this is just an example
                //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
                scene.add.tween({
                    targets: star,
                    duration: 500 + Math.random() * 1000,
                    alpha: 0,
                    yoyo: true,
                    repeat: -1
                });
            }
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        
    }

    return (
        <>
        <div>
            {user ? (
                <div className='flex justify-between mx-5 my-2'>
                    <h1 className='font-thin font-roboto'>Welcome, {user.name || user.email}</h1>
                    <button className='bg-gray-400 rounded-md p-1' onClick={() => auth.signOut()}>Sign Out</button>
                </div>
            ) : (<Auth />)}
        </div>
        
        <div id="game-container" className='w-full flex align-center m-12 mx-auto'>
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} 
                setUserCoins={setUserCoins}
                setUserMushrooms={setUserMushrooms}
                setUserCards={setUserCards}
            />

            <div>
                <div>
                    <button className="button" onClick={changeScene}>Change Scene</button>
                </div>
                <div>
                    <button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</button>
                </div>
                <div className="spritePosition">Sprite Position:
                    <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
                </div>
                <div>
                    <button className="button" onClick={addSprite}>Add New Sprite</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default MushroomGame
