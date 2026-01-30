'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams, notFound } from 'next/navigation'
import { supabase, type Job, type Event } from '@/lib/supabase'
import Header from '@/components/Header'
import JobSearch from '@/components/JobSearch'
import JobCard from '@/components/JobCard'
import EventsSection from '@/components/EventsSection'
import FloatingButtons from '@/components/FloatingButtons'

const countryMapping: Record<string, string> = {
  ph: 'Philippines',
  in: 'India',
  np: 'Nepal',
  ma: 'Morocco',
  tn: 'Tunisia',
}

export default function CountryPage() {
  const params = useParams()
  const countryCode = params.countryCode as string
  const countrySource = countryMapping[countryCode.toLowerCase()]

  if (!countrySource) {
    notFound()
  }

  const [jobs, setJobs] = useState<Job[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [jobsRes, eventsRes] = await Promise.all([
          supabase
            .from('jobs')
            .select('*')
            .eq('job_source', countrySource)
            .eq('status', 'Open')
            .order('id', { ascending: false }),
          supabase
            .from('events')
            .select('*')
            .eq('job_source', countrySource)
            .eq('status', 'Open')
            .order('created_at', { ascending: false }),
        ])

        if (jobsRes.data) setJobs(jobsRes.data)
        if (eventsRes.data) setEvents(eventsRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [countrySource])

  // Get unique countries and categories (industries) for filters
  const countries = useMemo(() => {
    const jobCountries = jobs.map((j) => j.job_location)
    const eventCountries = events.map((e) => e.job_location)
    const unique = [...new Set([...jobCountries, ...eventCountries].filter(Boolean))] as string[]
    return unique.sort()
  }, [jobs, events])

  const categories = useMemo(() => {
    const jobCategories = selectedCountry
      ? jobs.filter((j) => j.job_location === selectedCountry).map((j) => j.industry)
      : jobs.map((j) => j.industry)
    
    const eventIndustries = selectedCountry
      ? events.filter((e) => e.job_location === selectedCountry).map((e) => e.industry)
      : events.map((e) => e.industry)

    const unique = [...new Set([...jobCategories, ...eventIndustries].filter(Boolean))] as string[]
    return unique.sort()
  }, [jobs, events, selectedCountry])

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setSelectedCategory('')
  }

  // Client-side filtering
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchTerm || job.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCountry = !selectedCountry || job.job_location === selectedCountry
      const matchesCategory = !selectedCategory || job.industry === selectedCategory
      return matchesSearch && matchesCountry && matchesCategory
    })
  }, [jobs, searchTerm, selectedCountry, selectedCategory])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        !searchTerm || 
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCountry = !selectedCountry || event.job_location === selectedCountry
      const matchesCategory = !selectedCategory || event.industry === selectedCategory
      return matchesSearch && matchesCountry && matchesCategory
    })
  }, [events, searchTerm, selectedCountry, selectedCategory])

  const handleReset = () => {
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedCategory('')
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-20">
      <Header />

      <JobSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCountry={selectedCountry}
        setSelectedCountry={handleCountryChange}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        countries={countries}
        categories={categories}
        onReset={handleReset}
      />

      {/* Job listings */}
      <section className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs text-gray-900">Latest Jobs for {countrySource} Applicants</h2>
            <span className="text-xs text-gray-500">{filteredJobs.length} jobs found</span>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading jobs...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No jobs found for {countrySource}.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events section */}
      <EventsSection events={filteredEvents} />

      {/* Floating action buttons */}
      <FloatingButtons />
    </main>
  )
}
