"use client"
import React, { useEffect, useRef, useState } from "react";
import { assets} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useUserStore } from "@/Zustand/store";
import { useRouter } from "next/navigation";
import { Menu, MenuItem, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";




const Navbar = () => {
  const { name, email, isAuthenticated, logout } = useUserStore();
  const { isSeller, router } = useAppContext();
  console.log(isAuthenticated,'isAuthenticated')
  const routes = useRouter();
  const {data:session,status}=useSession()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget); 
    } else {
      routes.push("/sign-In"); 
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut=async()=>{
    await signOut({
      redirect:false,
    });
    logout();
  }





  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
 

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>



<div className="relative">
      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        <button className="flex items-center gap-2 hover:text-gray-900 transition" onClick={handleClick}>
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>

        {isAuthenticated && (
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{
            style: { width: 200 },
}}
        >
            <MenuItem onClick={() => { routes.push('/customer'); handleClose(); }}>My Account</MenuItem>
            <MenuItem onClick={() => { routes.push('/cart'); handleClose(); }}>My Cart</MenuItem>
            <MenuItem onClick={() => { handleSignOut(); handleClose(); }}>Logout</MenuItem>
          </Menu>
        )}
      </ul>
    </div>

       


      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        <button className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;