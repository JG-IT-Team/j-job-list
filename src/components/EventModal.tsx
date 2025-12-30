'use client'

import { X, Calendar, MapPin, Briefcase } from 'lucide-react'
import type { Event } from '@/lib/supabase'
import LinkifyText from './LinkifyText'

interface EventModalProps {
  event: Event | null
  onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h2 className="font-bold text-lg text-gray-900 pr-8">{event.title}</h2>
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Meta info */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
            {event.event_date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {event.event_date}
              </span>
            )}
            {event.job_location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.job_location}
              </span>
            )}
            {event.industry && (
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {event.industry}
              </span>
            )}
          </div>

          {/* Description with auto-linked emails and URLs */}
          {event.description && (
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
              <LinkifyText text={event.description} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
