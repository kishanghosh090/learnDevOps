"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
}

export function ProductCard({ image, name, price }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-64 w-full">
        <Image
          src={"https://dyr8o0kvcn13j.cloudfront.net/" + image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{name}</h2>

        <p className="mt-2 text-xl font-bold text-green-600">
          ₹{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
export default function Home() {
  const [products, setProducts] = useState<
    { fileName: string; price: number; name: string }[]
  >([]);
  useEffect(() => {
    async function fetch() {
      const res = await axios.get("http://127.0.0.1:5003/products");
      setProducts(res.data);
    }
    fetch();
  }, []);
  return (
    <div className="h-screen  bg-neutral-950">
      <Link href={"./create"} className="text-amber-50">
        create Form for s3
      </Link>
      {products.length != 0 ? (
        <div>
          {products.map((item, idx) => (
            <ProductCard
              image={item.fileName!!}
              price={item.price}
              key={idx}
              name={item.name}
            />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
