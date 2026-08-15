import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import ArrowIcon from "../ArrowIcon";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export default function BlogSection() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="home-blog layout-block">
      <div className="common-info">
        <div className="common-info__title" role="heading" aria-level={2}>
          <div className="common-info__title--line h2-fluid theme-contrast">
            <span>04</span>
          </div>
          <div className="common-info__title--line has-label h2-fluid" data-section="Sec-04">
            <span>Blog</span>
          </div>
        </div>
        <div className="common-info__content">
          <div className="layout-grid">
            <div className="info">
              <h2 className="display">Notes &amp; post-mortems</h2>
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
                  <span className="blog-item__arrow">
                    <ArrowIcon />
                  </span>
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
          <div className="layout-grid">
            <div className="info">
              <Link
                href="/blog"
                className="home-projects__pag-cta blog-section__more"
                aria-label="All posts"
              >
                <ArrowIcon tone="current" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}