import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?keyword=${search}`)
      .then(res => setProducts(res.data));
  }, [search]);

  return (
    <>
      <input
        placeholder="Search products"
        onChange={e => setSearch(e.target.value)}
      />

      {products.map(p => (
        <div key={p._id}>
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
        </div>
      ))}
    </>
  );
}
