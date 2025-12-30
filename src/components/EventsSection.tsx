'use client'

import { useState } from 'react'
import { Calendar, MapPin, Briefcase } from 'lucide-react'
import type { Event } from '@/lib/supabase'
import EventModal from './EventModal'

interface EventsSectionProps {
  events: Event[]
}

export default function EventsSection({ events }: EventsSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  if (events.length === 0) return null

  return (
    <>
      <section id="events" className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-md font-bold text-gray-900 mb-3">Upcoming Events</h2>

          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>

                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                  {event.event_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.event_date}
                    </span>
                  )}
                  {event.job_location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.job_location}
                    </span>
                  )}
                  {event.industry && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {event.industry}
                    </span>
                  )}
                </div>

                {event.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                )}
                
                <span className="text-xs text-primary font-medium mt-2 inline-block">
                  Tap for details →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  )
}
