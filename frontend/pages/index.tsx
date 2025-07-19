import { GetStaticProps } from 'next'
import Link from 'next/link'
import axios from 'axios'

type Post = {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
}

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <main style={{ maxWidth: 800, margin: 'auto', padding: '2rem' }}>
        <h1>My Portfolio</h1>
        <p>No posts to display yet.</p>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 800, margin: 'auto', padding: '2rem' }}>
      <h1>My Portfolio</h1>
      {posts.map((post) => (
        <article key={post.id} style={{ marginBottom: '2rem' }}>
          <Link href={`/posts/${post.slug}`}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      ))}
    </main>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const { data } = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?_embed`
    )
    return { props: { posts: data } }
  } catch (err) {
    console.error('Failed to fetch posts:', err)
    return { props: { posts: [] } }
  }
}
