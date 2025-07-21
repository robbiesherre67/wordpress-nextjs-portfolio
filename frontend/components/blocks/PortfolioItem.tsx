import React from 'react'
import Image from 'next/image'

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
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: '56.25%', // 16:9 aspect ratio
      marginTop: '0.5rem',
    }}
  >
    <Image
      src={imageUrl}
      alt={title}
      fill
      style={{ objectFit: 'contain' }}
      sizes="(max-width: 800px) 100vw, 800px"
    />
  </div>
)}
      </a>
    </div>
  )
}
