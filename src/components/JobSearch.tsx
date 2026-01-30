'use client'

import { useState } from 'react'
import { Search, RotateCcw, ChevronDown, ChevronUp, Filter } from 'lucide-react'

interface JobSearchProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCountry: string
  setSelectedCountry: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  countries: string[]
  categories: string[]
  onReset: () => void
}

export default function JobSearch({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedCategory,
  setSelectedCategory,
  countries,
  categories,
  onReset,
}: JobSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasActiveFilters = selectedCountry || selectedCategory || searchTerm

  return (
    <div className="bg-white border-b border-gray-200 sticky top-14 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Compact bar - always visible */}
        <div className="flex items-center gap-2">
          {/* Search input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Search jobs..."
            />
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1 px-3 py-2 border rounded-md text-sm transition-colors ${
              hasActiveFilters 
                ? 'border-primary bg-red-50 text-primary' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="h-4 w-4" />
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
              title="Reset filters"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Expandable filter panel */}
        {isExpanded && (
          <div className="flex flex-col sm:flex-row gap-2 mt-2 pb-1 animate-slide-down">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary"
            >
              <option value="">All Industries</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
