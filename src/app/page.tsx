'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase, type Job, type Event } from '@/lib/supabase'
import Header from '@/components/Header'
import JobSearch from '@/components/JobSearch'
import JobCard from '@/components/JobCard'
import EventsSection from '@/components/EventsSection'
import FloatingButtons from '@/components/FloatingButtons'

export default function Home() {
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
        const [jobsRes, eventsRes] = await Promise.all([
          supabase.from('job_list').select('*').order('id', { ascending: false }),
          supabase.from('event_list').select('*').order('created_at', { ascending: false }),
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
  }, [])

  // Get unique countries and categories for filters
  const countries = useMemo(() => {
    const unique = [...new Set(jobs.map((j) => j.country).filter(Boolean))] as string[]
    return unique.sort()
  }, [jobs])

  const categories = useMemo(() => {
    const sourceJobs = selectedCountry
      ? jobs.filter((j) => j.country === selectedCountry)
      : jobs
    const unique = [...new Set(sourceJobs.map((j) => j.category).filter(Boolean))] as string[]
    return unique.sort()
  }, [jobs, selectedCountry])

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setSelectedCategory('')
  }

  // Client-side filtering
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchTerm || job.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCountry = !selectedCountry || job.country === selectedCountry
      const matchesCategory = !selectedCategory || job.category === selectedCategory
      return matchesSearch && matchesCountry && matchesCategory
    })
  }, [jobs, searchTerm, selectedCountry, selectedCategory])

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
            <h2 className="text-base font-medium text-gray-900">Latest Jobs</h2>
            <span className="text-xs text-gray-500">{filteredJobs.length} jobs found</span>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading jobs...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No jobs found. Try adjusting your search or filters.
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
      <EventsSection events={events} />

      {/* Floating action buttons */}
      <FloatingButtons />
    </main>
  )
}
