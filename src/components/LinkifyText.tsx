'use client'

import React from 'react'

// Regex patterns for URLs and emails
const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g
const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

interface LinkifyTextProps {
  text: string
  className?: string
}

export default function LinkifyText({ text, className }: LinkifyTextProps) {
  // Split text by URLs and emails, keeping delimiters
  const parts = text.split(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s]|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if part is a URL
        if (urlRegex.test(part)) {
          urlRegex.lastIndex = 0 // Reset regex state
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              {part}
            </a>
          )
        }
        // Check if part is an email
        if (emailRegex.test(part)) {
          emailRegex.lastIndex = 0 // Reset regex state
          return (
            <a
              key={index}
              href={`mailto:${part}`}
              className="text-primary hover:underline"
            >
              {part}
            </a>
          )
        }
        // Regular text
        return <React.Fragment key={index}>{part}</React.Fragment>
      })}
    </span>
  )
}
