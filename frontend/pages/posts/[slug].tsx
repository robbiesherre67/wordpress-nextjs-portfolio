// frontend/pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import axios from 'axios'
import Head from 'next/head'
import stripTags from 'striptags'
import BlockRenderer from '../../components/BlockRenderer'

type Post = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
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
        <p>
          <Link href="/">← Back to Home</Link>
        </p>
      </main>
    )
  }

  const titleText = stripTags(post.title.rendered)
  const description = stripTags(post.excerpt.rendered || post.content.raw).slice(0, 160)

  return (
    <>
<Head>
  <title>{`${titleText} | My Portfolio`}</title>
  <meta name="description" content={description} />

  {/* Open Graph tags */}
  <meta property="og:title" content={titleText} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="article" />
  <meta
    property="og:url"
    content={`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug}`}
  />
  <meta
    property="og:image"
    content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-default.png`}
  />
</Head>

      <main style={{ maxWidth: 800, margin: 'auto', padding: '2rem' }}>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <article>
          <BlockRenderer raw={post.content.raw} />
        </article>
        <p>
          <Link href="/">← Back to Home</Link>
        </p>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch only slugs for all posts
  const { data: posts } = await axios.get<{ slug: string }[]>(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?_fields=slug`
  )

  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string
    const { data } = await axios.get<Post[]>(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/posts?slug=${slug}&_embed&_fields=slug,title,excerpt,content.raw`
    )
    return { props: { post: data[0] || null } }
  } catch (err) {
    console.error('Failed to fetch post:', err)
    return { props: { post: null } }
  }
}