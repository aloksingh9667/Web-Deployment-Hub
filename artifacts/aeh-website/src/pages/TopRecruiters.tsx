import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const companies = [
  "TCS", "Infosys", "Wipro", "HCL Technologies", "Tech Mahindra", "IBM",
  "Cognizant", "Accenture", "Amazon", "Flipkart", "HDFC Bank", "ICICI Bank",
  "Axis Bank", "State Bank of India", "Bajaj Finance", "Airtel", "Jio",
  "Amar Ujala", "Dainik Bhaskar", "NDTV", "Zee News", "Times of India",
  "Deloitte", "KPMG", "Ernst & Young", "PricewaterhouseCoopers",
  "UMS Media", "Reliance Industries", "ITC", "Marico",
];

export default function TopRecruiters() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Our Top Recruiters</h1>
          <p className="text-white/70 text-lg">Trusted by India's leading companies and institutions</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <p className="text-muted-foreground text-lg mb-10 text-center max-w-2xl mx-auto">
          Avviare's placement network includes over 100 companies across technology, finance, media, and consulting sectors. Our strong industry relationships ensure our students have access to the best career opportunities.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {companies.map(company => (
            <div key={company} className="bg-card border border-border rounded-xl p-6 text-center font-semibold text-foreground hover:shadow-md hover:border-[hsl(219,60%,28%)] transition-all">
              {company}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
