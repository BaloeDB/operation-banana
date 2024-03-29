import { useEffect, useState } from "react";
import banana from "/src/assets/banana.svg";
import ClickerOwned from "../domain/clicker-owned";
import Clicker from "../domain/clicker";
import classes from "../styling/BananaClicker.module.css";
import useBananaState from "../hooks/useBananaState";
import useInventoryState from "../hooks/useInventoryState";

function BananaClicker() {

  const [bananas, setBananas] = useBananaState("bananas");
  const [inventory, setInventory] = useInventoryState("inventory");
  const [store] = useState<Clicker[]>([
    {
      id: 0,
      emoji: "🌴",
      name: "Plantaine Plantation",
      description: "A modest banana plantation",
      clicksPerMinute: 6,
      price: 25,
    },
    {
      id: 1,
      emoji: "🏭",
      name: "Banana Factory",
      description: "This is where the banana sausage is made",
      clicksPerMinute: 120,
      price: 250,
    },
    {
      id: 2,
      emoji: "🍌",
      name: "The Big Banana",
      description: "Mama mia that's a big banana",
      clicksPerMinute: 2400,
      price: 2500,
    },
  ]);

  useEffect(() => {
    const intervalMs = 100;

    const interval = setInterval(() => {
      let bananasObtained = 0;

      inventory.forEach((c: ClickerOwned) => {
        c.elapsed += intervalMs;
        let interval = 60000 / c.clicker.clicksPerMinute;
        while (c.elapsed > interval) {
          c.elapsed -= interval;
          bananasObtained++;
        }
      });

      setBananas(bananas + bananasObtained);
    }, intervalMs);

    // Cleanup
    return () => clearInterval(interval);
  }, [inventory, bananas]);

  const click = () => {
    setBananas(bananas + 1);
  };

  const buyClicker = (clicker: Clicker) => {
    if (!canAfford(clicker)) return;

    setBananas(bananas - clicker.price);

    setInventory([...inventory,
      {
        clicker,
        elapsed: 0,
      },
    ]);
  };

  const getOwnedQuantity = (clicker: Clicker): number => {
    return inventory.filter((c: ClickerOwned) => c.clicker === clicker).length;
  };

  const canAfford = (clicker: Clicker) => {
    return clicker.price <= bananas;
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative">
          <button className={classes.BButton}>
            <img
              src={banana}
              alt="banana"
              width="150px"
              height="150px"
              onClick={(e) => {
                e.preventDefault();
                click();
              }}
            />
          </button>
          {inventory.map((c: ClickerOwned, index: number) => (
            <span
              className="circle-child"
              key={index}
              style={{
                transform: `rotate(${index * 10}deg) translateY(-100px)`,
              }}
            >
              {c.clicker.emoji}
            </span>
          ))}
        </div>
        <h2>{bananas}🍌</h2>
      </div>

      <h2>🏪 Store</h2>
      <div className="flex flex-col gap-2">
        {store.map((clicker: Clicker) => (
          <button
            key={clicker.id}
            disabled={!canAfford(clicker)}
            className="flex items-center gap-2 justify-between"
            onClick={() => buyClicker(clicker)}
          >
            <div className="flex flex-col items-start gap-2">
              <h3 className="m-0">
                {clicker.emoji} {clicker.name} ({getOwnedQuantity(clicker)})
              </h3>
              <span>{clicker.description}</span>
            </div>
            <span>🍌{clicker.clicksPerMinute} p/m</span>
            <span>🍌{clicker.price}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default BananaClicker;
