import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar } from "lucide-react";

const news = [
  { title: "AEH Students Win National Business Competition 2026", date: "April 10, 2026", category: "Achievement", desc: "Our BBA students won first place at the National Business Innovation Challenge organized by CII, competing against 200+ teams from across India." },
  { title: "Placement Drive 2026: 85% Students Placed", date: "March 28, 2026", category: "Placements", desc: "The 2026 placement season concluded with 85% placement rate. Top recruiters included TCS, Infosys, HDFC Bank, and Amazon." },
  { title: "New AI Lab Inaugurated by Industry Leaders", date: "March 15, 2026", category: "Infrastructure", desc: "A state-of-the-art Artificial Intelligence lab with 50 high-performance workstations was inaugurated by Shri Sandeep Singh, Chairman." },
  { title: "Annual Cultural Festival 'Avvifest 2026' Concludes Successfully", date: "February 20, 2026", category: "Events", desc: "Three days of cultural extravaganza saw participation from 15 colleges. Over 5000 students attended the event featuring music, dance, and drama." },
  { title: "School of Law Students Win Moot Court Competition", date: "February 10, 2026", category: "Achievement", desc: "AEH Law students won the State-level Moot Court Competition, demonstrating exceptional advocacy skills." },
  { title: "Media Studio Upgraded with 4K Production Equipment", date: "January 25, 2026", category: "Infrastructure", desc: "The School of Communication's media studio now features 4K cameras, professional editing suites, and an upgraded radio station." },
  { title: "Alumni Meet 2026: 500+ Graduates Reconnect", date: "January 15, 2026", category: "Events", desc: "AEH hosted its annual alumni meet with over 500 graduates reconnecting with their alma mater, sharing success stories and mentoring current students." },
  { title: "Guest Lecture Series by Industry Leaders Launched", date: "December 20, 2025", category: "Academic", desc: "Monthly guest lecture series featuring CXOs, entrepreneurs, and industry veterans to provide real-world insights to students." },
  { title: "Students Win State Science Exhibition First Prize", date: "December 10, 2025", category: "Achievement", desc: "Applied Science students won first prize at the State Science Exhibition for their innovative water purification project." },
];

const categories = ["All", "Achievement", "Placements", "Infrastructure", "Events", "Academic"];

export default function News() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">News & Events</h1>
          <p className="text-white/70 text-lg">Stay updated with the latest from Avviare Educational Hub</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(item => (
            <div key={item.title} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-[hsl(219,40%,16%)] px-5 py-3">
                <span className="text-[hsl(43,96%,55%)] text-xs font-semibold">{item.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground text-sm leading-snug mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
