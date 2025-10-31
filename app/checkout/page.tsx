"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const experience = searchParams.get("experience");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const quantity = searchParams.get("quantity");
  const total = searchParams.get("total");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoValue, setPromoValue] = useState(0);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const totalAmount = parseInt(total || "0");
  const taxes = Math.round((totalAmount * 0.06) / 1.06);
  const subtotal = totalAmount - taxes;
  const discountedTotal = Math.max(totalAmount - promoValue, 0);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleApplyPromo = async () => {
    if (!promoCode) return toast.error("Enter a promo code");
    if (!agreeToTerms)
      return toast.error("Please agree to the terms and safety policy");

    const loadingToast = toast.loading("Validating promo code...");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/promocode/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ promocode: promoCode }),
        }
      );

      toast.dismiss(loadingToast);

      if (!res.ok) throw new Error("Invalid promo code");

      const data = await res.json();
      setPromoValue(data.value);
      toast.success(`Promo applied! You got ₹${data.value} off.`);
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err);
      setPromoValue(0);
      toast.error("Invalid promo code or server error");
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handlePayAndConfirm = async () => {
    if (!fullName || !email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!agreeToTerms) {
      toast.error("Please agree to the terms and safety policy");
      return;
    }

    try {
      setIsLoading(true);
      buttonRef.current?.setAttribute("disabled", "true");

      const refId = nanoid(10);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId: experience,
          date,
          timeslot: time,
          quantity,
          total: totalAmount,
          taxes,
          promocode: promoCode,
          netTotalPaid: discountedTotal,
          refid: refId,
          customer: { fullName, email },
        }),
      });

      if (!res.ok) throw new Error("Failed to confirm booking");

      toast.success("Payment confirmed!");
      router.push(`/confirm/${refId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to confirm booking. Please try again.");
    } finally {
      setIsLoading(false);
      buttonRef.current?.removeAttribute("disabled");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 text-black pt-28 px-6 sm:px-12 md:px-24 pb-8">
      {/* ✅ Processing Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white px-10 py-8 rounded-2xl shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-xl font-semibold text-gray-800">Processing...</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Your booking is being confirmed. Please wait a moment.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex cursor-pointer items-center gap-2 text-gray-700 mb-6 hover:text-gray-900"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Checkout</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo code
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={!agreeToTerms}
                    className={`px-8 cursor-pointer py-3 font-medium rounded-lg transition-colors ${
                      agreeToTerms
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Apply
                  </button>
                </div>
                {!agreeToTerms && (
                  <p className="text-xs text-red-500 mt-2">
                    * You must agree to the terms before applying promo code
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-black cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm">Experience</span>
                <span className="font-semibold text-gray-900 text-right">
                  {experience || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm">Date</span>
                <span className="font-semibold text-gray-900">
                  {formatDate(date) || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm">Time</span>
                <span className="font-semibold text-gray-900">
                  {time || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm">Qty</span>
                <span className="font-semibold text-gray-900">
                  {quantity || "1"}
                </span>
              </div>

              <hr className="border-gray-300" />

              {/* Price Breakdown */}
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm">Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-600 text-sm">Taxes</span>
                <span className="font-semibold text-gray-900">₹{taxes}</span>
              </div>
              {promoValue > 0 && (
                <div className="flex justify-between items-start text-green-700">
                  <span className="text-sm font-medium">Promo Discount</span>
                  <span className="font-semibold">-₹{promoValue}</span>
                </div>
              )}

              <hr className="border-gray-300" />

              {/* Total */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{discountedTotal}
                </span>
              </div>

              <button
                ref={buttonRef}
                onClick={handlePayAndConfirm}
                disabled={isLoading}
                className={`w-full cursor-pointer ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-yellow-400 hover:bg-yellow-500"
                } text-black font-semibold py-3 rounded-lg transition-colors mt-4`}
              >
                {isLoading ? "Processing..." : "Pay and Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
