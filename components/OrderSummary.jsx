"use client";

import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import axiosConfig from "@/utils/axiosConfig";
import React, { useEffect, useState } from "react";
import MapPicker from "@/components/MapPicker";
import { useUserStore } from "@/Zustand/store";
import { FaLocationCrosshairs } from "react-icons/fa6";




const OrderSummary = () => {
  const user = useUserStore();
  const { currency, router, getCartCount, getCartAmount } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const [location, setLocation] = useState("");
  const [mapOpen, setMapOpen] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  console.log(user)

  const fetchUserAddresses = async () => {
    console.log('hhuiuiu')
    if (!user || !user.email) return;
    console.log(user,'yuiyi')

    try {
      console.log('uouoiu')
      const response = await axiosConfig.get(`/api/address/get?email=${user.email}`);
      console.log(response,'opop')
      setUserAddresses(response.data||addressDummyData);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    }
  };


  const handleSelectLocation = (pos) => {
    setLocation(`Lat: ${pos.lat}, Lng: ${pos.lng}`);
    setMapOpen(false);
  };


  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {};

  useEffect(() => {
    console.log('yuiyiuy')
    fetchUserAddresses();
  }, []);

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
               {/* <li className="flex items-center gap-2 border p-2.5">
  <FaLocationCrosshairs className="text-gray-600" />
  <input
    type="text"
    value={location}
    readOnly
    onClick={() => setMapOpen(true)}
    className="flex-grow outline-none text-gray-600 cursor-pointer"
    placeholder="Click to select location"
  />
</li> */}
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Set Delivery Location
          </label>
          <div className="relative w-full">
  <FaLocationCrosshairs className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
  <input
    type="text"
    value={location}
    readOnly
    onClick={() => setMapOpen(true)}
    className="w-full outline-none p-2.5 pl-10 text-gray-600 border cursor-pointer"
    placeholder="Click to select location"
  />
</div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">
              {currency}
              {getCartAmount()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700"
      >
        Place Order
      </button>
      <MapPicker
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        onSelectLocation={handleSelectLocation}
      />
    </div>
  );
};

export default OrderSummary;
