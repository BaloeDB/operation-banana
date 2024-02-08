import { useEffect, useRef, useState } from "react";

function MonkeyRun() {
  const JUMP_KEY = " ";
  const KEY_DOWN_EVENT = "keydown";
  const KEY_UP_EVENT = "keyup";
  const FLOOR_Y = 0;
  const DELTA_TIME = 0.01;
  const GRAVITY = 10;
  const JUMP_VEL = 5;
  const FALL_SPEED = 3;
  const PIXELS_PER_METER = 100;
  const GAME_SPEED_START = 0.9;
  const GAME_SPEED_MAX = 2;
  const GAME_SPEED_INCREASE = 0;

  const [playing, setPlaying] = useState<boolean>(false);
  const [lastFrameTime, setLastFrameTime] = useState<number>(0);
  const [bananas, setBananas] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(GAME_SPEED_START);
  const [holdingJump, setHoldingJump] = useState(false);
  const [spawnTimer, setSpawnTimer] = useState(1);
  const [entities, setEntities] = useState<Entity[]>([
    {
      player: true,
      id: -1,
      icon: "🐒",
      w: 0.5,
      h: 0.5,
      x: 1,
      y: 0,
      yVel: 0,
    },
  ]);

  // Initialize
  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === JUMP_KEY && !holdingJump) {
        jump();
      }
    };

    const keyUpListener = (event: KeyboardEvent) => {
      if (event.key === JUMP_KEY) setHoldingJump(false);
    };

    addEventListener(KEY_DOWN_EVENT, keyDownListener);
    addEventListener(KEY_UP_EVENT, keyUpListener);

    return () => {
      removeEventListener(KEY_DOWN_EVENT, keyDownListener);
      removeEventListener(KEY_UP_EVENT, keyUpListener);
    };
  }, []);

  let frameId: any;

  // Game timer
  useEffect(() => {
    const frame = (time: number) => {
      const deltaTime = (time - lastFrameTime) / 1000;
      setLastFrameTime(time);

      if (!playing) return;

      // Position entities and remove old ones
      setEntities((old) => {
        old.forEach((entity) => {
          entity.yVel = Math.max(
            -FALL_SPEED,
            entity.yVel - GRAVITY * DELTA_TIME
          );
          entity.y = Math.max(FLOOR_Y, entity.y + entity.yVel * DELTA_TIME);
          if (!entity.player) entity.x = entity.x - gameSpeed * DELTA_TIME;
        });

        return old.filter(
          (entity) =>
            entity.x > 0 &&
            !entities.some(
              (other) => other != entity && checkOverlap(entity, other)
            )
        );
      });

      // Increase game speed
      setGameSpeed((old) =>
        Math.min(old + GAME_SPEED_INCREASE * DELTA_TIME, GAME_SPEED_MAX)
      );

      // Spawn
      setSpawnTimer((old) => old - DELTA_TIME);
      if (spawnTimer <= 0) {
        setSpawnTimer(2 * gameSpeed);
        spawnEntity({
          player: false,
          id: entities.length,
          icon: "🌵",
          x: 7,
          y: FLOOR_Y,
          w: 0.5,
          h: 0.5,
          yVel: 0,
        });
      }

      // Start new frame
      frameId = requestAnimationFrame(frame);
    };

    // Begin game loop
    frameId = requestAnimationFrame(frame);

    // Clear loop on destroy
    return () => cancelAnimationFrame(frameId);
  }, [lastFrameTime, entities]);

  const checkOverlap = (a: Entity, b: Entity) => {
    let overlaps =
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    if (overlaps) console.log("Overlap!");
    return overlaps;
  };

  const jump = () => {
    const monkey = entities.find((e) => e.player)!;

    if (monkey.y < FLOOR_Y + 0.1) {
      monkey.yVel = JUMP_VEL;
      setHoldingJump(true);
    }

    setPlaying(true);
  };

  const spawnEntity = (entity: Entity) => {
    setEntities((old) => [...old, entity]);
  };

  return (
    <>
      <div
        className="h-64 border border-solid relative overflow-hidden select-none"
        onClick={jump}
      >
        {/* Play button */}
        {!playing && (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-5xl">▶️</div>
          </div>
        )}

        {/* Entities */}
        {entities.map((entity, index) => (
          <div
            key={index}
            className="absolute text-5xl"
            style={{
              position: "absolute",
              bottom: `${entity.y * PIXELS_PER_METER}px`,
              left: `${entity.x * PIXELS_PER_METER}px`,
            }}
          >
            {entity.icon}
          </div>
        ))}
      </div>
    </>
  );
}

class Entity {
  public id: number = 0;
  public icon: string = "monkey";
  public w: number = 0.5;
  public h: number = 0.5;
  public x: number = 0;
  public y: number = 0;
  public yVel: number = 0;
  public player = false;
}

export default MonkeyRun;
