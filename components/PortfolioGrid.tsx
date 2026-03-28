"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const categoryKeys = ["all", "clinics", "restaurants", "businessSystems", "business", "ecommerce"] as const;

const projectCategoryMap = [
  "clinics",
  "restaurants",
  "businessSystems",
  "business",
  "ecommerce",
];

const projectColors = [
  "from-blue-500/20 to-cyan-500/20",
  "from-orange-500/20 to-red-500/20",
  "from-slate-500/20 to-zinc-500/20",
  "from-indigo-500/20 to-blue-500/20",
  "from-purple-500/20 to-pink-500/20",
];

const projectTags = [
  ["Healthcare", "Booking System", "Patient Portal"],
  ["F&B", "Online Menu", "Reservations"],
  ["ERP", "Inventory", "Dashboard"],
  ["Corporate", "Blog", "Lead Generation"],
  ["E-commerce", "Payments", "Inventory"],
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
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group card card-hover overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image Placeholder */}
            <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="btn btn-primary btn-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {t("portfolioGrid.viewProject")}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                  {t(`portfolioGrid.categories.${project.category}`)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
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
