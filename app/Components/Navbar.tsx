// "use client";

// import Link from "next/link";
// import { ShoppingCart, Search, User } from "lucide-react";
// import { useState } from "react";

// export default function Navbar() {
//   const [cartCount] = useState<number>(2);

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold text-indigo-600">
//             ShopVerse
//           </Link>

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3 text-black shadow shadow-black">
//             <Search size={18} className=" " />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="bg-transparent outline-none px-2 w-full text-sm "
//             />
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-6">
//             {/* Login */}
//             <Link
//               href="/login"
//               className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition"
//             >
//               <User size={18} />
//               Login
//             </Link>

//             {/* Cart */}
//             <Link href="/cart" className="relative">
//               <ShoppingCart
//                 size={22}
//                 className="text-gray-700 hover:text-indigo-600 transition"
//               />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div className="md:hidden pb-3">
//           <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 text-black">
//             <Search size={18} className="" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="bg-transparent outline-none px-2 w-full text-sm"
//             />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-white tracking-wide"
          >
            DarkShop
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 w-1/3">
            <Search size={18} className="text-gray-300" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none px-2 w-full text-sm text-white placeholder-gray-400"
            />
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/login"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
              <User size={18} />
              Login
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingCart
                size={22}
                className="text-gray-300 hover:text-white transition"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2">
              <Search size={18} className="text-gray-300" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none px-2 w-full text-sm text-white placeholder-gray-400"
              />
            </div>

            <Link
              href="/login"
              className="block text-gray-300 hover:text-white"
            >
              Login
            </Link>

            <Link href="/cart" className="block text-gray-300 hover:text-white">
              Cart ({cartCount})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
