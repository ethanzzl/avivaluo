import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Link className="brand" href="/" aria-label="Aviva大双">Aviva大双</Link>
      <section className="not-found-content">
        <p className="eyebrow">404 / Page not found</p>
        <h1>这里还没有内容。<br />Nothing here yet.</h1>
        <div>
          <p>返回首页继续浏览作品。<br />Return home to explore the work.</p>
          <Link className="solid-cta" href="/">返回首页 / Home <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
