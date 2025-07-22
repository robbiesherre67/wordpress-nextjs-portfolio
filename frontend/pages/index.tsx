import { GetStaticProps } from 'next'
import Link from 'next/link'
import axios from 'axios'

type Post = {
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
}

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  if (!posts.length) {
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
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '2rem' }}>
            <h2>
              <Link href={`/posts/${post.slug}`}>
                {/** No <a> wrapper needed in Next.js 13+ */}
                <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              </Link>
            </h2>
            <div
              style={{ margin: '0.5rem 0' }}
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link href={`/posts/${post.slug}`}>
              <button style={{ padding: '0.5rem 1rem' }}>Read more →</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await axios.get<Post[]>(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?_fields=slug,title,excerpt`
  )
  return { props: { posts: data } }
}