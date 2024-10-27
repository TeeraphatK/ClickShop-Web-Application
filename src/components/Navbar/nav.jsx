//การนำเข้าโมดูล
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";

//คอมโพเนนต์ Navbar
export default function Navbar({ cartItems = [], setCart }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //ฟังก์ชัน toggleDropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  //ฟังก์ชัน removeFromCart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };
  //ฟังก์ชัน calculateTotal
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };
  //การเรนเดอร์ UI
  return (
    <nav className="p-4 bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-xl font-bold text-white">My Store</h1>
        <div className="relative">
          <button onClick={toggleDropdown} className="text-white hover:text-gray-400">
            <ShoppingCartIcon className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-medium text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 w-64 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="p-4">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500">ไม่มีสินค้าในตะกร้า</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                        <Image src={item.thumbnail} alt={item.title} width={50} height={50} className="mr-2 rounded-md" />
                        <span className="flex-1 text-left">{item.title}</span>
                        <span>{item.price} ฿</span>
                        <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 ml-2 text-red-500 rounded hover:text-red-700">
                          ลบ
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 mt-2 font-semibold border-t">
                      <span>ยอดรวม:</span>
                      <span>{calculateTotal()} ฿</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
