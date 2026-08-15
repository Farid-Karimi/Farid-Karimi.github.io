import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="blog-page layout-block">
      <div className="common-info">
        <div className="common-info__title">
          <div className="common-info__title--line has-label">
            <span>04 — Blog</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h1 className="display">Notes &amp; post-mortems</h1>
            </div>
          </div>
          <div className="common-thoughts-list__content">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-item a-div">
                <div className="blog-item__row">
                  <div className="h3">{post.title}</div>
                  <div className="label">{formatDate(post.date)}</div>
                </div>
                <div className="blog-item__row">
                  <p className="p description-text">{post.excerpt}</p>
                </div>
                <div className="blog-item__tags">
                  {post.tags.map((tag) => (
                    <span className="label" key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}