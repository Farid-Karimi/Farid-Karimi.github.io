import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const html = marked.parse(post.body) as string;

  return (
    <article className="blog-post layout-block">
      <div className="common-info">
        <div className="common-info__title">
          <div className="common-info__title--line has-label">
            <span>04 — Blog</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <Link href="/blog" className="blog-post__back label">
                ← All posts
              </Link>
              <h1 className="display">{post.title}</h1>
              <div className="blog-post__meta">
                <span className="label">{formatDate(post.date)}</span>
                {post.tags.map((tag) => (
                  <span className="label" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="layout-grid">
            <div className="info">
              <div
                className="blog-post__body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}