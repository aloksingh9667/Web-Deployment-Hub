import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { TrendingUp, Award, Building } from "lucide-react";

const placed = [
  { name: "Anurag Pandey", program: "MBA", company: "UMS Media" },
  { name: "Priyanka Sharma", program: "BCA", company: "Infosys" },
  { name: "Rahul Singh", program: "BBA", company: "HDFC Bank" },
  { name: "Kavita Gupta", program: "BJMC", company: "Zee News" },
  { name: "Amit Kumar", program: "B.Com", company: "Deloitte" },
  { name: "Sunita Verma", program: "MCA", company: "TCS" },
  { name: "Deepak Patel", program: "MBA", company: "Tech Mahindra" },
  { name: "Ritu Jha", program: "BCA", company: "Wipro" },
  { name: "Mukesh Yadav", program: "BBA", company: "Airtel" },
  { name: "Anjali Singh", program: "MJMC", company: "Amar Ujala" },
  { name: "Rohit Chandel", program: "MCA", company: "HCL Technologies" },
  { name: "Pooja Tiwari", program: "MBA", company: "Bajaj Finance" },
  { name: "Vikram Mehta", program: "B.Com", company: "ICICI Bank" },
  { name: "Neha Dubey", program: "BCA", company: "IBM" },
  { name: "Arjun Khanna", program: "MBA", company: "Amazon" },
  { name: "Divya Mishra", program: "BJMC", company: "NDTV" },
];

export default function Placements() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Our Glorious Placements</h1>
          <p className="text-white/70 text-lg">Our students are placed across top companies in India and globally</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: TrendingUp, value: "85%+", label: "Placement Rate" },
            { icon: Building, value: "100+", label: "Recruiting Companies" },
            { icon: Award, value: "12 LPA", label: "Highest Package" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-[hsl(219,40%,16%)] text-white rounded-xl p-6 text-center">
              <Icon className="h-10 w-10 mx-auto mb-3 text-[hsl(43,96%,55%)]" />
              <div className="text-3xl font-bold text-[hsl(43,96%,55%)]">{value}</div>
              <div className="text-white/70 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6">Recently Placed Students</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {placed.map(student => (
            <div key={student.name} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="h-14 w-14 mx-auto bg-[hsl(219,40%,16%)] text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                {student.name[0]}
              </div>
              <h3 className="font-semibold text-foreground text-sm">{student.name}</h3>
              <p className="text-muted-foreground text-xs mt-0.5">{student.program}</p>
              <div className="mt-2 bg-[hsl(43,96%,55%)]/20 text-[hsl(219,60%,28%)] text-xs font-semibold px-3 py-1 rounded-full">
                {student.company}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[hsl(219,40%,16%)] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold text-[hsl(43,96%,55%)] mb-3">Start Your Success Story</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Join Avviare and become part of our growing community of successful professionals placed across India's top companies.</p>
          <Link href="/apply" className="inline-block bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-8 py-3 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-colors">
            Apply Now
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
