export default function SiteFooter() {
  return (
    <footer className="py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row gap-2 justify-content-between align-items-center">
        <p className="m-0 small">© {new Date().getFullYear()} Disociando · USTA Tunja — Semillero PIXELES</p>
        <p className="m-0 small"><a className="link-secondary" href="/rss.xml">RSS</a></p>
      </div>
    </footer>
  );
}
