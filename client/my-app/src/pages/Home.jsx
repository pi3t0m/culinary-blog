import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Page.css";

export default function Home() {
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
        const res = await fetch("/api/recipes/popular?limit=6");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.message || "Błąd pobierania danych");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const count = recipes.length;
    const totalViews = recipes.reduce((sum, r) => sum + (Number(r?.views) || 0), 0);
    return { count, totalViews };
  }, [recipes]);

  return (
    <main className="page">
      <div className="page__container">
        <header className="panel">
          <div className="panel__top">
            <h1 className="h1">Culinary Blog</h1>
            <Link className="chip chip--accent" to="/recipes">
              Wszystkie przepisy →
            </Link>
          </div>

          <p className="p">
            Najpopularniejsze przepisy z bazy. Kliknięcia w szczegóły przepisu mogą zwiększać liczbę wyświetleń.
          </p>

          <div className="row">
            <span className="chip">
              <span className="chip__dot" />
              Backend: /api
            </span>
            <span className="chip">Na liście: {stats.count}</span>
            <span className="chip">Suma views: {stats.totalViews}</span>
          </div>
        </header>

        <section className="section">
          <div className="section__header">
            <h2 className="h2">Najpopularniejsze przepisy</h2>
            <p className="hint">Sortowanie: views ↓</p>
          </div>

          {loading ? <div className="state">Ładowanie...</div> : null}
          {error ? <div className="state state--error">Błąd: {error}</div> : null}

          {!loading && !error ? (
            <div className="grid">
              {recipes.map((r) => (
                <Link key={r._id} to={`/recipes/${r._id}`} className="cardLink">
                  <article className="card">
                    <div className="card__media">
                      {r.imageUrl ? (
                        <img className="card__img" src={r.imageUrl} alt={r.title} loading="lazy" />
                      ) : (
                        <div className="card__placeholder">Brak zdjęcia</div>
                      )}
                    </div>

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
          ) : null}
        </section>
      </div>
    </main>
  );
}
