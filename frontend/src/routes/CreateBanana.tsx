import axios from "axios";
import { useEffect, useState } from "react";
import Brand, { emptyBrand } from "./BrandInterface";
import { Switch } from "@mui/material";

function BananaWebShop() {
  const [id, setId] = useState<number>();
  const [bananaCount, setBananaCount] = useState<number>();
  const [count, setCount] = useState<number>(0);
  const [brands, setBrands] = useState<Brand[]>([emptyBrand]);
  const [order, setOrder] = useState<boolean>(false);

  const fetchData = async () => {
    const getBrands = await axios.get(
      "http://localhost:8080/api/v1/banana/brands"
    );

    setBrands(getBrands.data);

    if (order) {
      const orderBanana = await axios.post(
        "http://localhost:8080/api/v1/banana/order/create",
        {
          brandId: id,
          amount: bananaCount,
        }
      );
    } else {
      const createBanana = await axios.post(
        "http://localhost:8080/api/v1/banana/admin/create",
        {
          brandId: id,
          amount: bananaCount,
        }
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const handleFormSubmit = () => {
    setCount(count + 1);
    console.log(`Submitted id ${id} and amount ${bananaCount}`);
    console.log(`order or create: ${order}`);
  };

  const handleSwitchChange = (e: any) => {
    setOrder(e.target.checked);
  };

  return (
    <div
      style={{
        paddingTop: "1em",
        color: "#f7ad3e",
      }}
    >
      <form
        onSubmit={(e) => {
          handleFormSubmit();
          e.preventDefault();
        }}
      >
        <label>input amount </label>
        <input
          type="number"
          onChange={(e) => setBananaCount(+e.target.value)}
        />
        <br />
        <label>brand: </label>
        <select onChange={(e) => setId(+e.target.value)}>
          <option />
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <br />
        <label>toggle on to order, off to create new bananas</label>
        <br />
        <Switch checked={order} onChange={(e) => handleSwitchChange(e)} />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default BananaWebShop;
