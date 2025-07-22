import { GetStaticProps } from 'next'
import Link from 'next/link'
import axios from 'axios'

type Post = {
  slug: string
  title: { rendered: string }
}

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  // If there are no posts, show a friendly message
  if (!posts.length) {
    return (
      <main style={{ maxWidth: 800, margin: 'auto', padding: '2rem' }}>
        <h1>My Portfolio</h1>
        <p>No posts to display yet.</p>
      </main>
    )
  }

  // Otherwise render the list of posts
  return (
    <main style={{ maxWidth: 800, margin: 'auto', padding: '2rem' }}>
      <h1>My Portfolio</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '1rem' }}>
            <Link href={`/posts/${post.slug}`}>
            <h2
              dangerouslySetInnerHTML={{
                __html: post.title.rendered,
              }}
            />
          </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await axios.get<Pick<Post, 'slug' | 'title'>[]>(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?_fields=slug,title`
  )
  return {
    props: { posts: data },
  }
}
