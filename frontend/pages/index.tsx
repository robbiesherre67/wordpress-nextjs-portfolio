import { GetStaticProps } from 'next'
import Link from 'next/link'
import axios from 'axios'
import styles from '../styles/Home.module.css'

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
      <main className={styles.container}>
        <h1>My WP Custom Portfolio</h1>
        <p>No posts to display yet.</p>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <h1>My WP Custom Portfolio</h1>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <Link href={`/posts/${post.slug}`}>
              <h2
                className={styles.titleLink}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </Link>
            <div
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link href={`/posts/${post.slug}`} className={styles.readMore}>
              Read more →
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