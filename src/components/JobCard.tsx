'use client'

import { MapPin, Briefcase, Mail, ExternalLink } from 'lucide-react'
import type { Job } from '@/lib/supabase'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const isOpen = job.status?.toLowerCase() === 'open'

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">Confidential Company</span>
        <span
          className={`text-xs px-2 py-0.5 rounded border ${
            isOpen
              ? 'bg-green-50 text-green-600 border-green-100'
              : 'bg-gray-50 text-gray-500 border-gray-200'
          }`}
        >
          {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      {/* Job title */}
      <h3 className="text-base font-bold text-gray-900 mb-2">{job.job_title}</h3>

      {/* Info row */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
        {job.job_location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job.job_location}
          </span>
        )}
        {job.industry && (
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {job.industry}
          </span>
        )}
        {job.email && (
          <a
            href={`mailto:${job.email}`}
            className="flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
          >
            <Mail className="w-3 h-3" />
            {job.email}
          </a>
        )}
      </div>

      {/* Apply button */}
      {job.apply_link && (
        <a
          href={job.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center text-sm py-2 flex items-center justify-center gap-1"
        >
          Apply Now
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  )
}
