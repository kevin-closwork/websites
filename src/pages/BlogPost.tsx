import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { getPostBySlug } from "@/lib/blog";
import NotFound from "@/pages/NotFound";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  const path = slug ? `/blog/${slug}` : "/blog";
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  if (!slug || !post) {
    return <NotFound />;
  }

  let formattedDate: string = post.date;
  try {
    formattedDate = format(new Date(post.date), "d MMMM yyyy", { locale: es });
  } catch {
    /* keep raw */
  }

  const canonical = origin ? `${origin}${path}` : path;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author ?? "Closwork",
    },
    publisher: {
      "@type": "Organization",
      name: "Closwork",
    },
    mainEntityOfPage: canonical,
    url: canonical,
  };

  return (
    <>
      <Helmet>
        <title>{post.title} — Blog Closwork</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background landing-page flex flex-col">
        <BlogHeader />

        <article className="flex-1">
          <div className="border-b bg-muted/30">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al blog
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-secondary leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <time dateTime={post.date}>{formattedDate}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTimeMinutes} min de lectura</span>
                {post.author ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>Por {post.author}</span>
                  </>
                ) : null}
              </div>
              {post.tags && post.tags.length > 0 ? (
                <ul className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-primary/10 text-primary px-3 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="container mx-auto px-4 py-10 max-w-3xl">
            <div
              className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-semibold prose-headings:text-secondary
              prose-p:text-foreground prose-p:leading-relaxed
              prose-a:no-underline
              prose-strong:text-secondary prose-strong:font-semibold
              prose-li:marker:text-primary
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-secondary prose-pre:text-secondary-foreground
              prose-hr:border-border
              prose-table:text-sm prose-th:text-secondary prose-td:border-border"
            >
              <BlogMarkdown markdown={post.content} />
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
