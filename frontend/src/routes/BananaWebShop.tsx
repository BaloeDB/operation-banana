import axios from "axios";
import { useEffect, useState } from "react";
import Brand, { emptyBrand } from "./BrandInterface";

function BananaWebShop() {
  const [id, setId] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [count, setCount] = useState<number>(0);
  const [brands, setBrands] = useState<Brand[]>([emptyBrand]);

  const fetchData = async () => {
    const getBrands = await axios.get(
      "http://localhost:8080/api/v1/banana/brands"
    );

    setBrands(getBrands.data);

    const createBanana = await axios.post(
      "http://localhost:8080/api/v1/banana/admin/create",
      {
        brandId: id,
        weight: weight,
      }
    );

    console.log(weight);
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const handleFormSubmit = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div
        style={{
          color: "yellow",
        }}
      >
        <form
          onSubmit={(e) => {
            handleFormSubmit();
            e.preventDefault();
          }}
        >
          <label>input weight </label>
          <input type="number" onChange={(e) => setWeight(+e.target.value)} />
          <br />
          <label>brand: </label>
          <select>
            <option />
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          <br />
          <button type="submit">submit</button>
        </form>
        <p>Welcome to Banana Shop</p>
      </div>
    </>
  );
}

export default BananaWebShop;
