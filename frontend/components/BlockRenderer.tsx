/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { parse } from '@wordpress/blocks'
import PortfolioItem from './blocks/PortfolioItem'

type Block = {
  name: string
  attrs: Record<string, any>
  innerHTML: string
}

const blockMap: Record<string, React.FC<any>> = {
  'portfolio-block/portfolio-item': PortfolioItem,
  'core/paragraph': ({ innerHTML }: Block) => (
    <p dangerouslySetInnerHTML={{ __html: innerHTML }} />
  ),
  // Map additional block names to components here...
}

export default function BlockRenderer({ raw }: { raw: string }) {
  const blocks: Block[] = parse(raw) as any

  return (
    <>
      {blocks.map((blk, i) => {
        const Component = blockMap[blk.name] || (() => (
          <div dangerouslySetInnerHTML={{ __html: blk.innerHTML }} />
        ))
        return <Component key={i} {...blk.attrs} />
      })}
    </>
  )
}
