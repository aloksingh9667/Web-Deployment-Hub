import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, GraduationCap } from "lucide-react";

const programs = [
  { label: "School of Commerce", href: "/school-of-commerce" },
  { label: "School of Humanities", href: "/school-of-humanities" },
  { label: "School of Management", href: "/school-of-management" },
  { label: "School of CS & IT", href: "/school-of-cs-it" },
  { label: "School of Applied Science", href: "/school-of-applied-science" },
  { label: "School of Law", href: "/school-of-law" },
  { label: "School of Pharmacy", href: "/school-of-pharmacy" },
  { label: "School of Education", href: "/school-of-education" },
  { label: "School of Communication", href: "/school-of-communication" },
];

const aboutLinks = [
  { label: "About Avviare", href: "/about" },
  { label: "Core Values", href: "/core-values" },
  { label: "Our Leadership", href: "/leadership" },
  { label: "Academic Council", href: "/academic-council" },
  { label: "Our Team", href: "/team" },
];

const placementLinks = [
  { label: "Our Placements", href: "/placements" },
  { label: "Top Recruiters", href: "/top-recruiters" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  const toggle = (name: string) => setOpenDropdown(prev => prev === name ? null : name);

  return (
    <nav className="bg-[hsl(219,40%,16%)] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="h-7 w-7 text-[hsl(43,96%,55%)]" />
            <span className="text-white leading-tight">
              <span className="text-[hsl(43,96%,55%)]">Avviare</span> Educational Hub
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <NavLink href="/" active={location === "/"}>Home</NavLink>

            <DropdownNav label="About" isOpen={openDropdown === "about"} onToggle={() => toggle("about")}>
              {aboutLinks.map(l => <DropdownItem key={l.href} href={l.href} label={l.label} onClick={() => setOpenDropdown(null)} />)}
            </DropdownNav>

            <DropdownNav label="Programs" isOpen={openDropdown === "programs"} onToggle={() => toggle("programs")}>
              {programs.map(l => <DropdownItem key={l.href} href={l.href} label={l.label} onClick={() => setOpenDropdown(null)} />)}
            </DropdownNav>

            <NavLink href="/infrastructure">Infrastructure</NavLink>

            <DropdownNav label="Placements" isOpen={openDropdown === "placements"} onToggle={() => toggle("placements")}>
              {placementLinks.map(l => <DropdownItem key={l.href} href={l.href} label={l.label} onClick={() => setOpenDropdown(null)} />)}
            </DropdownNav>

            <NavLink href="/news">News</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/careers">Careers</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Link href="/apply" className="ml-2 bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-semibold px-4 py-2 rounded-md hover:bg-[hsl(43,96%,45%)] transition-colors text-sm">
              Apply Now
            </Link>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/20 bg-[hsl(219,40%,12%)] pb-4">
          <div className="px-4 pt-2 space-y-1">
            {["/", "/about", "/core-values", "/leadership", "/academic-council", "/team", ...programs.map(p=>p.href), "/infrastructure", "/placements", "/top-recruiters", "/news", "/gallery", "/careers", "/contact"].map(href => (
              <Link key={href} href={href} className="block py-2 text-sm text-white/80 hover:text-white" onClick={() => setMobileOpen(false)}>
                {href === "/" ? "Home" : href.replace(/^\/|\/$/g, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
              </Link>
            ))}
            <Link href="/apply" className="block mt-2 bg-[hsl(43,96%,55%)] text-center text-[hsl(220,20%,15%)] font-semibold px-4 py-2 rounded-md text-sm" onClick={() => setMobileOpen(false)}>
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${active ? "bg-white/15 text-white" : "text-white/80 hover:text-white hover:bg-white/10"}`}>
      {children}
    </Link>
  );
}

function DropdownNav({ label, isOpen, onToggle, children }: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <button onClick={onToggle} className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors">
        {label} <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 bg-white shadow-xl rounded-lg border border-gray-200 min-w-[200px] py-1 z-50">
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[hsl(219,60%,28%)] transition-colors">
      {label}
    </Link>
  );
}
