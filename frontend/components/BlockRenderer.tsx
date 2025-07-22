/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { parse } from '@wordpress/blocks'
import PortfolioItem from './blocks/PortfolioItem'

type Block = {
  name: string
  attributes: Record<string, any>
  innerHTML: string
  innerBlocks: Block[]
}

const blockMap: Record<string, React.FC<any>> = {
  'portfolio-block/portfolio-item': PortfolioItem,

  // Paragraphs
  'core/paragraph': ({ innerHTML }: Block) => (
    <p dangerouslySetInnerHTML={{ __html: innerHTML }} />
  ),

  // Headings (h2–h6)
  'core/heading': ({ level, innerHTML }: Block & { level: number }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements
    return <Tag dangerouslySetInnerHTML={{ __html: innerHTML }} />
  },

  // Images
  'core/image': ({
    url,
    alt,
    caption,
  }: Block & { url: string; alt?: string; caption?: string }) => {
    if (!url) return null
    return (
      <figure style={{ margin: '2rem 0' }}>
        <img
          src={url}
          alt={alt || ''}
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
        {caption && (
          <figcaption
            style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        )}
      </figure>
    )
  },

  // Fallback for any other block types
  default: ({ innerHTML }: Block) => (
    <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
  ),
}

export default function BlockRenderer({ raw }: { raw: string }) {
  const blocks: Block[] = parse(raw) as any

  return (
    <>
      {blocks.map((blk, i) => {
        const Component = blockMap[blk.name] || blockMap.default
        return (
          <Component
            key={i}
            {...blk.attributes}
            innerHTML={blk.innerHTML}
          />
        )
      })}
    </>
  )
}