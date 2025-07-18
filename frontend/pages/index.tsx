// pages/index.tsx
import { GetStaticProps } from 'next'
import axios from 'axios'

type Post = {
  id: number
  title: { rendered: string }
  content: { rendered: string }
}

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  // DEBUG: log the shape of `posts`
  console.log('🚀 posts prop is:', posts)

  if (!Array.isArray(posts)) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Error</h1>
        <p>`posts` is not an array (it’s <code>{typeof posts}</code>)</p>
      </main>
    )
  }

  if (posts.length === 0) {
    return (
      <main style={{ padding: '2rem' }}>
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
          <h2
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      ))}
    </main>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    // ⚠️ make sure to destructure `.data` here!
    const { data } = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?_embed`
    )
    return {
      props: { posts: data },
      revalidate: 30,
    }
  } catch (err) {
    console.error('Failed to fetch posts:', err)
    return { props: { posts: [] } }
  }
}
