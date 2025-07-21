import React from 'react'

interface PortfolioItemProps {
  title: string
  imageUrl: string
  link: string
}

export default function PortfolioItem({ title, imageUrl, link }: PortfolioItemProps) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <h3>{title}</h3>
        {imageUrl && (
          <image
            src={imageUrl}
            alt={title}
            style={{ maxWidth: '100%', height: 'auto', display: 'block', marginTop: '0.5rem' }}
          />
        )}
      </a>
    </div>
  )
}
