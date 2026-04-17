import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle, ChevronRight } from "lucide-react";

interface Program {
  name: string;
  duration: string;
  eligibility: string;
}

interface SchoolPageProps {
  name: string;
  tagline: string;
  intro: string;
  color: string;
  highlights: string[];
  programs: Program[];
  whyChoose: string[];
  careers: string[];
}

export function SchoolPage({ name, tagline, intro, color, highlights, programs, whyChoose, careers }: SchoolPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className={`${color} text-white py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">{name}</h1>
          <p className="text-white/80 text-lg">{tagline}</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">About the School</h2>
              <p className="text-muted-foreground leading-relaxed">{intro}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map(h => (
                  <div key={h} className="flex gap-3 bg-card border border-border rounded-lg p-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Programs Offered</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[hsl(219,40%,16%)] text-white">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Program</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Duration</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((p, i) => (
                      <tr key={p.name} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                        <td className="px-4 py-3 font-medium text-foreground text-sm">{p.name}</td>
                        <td className="px-4 py-3 text-muted-foreground text-sm">{p.duration}</td>
                        <td className="px-4 py-3 text-muted-foreground text-sm">{p.eligibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Career Opportunities</h2>
              <div className="flex flex-wrap gap-2">
                {careers.map(c => (
                  <span key={c} className="bg-[hsl(219,60%,28%)]/10 text-[hsl(219,60%,28%)] text-sm px-3 py-1.5 rounded-full font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[hsl(219,40%,16%)] rounded-xl p-6 text-white">
              <h3 className="font-bold text-[hsl(43,96%,55%)] mb-4">Why Choose Avviare?</h3>
              <ul className="space-y-3">
                {whyChoose.map(w => (
                  <li key={w} className="flex gap-2 text-sm text-white/80">
                    <ChevronRight className="h-4 w-4 text-[hsl(43,96%,55%)] shrink-0 mt-0.5" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-4">Apply Now</h3>
              <p className="text-muted-foreground text-sm mb-4">Admissions open for 2026-27 academic session</p>
              <Link href="/apply" className="block bg-[hsl(219,60%,28%)] text-white text-center font-semibold py-3 rounded-lg hover:bg-[hsl(219,60%,22%)] transition-colors">
                Apply Online
              </Link>
              <Link href="/contact" className="block border border-border text-center text-foreground font-medium py-3 rounded-lg mt-3 hover:bg-muted/30 transition-colors text-sm">
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
