"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExperienceDetail } from "@/app/utils/api";

interface Timeslot {
  _id: string;
  time: string;
  slotsQty: number;
}

interface AvailableSlot {
  date: string;
  time: string;
  slotsQty: number;
}

interface Experience {
  _id: string;
  name: string;
  location: string;
  detail: string;
  dates: string[];
  timeslots: Timeslot[];
  about: string;
  image: string;
  price: number;
  availableSlots: AvailableSlot[];
}

interface ExperienceBookingClientProps {
  experience: ExperienceDetail;
}

export default function ExperienceBookingClient({ experience }: ExperienceBookingClientProps) {
    
    const router=useRouter()


  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return { day, month };
  };

  const maxSlots = useMemo(() => {
  if (!selectedDate || !selectedTime) return Infinity;
  const slot = experience.availableSlots?.find(
    s => s.date === selectedDate && s.time === selectedTime
  );
  return slot?.slotsQty || 0;
}, [selectedDate, selectedTime, experience.availableSlots]);

const uniqueDates = useMemo(() => {
  const dates = experience.availableSlots?.map(slot => slot.date) || [];
  return [...new Set(dates)];
}, [experience.availableSlots]);

const availableTimeslots = useMemo(() => {
  if (!selectedDate) return [];
  return experience.availableSlots?.filter(slot => slot.date === selectedDate) || [];
}, [selectedDate, experience.availableSlots]);

  // Calculate totals
  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06); // 6% tax
  const total = subtotal + taxes;

  const handleQuantityChange = (delta: number) => {
  setQuantity(prev => {
    const newQty = prev + delta;
    if (newQty < 1) return 1; // minimum 1
    if (newQty > maxSlots) return maxSlots; // maximum limited by slots
    return newQty;
  });
};

  const handleConfirm = () => {
  if (!selectedDate || !selectedTime) {
    alert("Please select a date and time");
    return;
  }

  const bookingData = {
    experience: experience._id,
    date: selectedDate,
    time: selectedTime,
    quantity,
    total,
  };

  // Convert to query string
  const query = new URLSearchParams(bookingData as any).toString();

  // Redirect to checkout page
  router.push(`/checkout?${query}`);
};

  return (
    <div className="min-h-screen pt-28 px-6 sm:px-12 md:px-24 pb-[2rem] bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href={"/"} className="flex items-center gap-2 text-gray-700 mb-6 hover:text-gray-900">
          <ChevronLeft size={20} />
          <span className="font-medium">Details</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="w-full h-80 rounded-2xl overflow-hidden">
              <img
                src={experience.image}
                alt={experience.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{experience.name}</h1>
              <p className="text-gray-600 mt-2">{experience.detail}</p>
            </div>

            {/* Date Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose date</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {uniqueDates.map((date, index) => {
                  const { day, month } = formatDate(date);
                  const isSelected = selectedDate === date;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      className={`flex cursor-pointer flex-col items-center min-w-[80px] px-4 py-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <span className={`text-sm ${isSelected ? "text-purple-600" : "text-gray-600"}`}>
                        {month}
                      </span>
                      <span className={`text-2xl font-bold ${isSelected ? "text-purple-600" : "text-gray-900"}`}>
                        {day}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection  */}
            {selectedDate && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose time</h2>
                <div className="flex flex-wrap gap-3">
                  {availableTimeslots.map((slot, index) => {
                    const isSelected = selectedTime === slot.time;
                    const isSoldOut = slot.slotsQty === 0;
                    return (
                      <button
                        key={index}
                        onClick={() => !isSoldOut && setSelectedTime(slot.time)}
                        disabled={isSoldOut}
                        className={`px-6 cursor-pointer py-3 rounded-lg border-2 transition-all ${
                          isSoldOut
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : isSelected
                            ? "border-purple-500 bg-purple-50 text-purple-600"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <span className="font-medium">{slot.time}</span>
                        {!isSoldOut && (
                          <span className="text-xs ml-2 text-gray-500">
                            {slot.slotsQty} left
                          </span>
                        )}
                        {isSoldOut && (
                          <span className="text-xs ml-2">Sold out</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            )}

            {/* About Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 bg-gray-100 rounded-lg p-4">{experience.about}</p>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              {/* Price */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Starts at</span>
                <span className="text-2xl font-bold text-gray-900">₹{experience.price}</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Quantity</span>
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-2">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold min-w-[20px] text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>
              </div>

              <hr className="my-4" />

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">₹{total}</span>
              </div>

              {/* Confirm Button */}
              <button
              disabled={!selectedDate || !selectedTime}
                onClick={handleConfirm}
                className={`w-full cursor-pointer bg-${!selectedDate || !selectedTime?"gray-300":"[#FFD643]"} hover:bg-[#fdd02f] text-gray-700 font-semibold py-3 rounded-lg transition-colors`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}