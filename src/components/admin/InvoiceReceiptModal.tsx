import React from 'react';
import { AdminTransaction } from '../../types';
import { X, Printer, Download, Sparkles, ShieldCheck, FileText } from 'lucide-react';
import { audioFeedback } from '../../utils/audioFeedback';

interface InvoiceReceiptModalProps {
  transaction: AdminTransaction | null;
  onClose: () => void;
}

export const InvoiceReceiptModal: React.FC<InvoiceReceiptModalProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const handlePrint = () => {
    audioFeedback.playClick();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-200/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-sky-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Modal Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-100 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-slate-900">
                Official Tax Invoice & Receipt
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {transaction.invoiceId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="bg-sky-50/75 border border-sky-200 rounded-xl p-6 space-y-6 text-sm">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-editorial text-lg font-bold text-slate-900">
                  Crafty English Academy
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Founder & Lead Educator: Mr. ChainSingh Kushro
              </p>
              <p className="text-xs text-slate-600">
                Email: chaink2000@gmail.com · Tax ID: GSTIN23AAACR9821K1Z5
              </p>
            </div>

            <div className="text-right">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                transaction.status === 'succeeded'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {transaction.status === 'succeeded' ? 'PAID & VERIFIED' : transaction.status.toUpperCase()}
              </span>
              <p className="text-xs text-slate-500 mt-1.5 font-mono">
                Date: {transaction.date}
              </p>
            </div>
          </div>

          {/* Billed To */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-white border border-sky-200 text-xs">
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-semibold block mb-1">
                Billed To
              </span>
              <p className="font-bold text-slate-900 text-sm">{transaction.customerName}</p>
              <p className="text-slate-600 font-mono">{transaction.customerEmail}</p>
            </div>
            <div>
              <span className="text-slate-500 uppercase tracking-wider font-semibold block mb-1">
                Payment Method
              </span>
              <p className="text-slate-800 font-medium">{transaction.paymentMethod}</p>
              <p className="text-emerald-700 flex items-center gap-1 mt-0.5 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit TLS Secured</span>
              </p>
            </div>
          </div>

          {/* Line Item Table */}
          <div className="border border-sky-200 rounded-lg overflow-hidden bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-sky-200">
                <tr>
                  <th className="p-3">Subscription Item</th>
                  <th className="p-3 text-center">Term</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100">
                <tr>
                  <td className="p-3 font-medium text-slate-900">
                    {transaction.plan}
                    <span className="block text-[11px] text-slate-500 font-normal">
                      Full access to NTA NET (P1/P2), MPSET & MPESB Grade 1/2 Banks, AI Crafty Coach & Manuscript Studio
                    </span>
                  </td>
                  <td className="p-3 text-center text-slate-600">Active Cycle</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    {transaction.currency === 'USD' ? '$' : '₹'}{transaction.amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-1.5 text-xs text-right pr-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono">{transaction.currency === 'USD' ? '$' : '₹'}{transaction.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (GST / Sales Tax 0% Incl):</span>
              <span className="font-mono">0.00</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-sky-200">
              <span>Total Paid:</span>
              <span className="font-mono text-emerald-700">
                {transaction.currency === 'USD' ? '$' : '₹'}{transaction.amount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-[11px] text-slate-500 pt-2 border-t border-sky-200 flex items-center justify-between flex-wrap gap-2">
            <span>Electronic receipt generated automatically by Crafty English Platform.</span>
            <span className="font-mono text-slate-500">No physical signature required.</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Receipt
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save / Print PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
