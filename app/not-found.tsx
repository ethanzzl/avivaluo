import Link from "next/link";

export default function NotFound() {
  return (
    <main className="contact-panel">
      <p className="eyebrow">404</p>
      <h1>这里还没有内容。<br />Nothing here yet.</h1>
      <p className="contact-lead">返回首页继续浏览作品。 / Return home to explore the work.</p>
      <Link className="outline-cta" href="/">返回首页 / Home</Link>
    </main>
  );
}
