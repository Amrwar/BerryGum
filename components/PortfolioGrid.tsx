"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const categoryKeys = ["all", "clinics", "restaurants", "businessSystems", "business", "ecommerce"] as const;

const projectCategoryMap = [
  "clinics",
  "restaurants",
  "businessSystems",
  "business",
  "ecommerce",
  "businessSystems",
  "businessSystems",
  "clinics",
  "clinics",
  "business",
];

const projectColors = [
  "from-blue-500/20 to-cyan-500/20",
  "from-orange-500/20 to-red-500/20",
  "from-slate-500/20 to-zinc-500/20",
  "from-indigo-500/20 to-blue-500/20",
  "from-purple-500/20 to-pink-500/20",
  "bg-black",          // Escape — dark bg
  "bg-black",          // VRoom — dark bg
  "bg-slate-900",      // Arty Dental — dark bg
  "bg-slate-900",      // ON Medical — dark bg
  "bg-slate-900",      // ValuePlus — dark bg
];

const projectTags = [
  ["Healthcare", "Booking System", "Patient Portal"],
  ["F&B", "Online Menu", "Reservations"],
  ["ERP", "Inventory", "Dashboard"],
  ["Corporate", "Blog", "Lead Generation"],
  ["E-commerce", "Payments", "Inventory"],
  ["Barbershop", "Staff Salaries", "Operations"],
  ["Car Wash", "Analytics", "Multi-service"],
  ["Dental", "Appointments", "Patient Records"],
  ["Oncology", "Patient Management", "Analytics"],
  ["Real Estate", "Lead Tracking", "CRM"],
];

// Detail page route — empty = no dedicated page
const projectDetailPages = [
  "", "", "", "", "", "", "", "", "", "",
];

// Company logo — shown as overlay badge on the card thumbnail
const projectLogos: string[] = [
  "", "", "", "", "",
  "/portfolio/escape-barb.webp",
  "",
  "/portfolio/logo-arty-dental.png",
  "/portfolio/logo-onmedical.png",
  "/portfolio/logo-valueplus.png",
];

interface PortfolioGridProps {
  limit?: number;
  showFilters?: boolean;
}

export default function PortfolioGrid({ limit, showFilters = true }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t, messages } = useLanguage();

  const categories = categoryKeys.map((key) => ({
    key,
    label: t(`portfolioGrid.categories.${key}`),
  }));

  const projectsData = messages.portfolioGrid.projects;
  const projects = Object.values(projectsData).map((proj: any, index: number) => ({
    id: index + 1,
    title: proj.title,
    category: projectCategoryMap[index],
    description: proj.description,
    color: projectColors[index],
    tags: projectTags[index],
    detailPage: projectDetailPages[index] || "",
  }));

  const filteredProjects = projects
    .filter((project) => activeCategory === "all" || project.category === activeCategory)
    .slice(0, limit || projects.length);

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeCategory === category.key
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((project, index) => {
          const CardWrapper = project.detailPage
            ? ({ children }: { children: React.ReactNode }) => (
                <Link href={project.detailPage} className="group card card-hover overflow-hidden block" style={{ animationDelay: `${index * 100}ms` }}>
                  {children}
                </Link>
              )
            : ({ children }: { children: React.ReactNode }) => (
                <div className="group card card-hover overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
                  {children}
                </div>
              );

          const logo = projectLogos[project.id - 1];

          return (
            <CardWrapper key={project.id}>
              {/* Thumbnail */}
              <div className={`aspect-[4/3] relative overflow-hidden ${
                project.id >= 6 ? "bg-slate-900" :
                `bg-gradient-to-br ${project.color}`
              }`}>

                {/* Escape Barbershop — marketing image */}
                {project.id === 6 && (
                  <Image src="/portfolio/escape-marketing.png" alt="Escape Barbershop" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                )}
                {/* VRoom — marketing image */}
                {project.id === 7 && (
                  <Image src="/portfolio/vroom-marketing.png" alt="VRoom Car Wash" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                )}
                {/* Arty Dental Clinic — website screenshot */}
                {project.id === 8 && (
                  <Image src="/portfolio/arty-dental-website.png" alt="Arty Dental Clinic" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                )}
                {/* ON Medical — website screenshot */}
                {project.id === 9 && (
                  <Image src="/portfolio/onmedical-website.png" alt="ON Medical" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                )}
                {/* ValuePlus — website screenshot */}
                {project.id === 10 && (
                  <Image src="/portfolio/valueplus-website.png" alt="ValuePlus" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                )}
                {/* Placeholder for non-real projects */}
                {project.id < 6 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Company logo badge — bottom-left overlay */}
                {logo && (
                  <div className="absolute bottom-3 left-3 rounded-xl overflow-hidden shadow-lg"
                       style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", padding: "5px 10px" }}>
                    <div className="relative h-6 w-20">
                      <Image src={logo} alt="" fill className="object-contain object-left" sizes="80px" />
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"
                        style={{ background: "var(--gradient-brand)" }}>
                    {t("portfolioGrid.viewProject")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-fuchsia-700 bg-purple-50 px-2.5 py-1 rounded-md">
                    {t(`portfolioGrid.categories.${project.category}`)}
                  </span>
                  {logo && (
                    <div className="relative h-5 w-16 opacity-60">
                      <Image src={logo} alt="" fill className="object-contain object-right" sizes="64px" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>

      {limit && projects.length > limit && (
        <div className="mt-12 text-center">
          <Link href="/portfolio" className="btn btn-outline">
            {t("portfolioGrid.viewAll")}
            <svg className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
