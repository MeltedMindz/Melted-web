import { siteConfig, writing, projects } from "@/data/content";
import ParticleNetwork from "@/components/ParticleNetwork";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/92 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5">
          <div className="flex items-center justify-center md:justify-start gap-6 md:gap-10">
            <a href="#top" className="text-sm tracking-wide hover:text-[var(--text-secondary)] transition-colors py-2">
              Home
            </a>
            <a href="#writing" className="text-sm tracking-wide hover:text-[var(--text-secondary)] transition-colors py-2">
              Writing
            </a>
            <a href="#projects" className="text-sm tracking-wide hover:text-[var(--text-secondary)] transition-colors py-2">
              Projects
            </a>
            <a href="#contact" className="text-sm tracking-wide hover:text-[var(--text-secondary)] transition-colors py-2">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="min-h-dvh flex items-center relative pt-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Visual - Shows first on mobile/tablet */}
            <div className="order-first lg:order-last h-[200px] md:h-[300px] lg:h-[500px]">
              <ParticleNetwork />
            </div>
            
            {/* Content */}
            <div className="text-center lg:text-left">
              <p className="text-[0.7rem] tracking-[0.3em] text-[var(--text-muted)] mb-6 animate-in">
                {siteConfig.role}
              </p>
              <h1 className="serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-[var(--text-primary)] mb-6 animate-in delay-1">
                {siteConfig.name}
              </h1>
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto lg:mx-0 animate-in delay-2">
                {siteConfig.bio}
              </p>
              
              {/* Social links */}
              <div className="flex items-center justify-center lg:justify-start gap-6 mt-10 animate-in delay-3">
                {siteConfig.socials.github && (
                  <a 
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-2"
                  >
                    GitHub
                  </a>
                )}
                {siteConfig.socials.twitter && (
                  <a 
                    href={siteConfig.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-2"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-in delay-4">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--text-muted)] to-transparent opacity-30" />
        </div>
      </section>

      {/* Writing Section */}
      <section id="writing" className="py-16 md:py-24 lg:py-32 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)]">Writing</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-6">
                {writing.map((item) => (
                  <Link
                    key={item.id}
                    href={`/writing/${item.slug}`}
                    className="group block bg-[#141414] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(255,255,255,0.15)] hover:-translate-y-0.5"
                  >
                    <div className="relative w-full h-[100px] md:h-[120px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center overflow-hidden">
                      {/* Decorative circles */}
                      <div className="absolute w-[200px] h-[200px] border border-white/[0.03] rounded-full" />
                      <div className="absolute w-[150px] h-[150px] border border-white/[0.05] rounded-full" />
                      <div className="absolute w-[100px] h-[100px] border border-white/[0.07] rounded-full" />
                      <span className="relative z-10 text-[0.65rem] tracking-[0.3em] text-[var(--text-muted)] opacity-60">ARTICLE</span>
                    </div>
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                        {item.publication && (
                          <span className="italic">{item.publication}</span>
                        )}
                        <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 lg:py-32 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)]">Projects</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-4">
                {projects.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-[#141414] border border-[var(--border)] rounded-xl p-6 transition-all duration-300 hover:border-[rgba(255,255,255,0.15)] hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="serif text-xl md:text-2xl text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-all duration-300">
                        →
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base mb-4">
                      {item.description}
                    </p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.7rem] px-2.5 py-1 bg-white/5 rounded text-[var(--text-muted)] tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 lg:py-32 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] tracking-[0.3em] text-[var(--text-muted)] mb-6">
              CONTACT
            </p>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-[var(--text-primary)] mb-6">
              Let&apos;s work together
            </h2>
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              I&apos;m always interested in hearing about new projects, especially those focused on security and decentralized systems.
            </p>
            {siteConfig.email && (
              <a 
                href={`mailto:${siteConfig.email}`}
                className="inline-block text-base md:text-lg text-[var(--text-primary)] border-b border-[var(--text-muted)] hover:border-[var(--text-primary)] transition-colors pb-1"
              >
                {siteConfig.email}
              </a>
            )}
          </div>
        </div>
      </section>

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
