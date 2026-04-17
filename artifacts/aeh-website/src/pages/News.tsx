import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const news = [
  {
    title: "AEH Students Win National Business Competition 2026",
    date: "April 10, 2026",
    category: "Achievement",
    desc: "Our BBA students won first place at the National Business Innovation Challenge organized by CII, competing against 200+ teams from across India.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
  },
  {
    title: "Placement Drive 2026: 85% Students Placed",
    date: "March 28, 2026",
    category: "Placements",
    desc: "The 2026 placement season concluded with 85% placement rate. Top recruiters included TCS, Infosys, HDFC Bank, and Amazon, offering packages up to ₹8 LPA.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
  },
  {
    title: "New AI Lab Inaugurated by Industry Leaders",
    date: "March 15, 2026",
    category: "Infrastructure",
    desc: "A state-of-the-art Artificial Intelligence lab with 50 high-performance workstations was inaugurated by Shri Sandeep Singh, Chairman, in the presence of industry leaders.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    title: "Annual Cultural Festival 'Avvifest 2026' Concludes",
    date: "February 20, 2026",
    category: "Events",
    desc: "Three days of cultural extravaganza saw participation from 15 colleges. Over 5000 students attended the event featuring music, dance, and drama performances.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
  },
  {
    title: "School of Law Students Win State Moot Court Championship",
    date: "February 10, 2026",
    category: "Achievement",
    desc: "AEH Law students clinched the State-level Moot Court Competition championship, demonstrating exceptional advocacy and legal drafting skills.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  },
  {
    title: "4K Media Studio Inaugurated at School of Communication",
    date: "January 25, 2026",
    category: "Infrastructure",
    desc: "The School of Communication's media studio now features 4K cameras, professional editing suites, a green screen room, and an upgraded campus radio station.",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
  },
  {
    title: "Alumni Meet 2026: 500+ Graduates Reconnect",
    date: "January 15, 2026",
    category: "Events",
    desc: "AEH hosted its annual alumni meet with over 500 graduates reconnecting with their alma mater, sharing success stories and mentoring current students.",
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  },
  {
    title: "Monthly Guest Lecture Series by Industry CXOs Launched",
    date: "December 20, 2025",
    category: "Academic",
    desc: "A monthly guest lecture series featuring CXOs, entrepreneurs, and industry veterans has been launched to provide real-world insights to students across all departments.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    title: "Applied Science Students Win State Science Exhibition",
    date: "December 10, 2025",
    category: "Achievement",
    desc: "Applied Science students won first prize at the State Science Exhibition for their innovative water purification project using locally available materials.",
    img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80",
  },
  {
    title: "AEH Signs MoU with 10 International Universities",
    date: "November 30, 2025",
    category: "Academic",
    desc: "Avviare Educational Hub has signed Memoranda of Understanding with 10 international universities for student exchange programs, dual degrees, and collaborative research.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  },
  {
    title: "Pharmacy Students Research Published in International Journal",
    date: "November 15, 2025",
    category: "Achievement",
    desc: "Two pharmacy students' research on herbal formulations for skin care has been published in the International Journal of Pharmaceutical Sciences.",
    img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80",
  },
  {
    title: "Sports Week 2025: AEH Wins 12 Gold Medals",
    date: "October 28, 2025",
    category: "Events",
    desc: "The annual inter-college sports week saw AEH students winning 12 gold, 8 silver, and 6 bronze medals across cricket, basketball, athletics, and kabaddi.",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
  },
];

const categories = ["All", "Achievement", "Placements", "Infrastructure", "Events", "Academic"];

const catColors: Record<string, string> = {
  Achievement: "bg-amber-100 text-amber-700",
  Placements: "bg-green-100 text-green-700",
  Infrastructure: "bg-blue-100 text-blue-700",
  Events: "bg-purple-100 text-purple-700",
  Academic: "bg-teal-100 text-teal-700",
};

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? news : news.filter(n => n.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-4">Stay Updated</span>
          <h1 className="text-4xl font-bold mb-3">News & Events</h1>
          <p className="text-white/70 text-lg">Stay updated with the latest happenings at Avviare Educational Hub</p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeCategory === cat ? "bg-[hsl(219,40%,16%)] text-white border-[hsl(219,40%,16%)]" : "bg-white text-gray-600 border-gray-200 hover:border-[hsl(219,40%,40%)]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured News (first item) */}
        {activeCategory === "All" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8 hover:shadow-xl transition-shadow">
            <div className="grid md:grid-cols-2">
              <div className="relative h-60 md:h-auto">
                <img src={filtered[0].img} alt={filtered[0].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:hidden" />
              </div>
              <div className="p-7 flex flex-col justify-center">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${catColors[filtered[0].category] || "bg-gray-100 text-gray-600"}`}>
                  ⭐ Featured · {filtered[0].category}
                </span>
                <h2 className="text-xl font-bold text-foreground mb-3 leading-snug">{filtered[0].title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{filtered[0].desc}</p>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Calendar className="h-3.5 w-3.5" />{filtered[0].date}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeCategory === "All" ? filtered.slice(1) : filtered).map(item => (
            <div key={item.title} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-300 flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${catColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                  {item.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-foreground text-sm leading-snug mb-2 flex-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="h-3.5 w-3.5" />{item.date}
                  </div>
                  <span className="text-[hsl(219,60%,28%)] text-xs font-medium flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
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
