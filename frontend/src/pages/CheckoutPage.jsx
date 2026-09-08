import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Truck,
  CheckCircle2,
  Tag,
  ArrowRight,
  Crown,
  MapPin,
  Utensils,
  Building2,
  Navigation,
  Globe,
  X,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const CheckoutPage = () => {
  const {
    cart,
    cartSubtotal,
    createOrder,
    setCurrentView,
    orderType,
    setOrderType,
    selectedOutlet,
    setSelectedOutlet,
    tableNumber,
    setTableNumber
  } = useStore();

  const [fullName, setFullName] = useState('Aarav Singhania');
  const [email, setEmail] = useState('aarav@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Flat 402, Royal Residency, Juhu');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400049');

  // Geolocation state
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [customerLocation, setCustomerLocation] = useState({
    lat: 19.1075,
    lng: 72.8263,
    accuracy: 15,
    formattedAddress: 'Flat 402, Royal Residency, Juhu, Mumbai - 400049'
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [showUpiQrModal, setShowUpiQrModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [placedOrderId, setPlacedOrderId] = useState(null);

  const freeShippingThreshold = 10000;
  const shippingFee = orderType === 'Dine-In' ? 0 : (cartSubtotal >= freeShippingThreshold ? 0 : 500);
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - discountAmount);

  // 📍 HTML5 Geolocation API Handler
  const handleDetectLocation = () => {
    setIsLocating(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const formattedAddr = `GPS Pin: Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)} (${address}, ${city})`;
        setCustomerLocation({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
          formattedAddress: formattedAddr
        });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location permission denied by user. Enter coordinates manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setLocationError('Location detection timed out.');
            break;
          default:
            setLocationError('An unknown location error occurred.');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ROYAL10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscountAmount(disc);
      setCouponMsg('✨ Coupon ROYAL10 applied! You saved 10% on your order.');
    } else {
      setDiscountAmount(0);
      setCouponMsg('❌ Invalid Coupon Code. Try using ROYAL10.');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const fullShippingAddress = orderType === 'Dine-In'
      ? `${tableNumber} (${selectedOutlet})`
      : `${address}, ${city}, ${state} - ${pincode}`;

    const orderId = createOrder({
      customerName: fullName,
      email,
      phone,
      total: grandTotal,
      items: cart,
      address: fullShippingAddress,
      paymentMethod,
      orderType,
      tableNumber,
      outletName: selectedOutlet,
      customerLocation
    });

    setPlacedOrderId(orderId);
  };

  if (placedOrderId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white mx-auto flex items-center justify-center shadow-xl animate-in zoom-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Order Confirmed & Sent to Kitchen/Desk
          </span>
          <h1 className="font-cinzel text-3xl font-extrabold text-gray-900 dark:text-white">
            THANK YOU FOR YOUR ORDER!
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Order Number: <strong className="text-amber-600 dark:text-amber-400 font-mono text-sm">{placedOrderId}</strong>
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-amber-200 dark:border-amber-900/30 text-left max-w-md mx-auto space-y-3 text-xs">
          <div className="flex justify-between border-b border-gray-100 dark:border-slate-800 pb-2 font-bold">
            <span>Customer:</span>
            <span className="text-gray-900 dark:text-white">{fullName}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-slate-800 pb-2 font-bold">
            <span>Order Type:</span>
            <span className="text-amber-600">
              {orderType === 'Dine-In' ? `🍽️ Dine-In (${tableNumber})` : '🚴 Home Delivery'}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-slate-800 pb-2">
            <span>Payment Method:</span>
            <span className="text-emerald-600 font-bold">{paymentMethod}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-slate-800 pb-2">
            <span>Grand Total Paid:</span>
            <span className="text-amber-600 font-extrabold text-sm">
              ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          </div>
          {customerLocation && (
            <div className="pt-1 text-[11px] text-gray-500">
              📍 Verified GPS Pin: Lat {customerLocation.lat?.toFixed(4)}, Lng {customerLocation.lng?.toFixed(4)}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => setCurrentView('orders')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider shadow-lg"
          >
            Track Order Live Status
          </button>
          <button
            onClick={() => setCurrentView('home')}
            className="bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="font-cinzel text-2xl font-bold">Your Cart is Empty</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider"
        >
          Browse Restaurant Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-4">
        <h1 className="font-cinzel text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span>CHECKOUT & PLACE ORDER</span>
          <Crown className="w-6 h-6 text-amber-500" />
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Select order mode (Dine-in vs Delivery), verify live location, and choose payment method
        </p>
      </div>

      {/* KING BURGER STYLE ORDER MODE TOGGLE (DINE-IN vs DELIVERY) */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 rounded-3xl text-white border border-amber-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest block">
              King Burger Style Order Interface
            </span>
            <h2 className="font-cinzel text-xl font-bold text-amber-100">
              CHOOSE HOW YOU WOULD LIKE YOUR ORDER
            </h2>
          </div>

          <div className="flex bg-slate-950 p-1.5 rounded-full border border-amber-500/40">
            <button
              type="button"
              onClick={() => setOrderType('Delivery')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                orderType === 'Delivery'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>🚴 HOME DELIVERY</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('Dine-In')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                orderType === 'Dine-In'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>🍽️ DINE-IN / TAKEAWAY</span>
            </button>
          </div>
        </div>

        {/* Dine-In Extra Options */}
        {orderType === 'Dine-In' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div>
              <label className="font-bold text-amber-200 block mb-1">Select Restaurant Outlet *</label>
              <select
                value={selectedOutlet}
                onChange={(e) => setSelectedOutlet(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-amber-500/40 rounded-xl text-white font-bold"
              >
                <option value="Bandra West Flagship Restaurant">Bandra West Flagship Restaurant (Mumbai)</option>
                <option value="Koramangala Gourmet Lounge">Koramangala Gourmet Lounge (Bengaluru)</option>
                <option value="Connaught Place Palace Restaurant">Connaught Place Palace Restaurant (Delhi)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-amber-200 block mb-1">Table Number / Counter # *</label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. Table #4"
                className="w-full p-2.5 bg-slate-900 border border-amber-500/40 rounded-xl text-white font-bold"
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-amber-200/80">
            🚚 Delivery: Food/items delivered directly to your doorstep with live GPS location tracking.
          </p>
        )}
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Address & Geolocation & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Address & Geolocation */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
              <h3 className="font-cinzel text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-500" />
                <span>1. {orderType === 'Dine-In' ? 'Dine-In Guest Contact & Location' : 'Delivery Address & Live GPS Location'}</span>
              </h3>
            </div>

            {/* 📍 Geolocation Trigger Button */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1.5">
                    <Navigation className="w-4 h-4" />
                    <span>FETCH CURRENT LIVE GPS LOCATION</span>
                  </span>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Click below to allow browser location access and fetch exact GPS pin for order delivery.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap shadow-md transition-all disabled:opacity-50"
                >
                  <MapPin className="w-4 h-4 animate-bounce" />
                  <span>{isLocating ? 'Detecting Location...' : '📍 Detect Live Location'}</span>
                </button>
              </div>

              {/* Display Location Badge */}
              {customerLocation && (
                <div className="mt-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> GPS Location Detected
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Accuracy: ±{customerLocation.accuracy}m
                    </span>
                  </div>
                  <p className="font-mono text-gray-700 dark:text-gray-300 text-[11px]">
                    Lat: <strong>{customerLocation.lat}</strong>, Lng: <strong>{customerLocation.lng}</strong>
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${customerLocation.lat},${customerLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] text-amber-600 dark:text-amber-400 font-bold hover:underline"
                  >
                    View location pin on Google Maps ↗
                  </a>
                </div>
              )}

              {locationError && (
                <p className="text-rose-500 text-xs font-bold pt-1">{locationError}</p>
              )}
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Phone Number *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold"
                />
              </div>

              {orderType === 'Delivery' && (
                <>
                  <div className="sm:col-span-2">
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Street Address / House No. *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">State & Pincode *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        required
                        className="p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                      />
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Pincode"
                        required
                        className="p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 2: MULTIPLE PAYMENT OPTIONS (UPI with QR Code, COD, Credit Card, Net Banking) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-500" />
              <span>2. Select Payment Options</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Option 1: UPI */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                    : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="accent-amber-500"
                />
                <QrCode className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="block font-bold">UPI (GPay / PhonePe / Paytm)</span>
                  <span className="text-[10px] text-gray-400">Scan QR Code or pay via UPI ID</span>
                </div>
              </label>

              {/* Option 2: Cash on Delivery */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                    : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="accent-amber-500"
                />
                <Banknote className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="block font-bold">Cash on Delivery (COD)</span>
                  <span className="text-[10px] text-gray-400">Pay cash on delivery / at table</span>
                </div>
              </label>

              {/* Option 3: Credit / Debit Card */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'Card'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                    : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                  className="accent-amber-500"
                />
                <CreditCard className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="block font-bold">Credit / Debit Card</span>
                  <span className="text-[10px] text-gray-400">Visa, MasterCard, RuPay</span>
                </div>
              </label>

              {/* Option 4: Net Banking */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'NetBanking'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                    : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="NetBanking"
                  checked={paymentMethod === 'NetBanking'}
                  onChange={() => setPaymentMethod('NetBanking')}
                  className="accent-amber-500"
                />
                <Globe className="w-5 h-5 text-amber-500" />
                <div>
                  <span className="block font-bold">Net Banking / Wallet</span>
                  <span className="text-[10px] text-gray-400">SBI, HDFC, ICICI, Axis</span>
                </div>
              </label>
            </div>

            {/* Sub-form details for UPI */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-700 dark:text-amber-400">Scan & Pay via UPI App</span>
                  <button
                    type="button"
                    onClick={() => setShowUpiQrModal(true)}
                    className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-[11px] hover:bg-amber-600"
                  >
                    📱 Open QR Scanner
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Scan the merchant QR code using Google Pay, PhonePe, or Paytm for instant payment verification.
                </p>
              </div>
            )}

            {/* Sub-form details for Credit Card */}
            {paymentMethod === 'Card' && (
              <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-slate-900 border rounded-xl font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full p-2 bg-white dark:bg-slate-900 border rounded-xl font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">CVV</label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className="w-full p-2 bg-white dark:bg-slate-900 border rounded-xl font-mono text-center"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3">
              Order Summary ({cart.length} items)
            </h3>

            {/* Items scroll */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartId} className="flex gap-3 items-center text-xs">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-14 object-cover rounded-lg border"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-gray-800 dark:text-gray-200 truncate">{item.name}</h5>
                    <p className="text-gray-400 text-[11px]">
                      {item.color} | Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <div className="pt-3 border-t border-gray-100 dark:border-slate-800 space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-500" />
                <span>Apply Royal Promo Coupon</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. ROYAL10"
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs uppercase font-bold"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Apply
                </button>
              </div>
              {couponMsg && <p className="text-[11px] font-bold text-amber-600">{couponMsg}</p>}
            </div>

            {/* Subtotal Calculation */}
            <div className="space-y-2 text-xs pt-3 border-t border-gray-100 dark:border-slate-800">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery / Service Charge</span>
                <span className="text-emerald-600 font-bold">
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-slate-800">
                <span>Grand Total</span>
                <span className="text-amber-600 dark:text-amber-400">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg shadow-amber-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Confirm & Place Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* UPI QR CODE SCANNER MODAL */}
      {showUpiQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-sm w-full text-center space-y-4 border border-amber-500/40 shadow-2xl relative">
            <button
              onClick={() => setShowUpiQrModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-gray-100 dark:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">
                Scan to Pay ₹{grandTotal.toLocaleString('en-IN')}
              </span>
              <h3 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white">
                INSTANT UPI SCANNER
              </h3>
            </div>

            {/* Generated QR Graphic */}
            <div className="p-4 bg-white rounded-2xl border-4 border-amber-500 mx-auto w-48 h-48 flex flex-col items-center justify-center space-y-2 shadow-inner">
              <QrCode className="w-32 h-32 text-slate-950" />
              <span className="text-[10px] font-mono font-bold text-slate-950">
                UPI ID: merchant@fvrking
              </span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Open Google Pay, PhonePe, or Paytm app on your phone and scan the QR code above to complete payment.
            </p>

            <button
              onClick={() => setShowUpiQrModal(false)}
              className="w-full bg-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs"
            >
              I Have Completed Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
