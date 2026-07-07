import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/Page.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("homeBg");
    return () => document.body.classList.remove("homeBg");
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/recipes");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.message || "Błąd pobierania");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="page">
      <div className="page__container">
        <header className="panel">
          <div className="panel__top">
            <h1 className="h1">Wszystkie przepisy</h1>
            <Link className="chip chip--accent" to="/">
              ← Home
            </Link>
          </div>

          <p className="p">Kliknij w przepis, żeby zobaczyć szczegóły.</p>
        </header>

        {loading ? <div className="state">Ładowanie...</div> : null}
        {error ? <div className="state state--error">Błąd: {error}</div> : null}

        {!loading && !error ? (
          <section className="section">
            <div className="section__header">
              <h2 className="h2">Lista</h2>
              <p className="hint">Źródło: /api/recipes</p>
            </div>

            <div className="grid">
              {recipes.map((r) => (
                <Link key={r._id} to={`/recipes/${r._id}`} className="cardLink">
                  <article className="card">
                    <div className="card__content">
                      <div className="card__titleRow">
                        <h3 className="card__title">{r.title}</h3>
                        <span className="pill">👁 {r.views ?? 0}</span>
                      </div>
                      <p className="card__desc">{r.description}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
