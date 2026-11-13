import React, { useState } from 'react';
import { 
  CreditCard, 
  Tag, 
  Plus, 
  Trash2, 
  DollarSign, 
  Save, 
  Eye, 
  X
} from 'lucide-react';
import { AdminCoupon, AdminTransaction, PricingTierConfig } from '../../types';
import { adminStorage } from '../../utils/adminStorage';
import { audioFeedback } from '../../utils/audioFeedback';
import { InvoiceReceiptModal } from './InvoiceReceiptModal';

interface FinancialsCmsProps {
  onShowToast: (msg: string) => void;
}

export const FinancialsCms: React.FC<FinancialsCmsProps> = ({ onShowToast }) => {
  const [coupons, setCoupons] = useState<AdminCoupon[]>(() => adminStorage.getCoupons());
  const [transactions, setTransactions] = useState<AdminTransaction[]>(() => adminStorage.getTransactions());
  const [pricing, setPricing] = useState<PricingTierConfig>(() => adminStorage.getPricingConfig());

  // Modal states
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<AdminTransaction | null>(null);

  // New coupon form
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(50);
  const [newExpiry, setNewExpiry] = useState('2026-12-31');
  const [newMaxUses, setNewMaxUses] = useState(500);
  const [newMinOrder] = useState(15);
  const [newDesc, setNewDesc] = useState('');

  // Pricing edit form
  const [scholarMonthly, setScholarMonthly] = useState(pricing.scholarMonthlyUsd);
  const [scholarAnnual, setScholarAnnual] = useState(pricing.scholarAnnualUsd);
  const [scholarMonthlyInr, setScholarMonthlyInr] = useState(pricing.scholarMonthlyInr);
  const [scholarAnnualInr, setScholarAnnualInr] = useState(pricing.scholarAnnualInr);

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    audioFeedback.playSuccess();
    const updated: PricingTierConfig = {
      ...pricing,
      scholarMonthlyUsd: Number(scholarMonthly),
      scholarAnnualUsd: Number(scholarAnnual),
      scholarMonthlyInr: Number(scholarMonthlyInr),
      scholarAnnualInr: Number(scholarAnnualInr),
    };
    adminStorage.setPricingConfig(updated);
    setPricing(updated);
    onShowToast('Updated platform subscription pricing matrix');
  };

  const handleToggleCoupon = (coupon: AdminCoupon) => {
    audioFeedback.playClick();
    const newStatus = coupon.status === 'active' ? 'disabled' : 'active';
    const updated = { ...coupon, status: newStatus as AdminCoupon['status'] };
    const list = adminStorage.saveCoupon(updated);
    setCoupons(list);
    onShowToast(`Promo code ${coupon.code} is now ${newStatus.toUpperCase()}`);
  };

  const handleDeleteCoupon = (id: string, code: string) => {
    if (confirm(`Delete promo code: ${code}?`)) {
      audioFeedback.playClick();
      const list = adminStorage.deleteCoupon(id);
      setCoupons(list);
      onShowToast(`Deleted coupon ${code}`);
    }
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) {
      alert('Please enter a coupon code.');
      return;
    }

    const coupon: AdminCoupon = {
      id: `cpn-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      discountPercent: Number(newDiscount),
      expiryDate: newExpiry,
      maxUses: Number(newMaxUses),
      usedCount: 0,
      status: 'active',
      minOrderValue: Number(newMinOrder),
      description: newDesc.trim() || `${newDiscount}% discount promotional voucher.`,
    };

    audioFeedback.playSuccess();
    const list = adminStorage.saveCoupon(coupon);
    setCoupons(list);
    setIsCouponModalOpen(false);
    setNewCode('');
    setNewDesc('');
    onShowToast(`Created Promo Code ${coupon.code} (${coupon.discountPercent}% OFF)`);
  };

  const handleRefund = (tx: AdminTransaction) => {
    if (confirm(`Issue full refund of ${tx.currency} ${tx.amount} to ${tx.customerEmail}?`)) {
      audioFeedback.playClick();
      const updated = adminStorage.refundTransaction(tx.id);
      setTransactions(updated);
      onShowToast(`Issued refund for invoice ${tx.invoiceId}`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-sky-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-editorial text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span>Financials, Subscriptions & Coupon Control Center</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Configure subscription pricing tiers, generate promo codes, and inspect Stripe payment logs
          </p>
        </div>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setIsCouponModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* Subscription Pricing Matrix Configurator */}
      <div className="p-6 rounded-2xl bg-white border border-sky-200 space-y-4 text-xs shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Subscription Tier Pricing Configurator</span>
            </h3>
            <p className="text-slate-500 text-xs">
              Directly updates prices displayed to students in the Pro Membership Modal
            </p>
          </div>
        </div>

        <form onSubmit={handleSavePricing} className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
            <label className="text-slate-600 font-semibold block text-[11px] uppercase">
              Pro Scholar Monthly (USD $)
            </label>
            <input
              type="number"
              value={scholarMonthly}
              onChange={(e) => setScholarMonthly(Number(e.target.value))}
              className="w-full p-2 bg-white border border-sky-200 rounded font-mono font-bold text-emerald-700 text-sm"
            />
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
            <label className="text-slate-600 font-semibold block text-[11px] uppercase">
              Pro Scholar Annual (USD $)
            </label>
            <input
              type="number"
              value={scholarAnnual}
              onChange={(e) => setScholarAnnual(Number(e.target.value))}
              className="w-full p-2 bg-white border border-sky-200 rounded font-mono font-bold text-emerald-700 text-sm"
            />
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
            <label className="text-slate-600 font-semibold block text-[11px] uppercase">
              Pro Scholar Monthly (INR ₹)
            </label>
            <input
              type="number"
              value={scholarMonthlyInr}
              onChange={(e) => setScholarMonthlyInr(Number(e.target.value))}
              className="w-full p-2 bg-white border border-sky-200 rounded font-mono font-bold text-emerald-700 text-sm"
            />
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1">
            <label className="text-slate-600 font-semibold block text-[11px] uppercase">
              Pro Scholar Annual (INR ₹)
            </label>
            <input
              type="number"
              value={scholarAnnualInr}
              onChange={(e) => setScholarAnnualInr(Number(e.target.value))}
              className="w-full p-2 bg-white border border-sky-200 rounded font-mono font-bold text-emerald-700 text-sm"
            />
          </div>

          <div className="sm:col-span-4 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Update Pricing Across Platform</span>
            </button>
          </div>
        </form>
      </div>

      {/* Promo Codes & Coupons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-600" />
            <span>Active Promotional Coupons ({coupons.length})</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Codes immediately valid at student checkout
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupons.map((c) => {
            const usagePercent = Math.min(100, Math.round((c.usedCount / c.maxUses) * 100));
            const isActive = c.status === 'active';
            return (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-white border border-sky-200 hover:border-sky-300 transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-700 text-base tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {c.code}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-sky-50 text-slate-500 border-sky-200'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">{c.discountPercent}% Flat Scholarship</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{c.description}</p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-500 font-mono">
                    <span>Redemptions:</span>
                    <span>
                      {c.usedCount} / {c.maxUses} ({usagePercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-sky-100 overflow-hidden">
                    <div
                      style={{ width: `${usagePercent}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Expires: {c.expiryDate}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-sky-100 text-xs">
                  <button
                    onClick={() => handleToggleCoupon(c)}
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                  >
                    {isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(c.id, c.code)}
                    className="text-rose-600 hover:text-rose-700 transition-colors p-1 cursor-pointer"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stripe Payment Transactions Log */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-sky-600" />
            <span>Recent Payment Transactions & Invoices</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">Stripe & UPI Real-Time Feed</span>
        </div>

        <div className="rounded-xl border border-sky-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-sky-200">
                <tr>
                  <th className="p-3.5">Invoice ID</th>
                  <th className="p-3.5">Subscriber</th>
                  <th className="p-3.5">Plan</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-sky-50/70 transition-colors">
                    <td className="p-3.5 font-mono text-sky-700 font-bold">
                      {tx.invoiceId}
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900">{tx.customerName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{tx.customerEmail}</p>
                    </td>
                    <td className="p-3.5 text-slate-700">{tx.plan}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {tx.currency === 'USD' ? '$' : '₹'}{tx.amount.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">{tx.date}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          tx.status === 'succeeded'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            audioFeedback.playClick();
                            setSelectedTxForReceipt(tx);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          title="View & Print Invoice Receipt"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>

                        {tx.status === 'succeeded' && (
                          <button
                            onClick={() => handleRefund(tx)}
                            className="text-xs text-rose-600 hover:text-rose-700 font-semibold transition-colors cursor-pointer"
                          >
                            Refund
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CREATE COUPON MODAL */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-200/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-sky-200 rounded-2xl shadow-2xl p-6 text-slate-900">
            <button
              onClick={() => setIsCouponModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-slate-900">
                  Generate Promo Code
                </h3>
                <p className="text-xs text-slate-500">
                  Create a custom discount code for candidates
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CRAFTY60, MPSET2026"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 font-mono uppercase focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Discount % *</label>
                  <input
                    type="number"
                    min="5"
                    max="90"
                    required
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(Number(e.target.value))}
                    className="w-full p-2 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Max Redemptions</label>
                  <input
                    type="number"
                    min="1"
                    value={newMaxUses}
                    onChange={(e) => setNewMaxUses(Number(e.target.value))}
                    className="w-full p-2 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Expiration Date</label>
                <input
                  type="date"
                  value={newExpiry}
                  onChange={(e) => setNewExpiry(e.target.value)}
                  className="w-full p-2 bg-sky-50 border border-sky-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description / Campaign</label>
                <input
                  type="text"
                  placeholder="e.g. Special 50% discount for NET JRF cohort"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2 bg-sky-50 border border-sky-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  Create & Activate Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVOICE RECEIPT MODAL */}
      <InvoiceReceiptModal
        transaction={selectedTxForReceipt}
        onClose={() => setSelectedTxForReceipt(null)}
      />
    </div>
  );
};
