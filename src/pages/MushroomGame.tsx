import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame';
import { MainMenu } from '../game/scenes/MainMenu';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.ts";
import Auth from '../game/Authentication.tsx';

function MushroomGame() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          setUser(authUser);
        }); 
    
        return () => unsubscribe();
      }, []);

    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

      // Signing in with Google using Popup
  const signInWithGooglePopup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      return response;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

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
        <Auth />
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >
      <h1>Firebase Authentication</h1>
      <br />
      <h4>{user ? user.displayName : "Not signed in"}</h4>
      <button onClick={signInWithGooglePopup}>Sign in With Google</button> </div>
        
        <div id="game-container" className='w-full flex align-center m-12 mx-auto'>
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
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
