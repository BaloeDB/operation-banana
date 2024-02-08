import { useEffect, useRef, useState } from "react";

function MonkeyRun() {
  const JUMP_KEYS = [" ", "w"];
  const KEY_DOWN_EVENT = "keydown";
  const KEY_UP_EVENT = "keyup";
  const FLOOR_Y = 0.3;
  const GRAVITY = 3.5;
  const JUMP_SPEED = 1.375;
  const FALL_SPEED = 1.65;
  const PIXELS_PER_METER = 100;
  const GAME_SPEED_START = 1.2;
  const GAME_SPEED_MAX = 2;
  const GAME_SPEED_INCREASE = 0;
  const JUMP_DURATION = 0.4;
  let frameId: any;

  const playing = useRef(false);
  const gameOver = useRef(false);
  const jumpTimer = useRef(0);
  const [gameSpeed, setGameSpeed] = useState<number>(0);
  const [bananas, setBananas] = useState<number>(0);
  const [lastFrameTime, setLastFrameTime] = useState<number>(0);
  const [spawnTimer, setSpawnTimer] = useState(1);
  const [entities, setEntities] = useState<Entity[]>([]);

  const startGame = () => {
    playing.current = true;
    gameOver.current = false;
    jumpTimer.current = 0;
    setGameSpeed(GAME_SPEED_START);
    setBananas(0);
    setSpawnTimer(1);
    resetEntities();
  };

  const endGame = () => {
    setEntities((old) => {
      old.find((o) => o.player)!.icon = "☠️";
      return old;
    });
    gameOver.current = true;
  };

  const resetEntities = () => {
    setEntities([
      {
        player: true,
        collision: true,
        icon: "🐒",
        w: 0.3,
        h: 0.5,
        x: 1.5,
        y: FLOOR_Y,
        yVel: 0,
      },
    ]);
  };

  // Initialize entities
  useEffect(() => {
    resetEntities();
  }, []);

  // Listen to inputs listeners
  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (JUMP_KEYS.includes(event.key)) jump(true);
    };

    const keyUpListener = (event: KeyboardEvent) => {
      if (JUMP_KEYS.includes(event.key)) jump(false);
    };

    addEventListener(KEY_DOWN_EVENT, keyDownListener);
    addEventListener(KEY_UP_EVENT, keyUpListener);

    return () => {
      removeEventListener(KEY_DOWN_EVENT, keyDownListener);
      removeEventListener(KEY_UP_EVENT, keyUpListener);
    };
  }, [entities.length]);

  // Run game logic every frame
  useEffect(() => {
    frameId = requestAnimationFrame(gameLogic);
    return () => cancelAnimationFrame(frameId);
  });

  // Game logic
  const gameLogic = (time: number) => {
    const deltaTime = (time - lastFrameTime) / 1000;
    setLastFrameTime(time);

    if (gameOver.current) return;

    // Position entities and remove old ones
    setEntities((old) => {
      for (let e = old.length - 1; e >= 0; e--) {
        const entity = old[e];

        // Player
        if (entity.player) {
          if (jumpTimer.current > 0) {
            entity.yVel = JUMP_SPEED;
          } else {
            entity.yVel = Math.max(
              -FALL_SPEED,
              entity.yVel - GRAVITY * deltaTime
            );
          }

          jumpTimer.current -= deltaTime;
          entity.y = Math.max(FLOOR_Y, entity.y + entity.yVel * deltaTime);

          // If player hits object, end game
          if (
            entities.some(
              (other) =>
                other != entity &&
                other.collision &&
                checkOverlap(entity, other)
            )
          ) {
            endGame();
          }
        }
        // Other entities
        else {
          entity.x = entity.x - gameSpeed * deltaTime;

          // If entity goes off-screen, delete
          if (entity.x < -1) old.splice(e, 1);
        }
      }

      return old;
    });

    // Increase game speed
    setGameSpeed((old) =>
      Math.min(old + GAME_SPEED_INCREASE * deltaTime, GAME_SPEED_MAX)
    );

    // Spawn cactus
    setSpawnTimer((old) => old - deltaTime);
    if (spawnTimer <= 0) {
      setSpawnTimer(2 * gameSpeed);
      spawnEntity({
        player: false,
        collision: true,
        icon: "🌵",
        x: 9,
        y: FLOOR_Y,
        w: 0.2,
        h: 0.5,
        yVel: 0,
      });

      // Spawn background object
      spawnEntity({
        player: false,
        collision: false,
        icon: "🌵",
        x: 11,
        y: FLOOR_Y + 0.2,
        w: 0.2,
        h: 0.5,
        yVel: 0,
      });
    }
  };

  const checkOverlap = (a: Entity, b: Entity) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

  const jump = (jumping: boolean) => {
    if (!playing.current || gameOver.current) startGame();

    const monkey = entities.find((e) => e.player);
    if (monkey) {
      if (jumping && monkey.y < FLOOR_Y + 0.1)
        jumpTimer.current = JUMP_DURATION;
      if (!jumping) jumpTimer.current = 0;
    }
  };

  const spawnEntity = (entity: Entity) => {
    setEntities((old) => [...old, entity]);
  };

  return (
    <>
      <div
        className="h-72 relative overflow-hidden select-none"
        onMouseDown={() => jump(true)}
        onMouseUp={() => jump(false)}
      >
        {/* Play button */}
        {!playing.current && (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-6xl">▶️</div>
          </div>
        )}

        {/* Game over screen */}
        {gameOver.current && (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-6xl">🔁</div>
          </div>
        )}

        {/* Background line */}
        <div
          className="w-full absolute bottom-11"
          style={{ border: "1px solid #b2b2b2" }}
        ></div>

        {/* Entities */}
        {entities.map((entity, index) => (
          <div
            key={index}
            className="absolute text-6xl flex justify-center items-end"
            style={{
              // background: "black",
              width: `${entity.w * PIXELS_PER_METER}px`,
              height: `${entity.h * PIXELS_PER_METER}px`,
              position: "absolute",
              bottom: `${entity.y * PIXELS_PER_METER}px`,
              left: `${entity.x * PIXELS_PER_METER}px`,
              opacity: `${entity.collision ? 1 : 0.5}`,
              zIndex: `${entity.collision ? 1 : 0}`,
            }}
          >
            <span>{entity.icon}</span>
          </div>
        ))}
      </div>
    </>
  );
}

class Entity {
  public icon: string = "monkey";
  public w: number = 0.5;
  public h: number = 0.5;
  public x: number = 0;
  public y: number = 0;
  public yVel: number = 0;
  public player = false;
  public collision = false;
}

export default MonkeyRun;
