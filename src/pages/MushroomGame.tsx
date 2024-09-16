import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame';
import { auth , db} from "../firebase.ts";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Auth from '../game/Authentication.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import { EventBus } from '../game/EventBus.ts';

function MushroomGame() {
    const [user, setUser] = useState<string | any>(null);
    const [userCoins, setUserCoins] = useState<number | 0>(0);
    const [userMushrooms, setUserMushrooms] = useState<number | 0>(0);
    const [userCards, setUserCards] = useState<string []>([]);
    const [userTutorial, setUserTutorial] = useState<boolean>(false);
    const [previousData, setPreviousData] = useState<any>(null); // Store previous game data
    const [documentData, setDocumentData] = useState<any>({});

    // authenticate 
    useEffect(() => {
        inventory();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [ userCoins,userCards,userMushrooms, userTutorial]);

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
                EventBus.emit('logged in', data.coins, data.mushrooms, data.cards, data.tutorialFinished)
            } else {
                const defaultData = {
                    coins: 0,
                    mushroom: 0,
                    cards: [],
                    tutorialFinished: false
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
                } else {
                }
            } else {
                // Document does not exist, create new document
                await setDoc(docRef, currentData);
            }
        } catch (error) {
            console.error('error fetching or updating:', error);
        }
    }
    
    const inventory = () => {
        let userInventory = {
            coins: userCoins,
            mushrooms: userMushrooms,
            cards: userCards,
            tutorialFinished: userTutorial
        }
    //    let data =  Object.assign({}, userInventory, previousData);
       setDocumentData(userInventory);
    } 
    
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
  
    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        canMoveSprite;
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
        
        <div id="game-container" className='w-full flex align-center m-12 mx-auto justify-center'>

            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} 
                setUserCoins={setUserCoins}
                setUserMushrooms={setUserMushrooms}
                setUserCards={setUserCards}
                setUserTutorial={setUserTutorial}
            />

            <div>
               
            </div>
        </div>
        </>
    )
}

export default MushroomGame
