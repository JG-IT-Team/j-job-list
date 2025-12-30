'use client'

import { ArrowUp, CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events')
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[60] items-end">
      {/* Back to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all animate-fade-in"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Events shortcut */}
      <button
        onClick={scrollToEvents}
        className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-3 rounded-full shadow-lg hover:from-emerald-600 hover:to-cyan-600 transition-all flex items-center gap-2 font-medium"
        title="Go to Events"
      >
        <CalendarDays className="w-5 h-5" />
        <span className="hidden sm:inline">Go to Events/Interviews</span>
        <span className="sm:hidden">Events/Interviews</span>
      </button>
    </div>
  )
}
