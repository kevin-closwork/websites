import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { getAllPosts, parseBlogDate } from "@/lib/blog";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

const Blog = () => {
  const posts = getAllPosts();

  return (
    <>
      <Helmet>
        <title>Blog — Closwork | Ventas B2B, closers y resultados</title>
        <meta
          name="description"
          content="Artículos sobre ventas B2B, closers remotos y cómo construir fuerza comercial sin nómina. Closwork, LATAM."
        />
        <meta property="og:title" content="Blog — Closwork" />
        <meta property="og:description" content="Guías y notas sobre ventas B2B y closers por comisión." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background landing-page flex flex-col">
        <BlogHeader />

        <main className="flex-1">
          <section className="py-16 md:py-20 border-b border-border bg-gradient-to-b from-muted/40 to-transparent">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                Blog{" "}
                <span className="text-transparent bg-gradient-to-r from-primary to-primary-glow bg-clip-text">
                  Closwork
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Estrategia comercial, closers remotos y mejores prácticas para vender más sin ampliar tu nómina.
              </p>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <ul className="space-y-6">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <article className="group rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/30">
                      <Link to={`/blog/${post.slug}`} className="block">
                        <h2 className="text-xl md:text-2xl font-semibold text-secondary group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" aria-hidden />
                          <time dateTime={post.date}>
                            {(() => {
                              try {
                                return format(parseBlogDate(post.date), "d MMMM yyyy", {
                                  locale: es,
                                });
                              } catch {
                                return post.date;
                              }
                            })()}
                          </time>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-4 h-4" aria-hidden />
                          {post.readingTimeMinutes} min de lectura
                        </span>
                        {post.author ? (
                          <span>Por {post.author}</span>
                        ) : null}
                      </div>
                      <div className="mt-4">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-primary font-semibold text-sm hover:underline underline-offset-4"
                        >
                          Leer artículo →
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>

              {posts.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  No hay entradas publicadas todavía.
                </p>
              ) : null}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
