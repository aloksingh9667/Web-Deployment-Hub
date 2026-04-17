import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  { title: "Campus Life", items: ["Smart Classrooms", "AI & Computer Labs", "Science Laboratories", "Library & Reading Room", "Sports Facilities", "Cafeteria & Dining"] },
  { title: "Events & Celebrations", items: ["Annual Cultural Festival", "Convocation Ceremony", "Sports Day", "Fresher's Welcome Party", "Teachers' Day Celebration", "Independence Day Celebration"] },
  { title: "Academic Activities", items: ["Guest Lectures", "Workshop Sessions", "Industry Visits", "Research Presentations", "Moot Court Sessions", "Media Production"] },
  { title: "Achievements", items: ["Award Ceremonies", "Competition Winners", "Sports Trophies", "Academic Excellence Awards", "Placement Announcements", "Alumni Success Stories"] },
];

const colors = [
  "from-blue-400 to-blue-600", "from-indigo-400 to-indigo-600", "from-purple-400 to-purple-600",
  "from-rose-400 to-rose-600", "from-amber-400 to-amber-600", "from-teal-400 to-teal-600",
];

export default function Gallery() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gradient-to-br from-[hsl(219,40%,16%)] to-[hsl(219,40%,22%)] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Gallery</h1>
          <p className="text-white/70 text-lg">Moments from our vibrant campus life</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {sections.map(({ title, items }) => (
          <div key={title} className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-5 pb-2 border-b border-border">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div key={item} className={`bg-gradient-to-br ${colors[i % colors.length]} rounded-xl h-36 flex items-end p-4`}>
                  <span className="text-white font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
