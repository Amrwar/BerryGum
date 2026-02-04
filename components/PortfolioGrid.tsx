"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Clinics", "Restaurants", "E-commerce", "Corporate"];

const projects = [
  {
    id: 1,
    title: "Cairo Dental Care",
    category: "Clinics",
    description: "Modern dental clinic website with online booking system",
    image: "/portfolio/clinic-1.jpg",
    color: "from-blue-500/20 to-cyan-500/20",
    tags: ["Healthcare", "Booking System", "Responsive"],
  },
  {
    id: 2,
    title: "Nile Grill House",
    category: "Restaurants",
    description: "Restaurant website with menu and reservation system",
    image: "/portfolio/restaurant-1.jpg",
    color: "from-orange-500/20 to-red-500/20",
    tags: ["F&B", "Online Menu", "Reservations"],
  },
  {
    id: 3,
    title: "Sphinx Fashion",
    category: "E-commerce",
    description: "Full e-commerce store with payment integration",
    image: "/portfolio/ecommerce-1.jpg",
    color: "from-purple-500/20 to-pink-500/20",
    tags: ["E-commerce", "Payments", "Inventory"],
  },
  {
    id: 4,
    title: "Alexandria Eye Center",
    category: "Clinics",
    description: "Ophthalmology clinic with patient portal",
    image: "/portfolio/clinic-2.jpg",
    color: "from-green-500/20 to-emerald-500/20",
    tags: ["Healthcare", "Patient Portal", "HIPAA"],
  },
  {
    id: 5,
    title: "Pharaoh Consulting",
    category: "Corporate",
    description: "Professional corporate website with case studies",
    image: "/portfolio/corporate-1.jpg",
    color: "from-slate-500/20 to-zinc-500/20",
    tags: ["Corporate", "Blog", "Multilingual"],
  },
  {
    id: 6,
    title: "Oasis CafÃ©",
    category: "Restaurants",
    description: "Trendy cafÃ© website with loyalty program integration",
    image: "/portfolio/restaurant-2.jpg",
    color: "from-amber-500/20 to-yellow-500/20",
    tags: ["F&B", "Loyalty", "Social Integration"],
  },
  {
    id: 7,
    title: "Pyramids Tech Solutions",
    category: "Corporate",
    description: "Tech company website with service showcase",
    image: "/portfolio/corporate-2.jpg",
    color: "from-indigo-500/20 to-blue-500/20",
    tags: ["Technology", "Portfolio", "Contact Forms"],
  },
  {
    id: 8,
    title: "Desert Bloom Spa",
    category: "Clinics",
    description: "Wellness spa with booking and gift cards",
    image: "/portfolio/clinic-3.jpg",
    color: "from-rose-500/20 to-pink-500/20",
    tags: ["Wellness", "Booking", "Gift Cards"],
  },
];

interface PortfolioGridProps {
  limit?: number;
  showFilters?: boolean;
}

export default function PortfolioGrid({ limit, showFilters = true }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects
    .filter((project) => activeCategory === "All" || project.category === activeCategory)
    .slice(0, limit || projects.length);

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeCategory === category
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
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
                  View Project
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                  {project.category}
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
            View All Projects
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
