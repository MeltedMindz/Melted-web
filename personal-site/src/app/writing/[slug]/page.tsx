import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { writing, getWritingBySlug, siteConfig } from "@/data/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return writing.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getWritingBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const ogImageUrl = `https://meltedmindz.com/api/og?title=${encodeURIComponent(article.title)}`;

  return {
    title: `${article.title} | MELTED`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://meltedmindz.com/writing/${article.slug}`,
      siteName: "MELTED",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@MeltedMindz",
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getWritingBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/92 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="text-sm tracking-wide hover:text-[var(--text-secondary)] transition-colors py-2">
              Home
            </Link>
            <Link href="/#writing" className="text-sm tracking-wide hover:text-[var(--text-secondary)] transition-colors py-2">
              Writing
            </Link>
            <Link href="/#projects" className="text-sm tracking-wide hover:text-[var(--text-secondary)] transition-colors py-2">
              Projects
            </Link>
            <Link href="/#contact" className="text-sm tracking-wide hover:text-[var(--text-secondary)] transition-colors py-2">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Preview */}
      <main className="pt-32 pb-20 px-5 md:px-8">
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            href="/#writing" 
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-12"
          >
            <span>←</span>
            <span>Back to Writing</span>
          </Link>

          {/* Article header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mb-6">
              {article.publication && (
                <span className="italic">{article.publication}</span>
              )}
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
              <span>{article.year}</span>
            </div>

            <h1 className="serif text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] leading-tight mb-8">
              {article.title}
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
              {article.description}
            </p>
          </header>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
              <div className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
              <div className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-[var(--text-secondary)] mb-8">
              Continue reading the full article on {article.publication}.
            </p>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium rounded-lg hover:bg-[var(--text-secondary)] transition-colors"
            >
              <span>Read Full Article</span>
              <span>→</span>
            </a>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="py-8 md:py-10 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              Built with intention
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
