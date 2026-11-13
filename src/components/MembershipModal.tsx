import React, { useState, useEffect } from 'react';
import { 
  X, 
  Crown, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Printer, 
  RefreshCw,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioFeedback } from '../utils/audioFeedback';
import { adminStorage } from '../utils/adminStorage';
import { PricingTierConfig } from '../types';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeSuccess: (tier: 'Scholar' | 'Enterprise') => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  onUpgradeSuccess,
}) => {
  const [selectedTier, setSelectedTier] = useState<'scholar' | 'enterprise'>('scholar');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const [pricing, setPricing] = useState<PricingTierConfig>(() => adminStorage.getPricingConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setPricing(adminStorage.getPricingConfig());
    };
    window.addEventListener('crafty_storage_update', handleUpdate);
    return () => window.removeEventListener('crafty_storage_update', handleUpdate);
  }, []);

  // Payment form state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardName, setCardName] = useState('Prof. A. K. Sharma');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<{
    invoiceId: string;
    date: string;
    tier: string;
    amountPaid: string;
    cardLast4: string;
  } | null>(null);

  if (!isOpen) return null;

  const scholarDisplayPrice =
    currency === 'INR'
      ? billingCycle === 'monthly'
        ? pricing.scholarMonthlyInr
        : pricing.scholarAnnualInr
      : billingCycle === 'monthly'
      ? pricing.scholarMonthlyUsd
      : pricing.scholarAnnualUsd;

  const enterpriseDisplayPrice =
    currency === 'INR'
      ? billingCycle === 'monthly'
        ? pricing.institutionMonthlyInr
        : pricing.institutionMonthlyInr * 10
      : billingCycle === 'monthly'
      ? pricing.institutionMonthlyUsd
      : pricing.institutionMonthlyUsd * 10;

  const basePrice = selectedTier === 'scholar' ? scholarDisplayPrice : enterpriseDisplayPrice;
  const finalPrice = Math.max(0, Math.round(basePrice * (1 - discountPercent / 100)));

  const formatPrice = (val: number) => {
    return currency === 'INR' ? `₹${val.toLocaleString('en-IN')}` : `$${val.toLocaleString('en-US')}`;
  };

  const handleApplyCoupon = () => {
    audioFeedback.playClick();
    if (!couponCode.trim()) {
      setCouponMessage('Please enter a coupon code.');
      return;
    }
    const result = adminStorage.validateCoupon(couponCode);
    if (result.valid) {
      setDiscountPercent(result.discountPercent);
      setCouponMessage(result.message || `Success! ${result.discountPercent}% discount applied.`);
      audioFeedback.playSuccess();
    } else {
      setDiscountPercent(0);
      setCouponMessage(result.message || 'Invalid coupon code. Try "CRAFTY50"');
      audioFeedback.playError();
    }
  };

  const handleProcessPayment = () => {
    audioFeedback.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      audioFeedback.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });

      const invId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const dateStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

      const planLabel =
        selectedTier === 'scholar'
          ? billingCycle === 'monthly'
            ? 'Pro Scholar Monthly'
            : 'Pro Scholar Annual'
          : 'Institution License';

      const inv = {
        invoiceId: invId,
        date: dateStr,
        tier:
          selectedTier === 'scholar'
            ? `Pro Scholar (${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'})`
            : `Institutional / University License (${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'})`,
        amountPaid: `${formatPrice(finalPrice)} / ${billingCycle === 'monthly' ? 'month' : 'year'}`,
        cardLast4: '4242',
      };

      // Record in Admin Storage
      adminStorage.recordTransaction({
        id: `tx-${Date.now()}`,
        invoiceId: invId,
        customerName: cardName || 'Scholar Candidate',
        customerEmail: 'scholar.candidate@edtech.org',
        plan: planLabel,
        amount: finalPrice,
        currency,
        date: dateStr,
        status: 'succeeded',
        paymentMethod: `Stripe / UPI (•••• 4242)`,
      });

      if (discountPercent > 0 && couponCode.trim()) {
        adminStorage.incrementCouponUsage(couponCode);
      }

      setReceipt(inv);
      onUpgradeSuccess(selectedTier === 'scholar' ? 'Scholar' : 'Enterprise');
    }, 1200);
  };

  const handlePrintReceipt = () => {
    audioFeedback.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-200/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-sky-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-sky-50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!receipt ? (
          <div className="space-y-6">
            {/* Modal Title */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                <Crown className="w-3.5 h-3.5 fill-current text-amber-600" />
                <span>Crafty English Scholar Membership</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900">
                Unlock Pro Membership
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans">
                Full access to AI Crafty Coach, NTA NET / MPSET / MPESB Grade 1 & 2 PYQ vaults, MPESB Paper 1 Top 100 Exam Points, and speech acoustics — directed by <strong className="text-slate-900">Mr. ChainSingh Kushro</strong> (<a href="mailto:chaink2000@gmail.com" className="text-sky-700 hover:underline font-medium">chaink2000@gmail.com</a>).
              </p>
            </div>

            {/* Billing Cycle & Currency Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs">
              {/* Monthly / Yearly Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">Billing Cycle:</span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-sky-200">
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setBillingCycle('monthly');
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      billingCycle === 'monthly' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setBillingCycle('yearly');
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      billingCycle === 'yearly' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Yearly</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      billingCycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      Save ₹200
                    </span>
                  </button>
                </div>
              </div>

              {/* Currency Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-medium">Currency:</span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-sky-200">
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setCurrency('INR');
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      currency === 'INR' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    INR (₹)
                  </button>
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setCurrency('USD');
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      currency === 'USD' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>
            </div>

            {/* Plan Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => {
                  audioFeedback.playClick();
                  setSelectedTier('scholar');
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedTier === 'scholar'
                    ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-200'
                    : 'bg-white border-sky-200 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-editorial text-lg font-bold text-slate-900">Pro Scholar</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    Popular
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {formatPrice(scholarDisplayPrice)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {' '}
                    / {billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold mb-3">
                  {currency === 'INR'
                    ? `₹${pricing.scholarMonthlyInr}/mo Monthly or ₹${pricing.scholarAnnualInr.toLocaleString('en-IN')}/yr Yearly`
                    : `$${pricing.scholarMonthlyUsd}/mo Monthly or $${pricing.scholarAnnualUsd}/yr Yearly`}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Unlimited AI Crafty Coach & Smart Fix</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>NTA NET, MPSET & MPESB Paper 1/2 PYQs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Full Speech Acoustics & Phonetics</span>
                  </li>
                </ul>
              </div>

              <div
                onClick={() => {
                  audioFeedback.playClick();
                  setSelectedTier('enterprise');
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedTier === 'enterprise'
                    ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-200'
                    : 'bg-white border-sky-200 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-editorial text-lg font-bold text-slate-900">Institutional</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold">
                    Academy
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {formatPrice(enterpriseDisplayPrice)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {' '}
                    / {billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-700 font-semibold mb-3">
                  For Coaching Centers, Colleges & Departments
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Up to 50 Student / Teacher Seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Custom Mock Test Creator & Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Institution-wide Leaderboard & Reports</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-600" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code (Try: CRAFTY50 for 50% off)"
                  className="bg-white border border-sky-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 uppercase placeholder-slate-400 focus:outline-none focus:border-sky-500 flex-1"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className="text-[11px] text-amber-800 font-semibold pl-6">{couponMessage}</p>
              )}
            </div>

            {/* Simulated Payment Card Input */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-bold text-slate-800">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Encrypted Payment Simulator (UPI / Card Demo)</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-Bit SSL</span>
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Cardholder Name"
                  className="w-full bg-white border border-sky-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-sky-500"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="flex-1 bg-white border border-sky-200 rounded-xl p-2.5 text-slate-900 font-mono focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-20 bg-white border border-sky-200 rounded-xl p-2.5 text-slate-900 font-mono text-center focus:outline-none focus:border-sky-500"
                  />
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="CVV"
                    className="w-16 bg-white border border-sky-200 rounded-xl p-2.5 text-slate-900 font-mono text-center focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Upgrade */}
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:brightness-110 text-white font-extrabold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4 fill-current" />
                  <span>
                    Confirm & Activate Pro ({formatPrice(finalPrice)}/{billingCycle === 'monthly' ? 'mo' : 'yr'})
                  </span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Official Invoice / Receipt Screen */
          <div className="space-y-6 animate-in zoom-in-95">
            <div className="text-center space-y-1">
              <div className="inline-flex p-3 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-editorial text-2xl font-bold text-slate-900">Payment Successful!</h2>
              <p className="text-xs text-slate-600 font-sans">
                Your Crafty English Pro membership is now active.
              </p>
            </div>

            {/* Printable Receipt Paper */}
            <div className="p-6 rounded-2xl bg-sky-50/75 border border-sky-200 space-y-4 text-xs font-mono text-slate-700">
              <div className="flex items-center justify-between pb-3 border-b border-sky-200">
                <div>
                  <span className="font-editorial text-base font-bold text-slate-900 block">
                    Crafty English Academy Ltd.
                  </span>
                  <span className="text-[10px] text-slate-500">Official Educational Receipt</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">{receipt.invoiceId}</span>
                  <span className="text-[10px] text-slate-500 block">{receipt.date}</span>
                </div>
              </div>

              <div className="space-y-1.5 py-1">
                <div className="flex justify-between">
                  <span>Subscription:</span>
                  <span className="text-slate-900 font-bold">{receipt.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span>Billed To:</span>
                  <span className="text-slate-900">{cardName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>Card / UPI (ending in {receipt.cardLast4})</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-sky-200 font-bold text-sm text-emerald-700">
                  <span>Total Amount Paid:</span>
                  <span>{receipt.amountPaid}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 text-center pt-2 space-y-0.5">
                <div>Founder & Lead Educator: Mr. ChainSingh Kushro · Support: chaink2000@gmail.com</div>
                <div className="text-slate-500">Thank you for powering your English & Literature mastery with Crafty English!</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handlePrintReceipt}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Start Learning Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
