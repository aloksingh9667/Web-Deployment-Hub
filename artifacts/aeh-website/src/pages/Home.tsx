import { Link } from "wouter";
import { Award, Users, Building, BookOpen, ChevronRight, Star, TrendingUp, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const stats = [
  { label: "Years of Excellence", value: "12+", icon: Star },
  { label: "Students Enrolled", value: "5000+", icon: Users },
  { label: "Programs Offered", value: "25+", icon: BookOpen },
  { label: "Placement Partners", value: "100+", icon: Building },
];

const programs = [
  { name: "School of Management", courses: "BBA, MBA", desc: "Industry-focused curriculum with case studies and live projects", href: "/school-of-management", color: "from-blue-600 to-blue-800" },
  { name: "School of CS & IT", courses: "BCA, MCA", desc: "Cutting-edge technology education with AI and programming labs", href: "/school-of-cs-it", color: "from-indigo-600 to-indigo-800" },
  { name: "School of Commerce", courses: "B.Com, M.Com", desc: "Comprehensive commerce education with finance specializations", href: "/school-of-commerce", color: "from-teal-600 to-teal-800" },
  { name: "School of Humanities", courses: "BA, MA", desc: "Liberal arts education fostering critical thinking and creativity", href: "/school-of-humanities", color: "from-purple-600 to-purple-800" },
  { name: "School of Communication", courses: "DJMC, BJMC, MJMC", desc: "State-of-the-art media studio with industry internships", href: "/school-of-communication", color: "from-rose-600 to-rose-800" },
  { name: "School of Law", courses: "BA LL.B, LL.M", desc: "Legal education with moot courts and clinical programs", href: "/school-of-law", color: "from-amber-600 to-amber-800" },
];

const newsItems = [
  { title: "AEH Students Win State-Level Business Competition", date: "March 15, 2026", category: "Achievement" },
  { title: "Placement Drive 2026: 200+ Students Placed in Top Companies", date: "February 28, 2026", category: "Placements" },
  { title: "New Media Lab Inaugurated at School of Communication", date: "January 20, 2026", category: "Infrastructure" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[hsl(219,40%,16%)] via-[hsl(219,40%,20%)] to-[hsl(219,40%,14%)] text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[hsl(43,96%,55%)]/20 border border-[hsl(43,96%,55%)]/30 text-[hsl(43,96%,55%)] text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Star className="h-4 w-4" /> Admissions Open 2026-27
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Welcome to<br />
              <span className="text-[hsl(43,96%,55%)]">Avviare</span> Educational Hub
            </h1>
            <p className="text-white/80 text-xl mb-8 leading-relaxed">
              Transforming education since 2013. We offer quality, affordable programs that prepare students for successful careers and meaningful lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold px-8 py-3.5 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-all text-lg shadow-lg">
                Apply Online 2026-27
              </Link>
              <Link href="/about" className="border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-all text-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[hsl(43,96%,55%)] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 text-[hsl(219,40%,16%)]" />
                <div className="text-3xl font-bold text-[hsl(219,40%,16%)]">{value}</div>
                <div className="text-sm font-medium text-[hsl(219,40%,25%)]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Schools & Programs</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our diverse range of undergraduate and postgraduate programs designed for the modern world</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(program => (
              <Link key={program.name} href={program.href} className="group block">
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className={`bg-gradient-to-br ${program.color} p-6 text-white`}>
                    <h3 className="text-lg font-bold mb-1">{program.name}</h3>
                    <p className="text-white/80 text-sm">{program.courses}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-muted-foreground text-sm leading-relaxed">{program.desc}</p>
                    <div className="flex items-center gap-1 text-[hsl(219,60%,28%)] font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                      Learn More <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/school-of-pharmacy" className="inline-flex items-center gap-2 border-2 border-[hsl(219,60%,28%)] text-[hsl(219,60%,28%)] font-semibold px-6 py-2.5 rounded-lg hover:bg-[hsl(219,60%,28%)] hover:text-white transition-colors">
              View All Programs <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose Avviare?</h2>
              <div className="space-y-4">
                {[
                  { icon: Award, title: "Affordable Excellence", desc: "World-class education at fees that don't burden your family" },
                  { icon: Users, title: "Experienced Faculty", desc: "Learn from industry veterans and distinguished academicians" },
                  { icon: TrendingUp, title: "100% Placement Assistance", desc: "Dedicated placement cell with 100+ recruiting partners" },
                  { icon: Building, title: "Modern Infrastructure", desc: "Smart classrooms, AI labs, media studio, and AC WiFi campus" },
                  { icon: Globe, title: "Industry Connections", desc: "Strong alumni network and corporate tie-ups across sectors" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="h-10 w-10 bg-[hsl(219,60%,28%)] rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{title}</h4>
                      <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[hsl(219,40%,16%)] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold text-[hsl(43,96%,55%)] mb-6">Admission 2026-27</h3>
              <p className="text-white/80 mb-6 leading-relaxed">Applications are now open for all undergraduate and postgraduate programs for the academic session 2026-27.</p>
              <ul className="space-y-3 mb-8">
                {["Online & Offline Admission Process", "Merit-based Scholarships Available", "Easy EMI Options for Fees", "Hostel Facility Available", "Immediate Counseling Available"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="h-2 w-2 bg-[hsl(43,96%,55%)] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/apply" className="block bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-bold text-center py-3.5 rounded-lg hover:bg-[hsl(43,96%,45%)] transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">News & Events</h2>
            <Link href="/news" className="text-[hsl(219,60%,28%)] font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map(item => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <span className="inline-block bg-[hsl(43,96%,55%)]/20 text-[hsl(219,60%,28%)] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {item.category}
                </span>
                <h3 className="font-semibold text-foreground mb-2 leading-snug">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
