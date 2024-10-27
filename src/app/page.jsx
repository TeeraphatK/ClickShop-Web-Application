"use client";

//การนำเข้าโมดูล
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar/nav";
import Footer from "../components/footer/footer"; 

export default function Home() {
  //สถานะ (State)
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // สถานะสำหรับการค้นหา
  const [cart, setCart] = useState([]); // สถานะสำหรับตะกร้า

  //ฟังก์ชันดึงข้อมูลผลิตภัณฑ์
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      
      if (res.ok) {
        setProducts(data.products);
      } else {
        throw new Error("Failed to fetch data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //การใช้ useEffect
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // ฟังก์ชันกรองผลิตภัณฑ์ตามคำค้นหา
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ฟังก์ชันเพิ่มผลิตภัณฑ์ลงในตะกร้า
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some(item => item.id === product.id);
      if (!isProductInCart) {
        alert(`${product.title} ได้ถูกเพิ่มไปยังตะกร้า!`);
        return [...prevCart, product];
      } else {
        alert(`${product.title} มีอยู่ในตะกร้าแล้ว!`);
        return prevCart;
      }
    });
  };

  //การเรนเดอร์ส่วนของ UI
  return (
    <>
      <Navbar cartItems={cart} setCart={setCart} />
      <main className="container py-6 mx-auto">
        <div className="my-4">
          <input
            type="text"
            placeholder="ค้นหาผลิตภัณฑ์..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 transition border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="p-4 transition bg-white border border-gray-300 rounded-md cursor-pointer hover:shadow-lg"
              onClick={() => addToCart(product)}
            >
              <h3 className="text-lg font-bold">{product.title}</h3>
              <Image src={product.thumbnail} alt={product.title} width={300} height={150} className="rounded-md" />
              <p className="text-gray-600">Description: {product.description}</p>
              <p className="font-medium">Brand: {product.brand}</p>
              <p className="text-gray-500">Category: {product.category}</p>
              <p className="font-semibold">
                <samp>Price: ${product.price}</samp> | <samp>Stock: {product.stock}</samp>
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
