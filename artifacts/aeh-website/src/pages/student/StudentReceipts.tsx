import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Receipt, Download, CheckCircle, Clock, XCircle, IndianRupee } from "lucide-react";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface Payment {
  id: number;
  receiptNumber: string;
  courseName: string;
  courseCode: string;
  paymentPlan: string;
  amount: number;
  status: string;
  razorpayPaymentId: string | null;
  paidAt: string | null;
  createdAt: string;
}

const planLabels: Record<string, string> = {
  quarterly: "Quarterly",
  semester: "Per Semester",
  yearly: "Yearly",
  full_course: "Full Course",
};

export default function StudentReceipts() {
  const { student, token, isLoading } = useStudentAuth();
  const [, setLocation] = useLocation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !student) setLocation("/student/login");
  }, [student, isLoading, setLocation]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/payments/my-payments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => setPayments(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [token]);

  const printReceipt = (p: Payment) => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html><html><head><title>Fee Receipt - ${p.receiptNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }
        .header { text-align: center; border-bottom: 2px solid #1e3a5f; padding-bottom: 20px; margin-bottom: 20px; }
        .header h1 { color: #1e3a5f; margin: 0; font-size: 22px; }
        .header p { color: #666; margin: 4px 0; font-size: 13px; }
        .receipt-no { background: #f0f4ff; padding: 10px 16px; border-radius: 6px; margin-bottom: 20px; }
        .receipt-no span { font-weight: bold; color: #1e3a5f; font-size: 16px; }
        .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        .row:last-child { border-bottom: none; }
        .label { color: #666; }
        .value { font-weight: 600; }
        .amount { font-size: 24px; font-weight: bold; color: #1e3a5f; text-align: center; margin: 20px 0; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background: #dcfce7; color: #16a34a; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        @media print { .no-print { display: none; } }
      </style></head><body>
      <div class="header">
        <h1>🎓 Avviare Educational Hub</h1>
        <p>Bilaspur, Chhattisgarh - 495001</p>
        <p>Fee Payment Receipt</p>
      </div>
      <div class="receipt-no">Receipt No: <span>${p.receiptNumber}</span></div>
      <div class="row"><span class="label">Student Name</span><span class="value">${student?.name}</span></div>
      <div class="row"><span class="label">Roll Number</span><span class="value">${student?.rollNumber}</span></div>
      <div class="row"><span class="label">Course</span><span class="value">${p.courseName} (${p.courseCode})</span></div>
      <div class="row"><span class="label">Payment Plan</span><span class="value">${planLabels[p.paymentPlan] || p.paymentPlan}</span></div>
      <div class="row"><span class="label">Payment ID</span><span class="value">${p.razorpayPaymentId || "N/A"}</span></div>
      <div class="row"><span class="label">Payment Date</span><span class="value">${p.paidAt ? new Date(p.paidAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : "N/A"}</span></div>
      <div class="row"><span class="label">Status</span><span class="value"><span class="status">✓ ${p.status.toUpperCase()}</span></span></div>
      <div class="amount">₹${p.amount.toLocaleString("en-IN")}</div>
      <div class="footer"><p>This is a computer-generated receipt. No signature required.</p><p>For queries: accounts@avviare.edu.in | +91 9876543210</p></div>
      <br/><button onclick="window.print()" class="no-print" style="padding:10px 20px;background:#1e3a5f;color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;">🖨️ Print Receipt</button>
      </body></html>
    `);
    win.document.close();
    win.focus();
  };

  if (isLoading || !student) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-[hsl(219,40%,16%)] border-t-transparent rounded-full" /></div>;

  const successPayments = payments.filter(p => p.status === "success");
  const totalPaid = successPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Receipts</h1>
            <p className="text-gray-500 text-sm mt-1">Track all your fee payment history</p>
          </div>
          {successPayments.length > 0 && (
            <div className="text-right bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-xs text-green-600">Total Paid</p>
              <div className="flex items-center gap-0.5 text-xl font-bold text-green-700">
                <IndianRupee className="h-4 w-4" />
                {totalPaid.toLocaleString("en-IN")}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-xl border h-24 animate-pulse" />)}
          </div>
        ) : payments.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No payment records found</p>
            <p className="text-sm text-gray-400 mt-1">Your payment history will appear here once you make a payment.</p>
            <a href="/student/fees" className="inline-block mt-4 bg-[hsl(219,40%,16%)] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(219,40%,24%)] transition-colors">Pay Fees Now</a>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${p.status === "success" ? "bg-green-100" : p.status === "pending" ? "bg-amber-100" : "bg-red-100"}`}>
                      {p.status === "success" ? <CheckCircle className="h-5 w-5 text-green-600" /> : p.status === "pending" ? <Clock className="h-5 w-5 text-amber-600" /> : <XCircle className="h-5 w-5 text-red-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-semibold text-gray-700">{p.receiptNumber}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === "success" ? "bg-green-100 text-green-700" : p.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">{p.courseName} — {planLabels[p.paymentPlan] || p.paymentPlan}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {p.paidAt ? `Paid on ${new Date(p.paidAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}` : `Initiated ${new Date(p.createdAt).toLocaleDateString("en-IN")}`}
                        {p.razorpayPaymentId && ` • ID: ${p.razorpayPaymentId}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:shrink-0">
                    <div className="flex items-center gap-0.5 text-lg font-bold text-gray-800">
                      <IndianRupee className="h-4 w-4" />
                      {p.amount.toLocaleString("en-IN")}
                    </div>
                    {p.status === "success" && (
                      <button onClick={() => printReceipt(p)} className="flex items-center gap-1.5 text-sm text-[hsl(219,40%,40%)] border border-[hsl(219,40%,40%)] px-3 py-1.5 rounded-lg hover:bg-[hsl(219,40%,16%)] hover:text-white hover:border-[hsl(219,40%,16%)] transition-colors">
                        <Download className="h-4 w-4" /> Receipt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
