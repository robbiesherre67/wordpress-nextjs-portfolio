import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import axios from 'axios'
import BlockRenderer from '../../components/BlockRenderer'

type Post = {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string; raw: string }
}

interface PostPageProps {
  post: Post | null
}

export default function PostPage({ post }: PostPageProps) {
  if (!post) {
    return (
      <main style={{ maxWidth: 800, margin: 'auto', padding: '2rem' }}>
        <h1>Post Not Found</h1>
        <p><Link href="/">← Back to Home</Link></p>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 800, margin: 'auto', padding: '2rem' }}>
    <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
    <article>
      <BlockRenderer raw={post.content.raw} />
    </article>
      <p><Link href="/">← Back to Home</Link></p>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: posts } = await axios.get<Post[]>(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts`
  )
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string
    const { data } = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?slug=${slug}&_embed`
    )
    return { props: { post: data[0] || null } }
  } catch (err) {
    console.error('Failed to fetch post:', err)
    return { props: { post: null } }
  }
}
