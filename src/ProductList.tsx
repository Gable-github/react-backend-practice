import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("fetching products in ", category);
    setProducts(["banana", "peach"]);
  }, [category]);
  return <div></div>;
};

export default ProductList;
