import { SchoolPage } from "@/pages/SchoolPage";

export default function Commerce() {
  return (
    <SchoolPage
      name="School of Commerce"
      tagline="Foundation for finance, business, and economic excellence"
      color="bg-gradient-to-br from-teal-700 to-teal-900"
      intro="The School of Commerce offers comprehensive B.Com and M.Com programs that build a strong foundation in accounting, finance, taxation, and business law. Our curriculum integrates traditional commerce education with modern financial tools and technologies, preparing graduates for professional certifications and corporate careers."
      highlights={[
        "Tally, GST, and income tax software training",
        "CA and CMA foundation coaching",
        "Finance and accounting internships",
        "Guest lectures by chartered accountants",
        "Commerce club activities and competitions",
        "Stock market and investment simulation",
        "Banking and insurance sector projects",
        "Entrepreneurship development workshops",
      ]}
      programs={[
        { name: "B.Com (Bachelor of Commerce)", duration: "3 Years", eligibility: "10+2 Commerce/any stream (Min 45%)" },
        { name: "B.Com (Honours)", duration: "3 Years", eligibility: "10+2 Commerce (Min 50%)" },
        { name: "B.Com (Taxation & Finance)", duration: "3 Years", eligibility: "10+2 Commerce/any stream (Min 45%)" },
        { name: "M.Com (Master of Commerce)", duration: "2 Years", eligibility: "B.Com or equivalent (Min 50%)" },
        { name: "M.Com (Finance & Taxation)", duration: "2 Years", eligibility: "B.Com or equivalent (Min 50%)" },
      ]}
      whyChoose={[
        "CA/CMA exam preparation support",
        "Practical Tally and GST training",
        "Industry visits to financial institutions",
        "Commerce alumni mentorship",
        "Access to SEBI-registered trading simulators",
        "Robust placement in banking sector",
      ]}
      careers={["Chartered Accountant", "Cost Accountant", "Financial Analyst", "Bank Officer", "Tax Consultant", "Auditor", "Finance Manager", "Investment Advisor"]}
    />
  );
}
