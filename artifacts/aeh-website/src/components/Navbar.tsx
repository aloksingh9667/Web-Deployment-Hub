import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, GraduationCap, User, LogOut } from "lucide-react";
import { useStudentAuth } from "@/hooks/useStudentAuth";

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
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [location] = useLocation();
  const { student, logout } = useStudentAuth();

  const toggle = (name: string) => setOpenDropdown(prev => prev === name ? null : name);
  const toggleMobileSection = (name: string) => setMobileSection(prev => prev === name ? null : name);
  const closeMobile = () => { setMobileOpen(false); setMobileSection(null); };

  return (
    <nav className="bg-[hsl(219,40%,16%)] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold shrink-0">
            <GraduationCap className="h-7 w-7 text-[hsl(43,96%,55%)]" />
            <span className="text-white leading-tight hidden sm:block text-base lg:text-lg">
              <span className="text-[hsl(43,96%,55%)]">Avviare</span> Educational Hub
            </span>
            <span className="text-white text-sm sm:hidden">
              <span className="text-[hsl(43,96%,55%)]">AEH</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
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
            {student ? (
              <div className="relative">
                <button onClick={() => toggle("student")} className="flex items-center gap-1.5 ml-1 bg-green-600 text-white text-sm font-semibold px-3 py-2 rounded-md hover:bg-green-700 transition-colors">
                  <User className="h-4 w-4" />
                  <span className="max-w-[80px] truncate">{student.name.split(" ")[0]}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${openDropdown === "student" ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === "student" && (
                  <div className="absolute right-0 top-full mt-1 bg-white shadow-xl rounded-lg border border-gray-200 min-w-[180px] py-1 z-50">
                    <Link href="/student/dashboard" onClick={() => setOpenDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50">My Dashboard</Link>
                    <Link href="/student/fees" onClick={() => setOpenDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50">Fee Payment</Link>
                    <Link href="/student/receipts" onClick={() => setOpenDropdown(null)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50">My Receipts</Link>
                    <hr className="my-1" />
                    <button onClick={() => { logout(); setOpenDropdown(null); }} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/student/login" className="ml-1 border border-[hsl(43,96%,55%)] text-[hsl(43,96%,55%)] font-semibold px-3 py-2 rounded-md hover:bg-[hsl(43,96%,55%)] hover:text-[hsl(220,20%,15%)] transition-colors text-sm">
                Student Login
              </Link>
            )}
            <Link href="/apply" className="ml-1 bg-[hsl(43,96%,55%)] text-[hsl(220,20%,15%)] font-semibold px-4 py-2 rounded-md hover:bg-[hsl(43,96%,45%)] transition-colors text-sm">
              Apply Now
            </Link>
          </div>

          <button className="lg:hidden p-2 rounded-md hover:bg-white/10" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/20 bg-[hsl(219,40%,12%)]">
          <div className="px-3 py-3 space-y-0.5 max-h-[80vh] overflow-y-auto">
            <MobileNavLink href="/" onClick={closeMobile}>Home</MobileNavLink>
            <MobileSection label="About" isOpen={mobileSection === "about"} onToggle={() => toggleMobileSection("about")}>
              {aboutLinks.map(l => <MobileNavLink key={l.href} href={l.href} onClick={closeMobile} indent>{l.label}</MobileNavLink>)}
            </MobileSection>
            <MobileSection label="Programs" isOpen={mobileSection === "programs"} onToggle={() => toggleMobileSection("programs")}>
              {programs.map(l => <MobileNavLink key={l.href} href={l.href} onClick={closeMobile} indent>{l.label}</MobileNavLink>)}
            </MobileSection>
            <MobileNavLink href="/infrastructure" onClick={closeMobile}>Infrastructure</MobileNavLink>
            <MobileSection label="Placements" isOpen={mobileSection === "placements"} onToggle={() => toggleMobileSection("placements")}>
              {placementLinks.map(l => <MobileNavLink key={l.href} href={l.href} onClick={closeMobile} indent>{l.label}</MobileNavLink>)}
            </MobileSection>
            <MobileNavLink href="/news" onClick={closeMobile}>News</MobileNavLink>
            <MobileNavLink href="/gallery" onClick={closeMobile}>Gallery</MobileNavLink>
            <MobileNavLink href="/careers" onClick={closeMobile}>Careers</MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMobile}>Contact</MobileNavLink>
            <div className="pt-2 border-t border-white/10 mt-2 space-y-0.5">
              {student ? (
                <>
                  <p className="px-3 py-1 text-xs text-white/50 uppercase tracking-wider">Logged in as {student.name}</p>
                  <MobileNavLink href="/student/dashboard" onClick={closeMobile}>My Dashboard</MobileNavLink>
                  <MobileNavLink href="/student/fees" onClick={closeMobile}>Fee Payment</MobileNavLink>
                  <MobileNavLink href="/student/receipts" onClick={closeMobile}>My Receipts</MobileNavLink>
                  <button onClick={() => { logout(); closeMobile(); }} className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:bg-white/5 rounded-md flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <Link href="/student/login" onClick={closeMobile} className="block py-2.5 px-3 text-sm text-[hsl(43,96%,55%)] border border-[hsl(43,96%,55%)] rounded-md text-center hover:bg-[hsl(43,96%,55%)] hover:text-[hsl(220,20%,15%)] transition-colors">
                  Student Login
                </Link>
              )}
              <Link href="/apply" onClick={closeMobile} className="block bg-[hsl(43,96%,55%)] text-center text-[hsl(220,20%,15%)] font-semibold px-4 py-2.5 rounded-md text-sm">
                Apply Now
              </Link>
            </div>
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

function MobileNavLink({ href, children, onClick, indent }: { href: string; children: React.ReactNode; onClick: () => void; indent?: boolean }) {
  return (
    <Link href={href} onClick={onClick} className={`block py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors ${indent ? "pl-8 pr-3" : "px-3"}`}>
      {children}
    </Link>
  );
}

function MobileSection({ label, isOpen, onToggle, children }: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div>
      <button onClick={onToggle} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors">
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="border-l-2 border-[hsl(43,96%,55%)]/40 ml-3 mt-0.5 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
}
