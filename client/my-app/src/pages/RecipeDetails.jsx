import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "@/styles/Page.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("homeBg");
    return () => document.body.classList.remove("homeBg");
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRecipe(data);
      } catch (e) {
        setError(e?.message || "Błąd pobierania");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <main className="page">
      <div className="page__container">
        <div className="row" style={{ marginBottom: 14 }}>
          <Link className="link" to="/recipes">
            ← Wróć do listy
          </Link>
          <Link className="link" to="/">
            Home
          </Link>
        </div>

        {loading ? <div className="state">Ładowanie...</div> : null}
        {error ? <div className="state state--error">Błąd: {error}</div> : null}

        {!loading && !error && recipe ? (
          <>
            <article className="panel">
              <div className="panel__top">
                <h1 className="h1">{recipe.title}</h1>
                <span className="chip chip--accent">Recipe</span>
              </div>

              <p className="p">{recipe.description}</p>

              <div className="row">
                <span className="chip">
                  <span className="chip__dot" />
                  👁 Views: {recipe.views ?? 0}
                </span>
                <span className="chip">Składniki: {recipe.ingredients?.length ?? 0}</span>
                <span className="chip">Kroki: {recipe.steps?.length ?? 0}</span>
              </div>
            </article>

            <section className="section">
              <div className="section__header">
                <h2 className="h2">Składniki</h2>
                <p className="hint">Dodajemy później gramatury</p>
              </div>

              <div className="panel">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {(recipe.ingredients || []).map((ing, idx) => (
                    <li key={idx} style={{ color: "rgba(230,237,243,0.9)", lineHeight: 1.6 }}>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="section">
              <div className="section__header">
                <h2 className="h2">Kroki</h2>
                <p className="hint">Kolejność przygotowania</p>
              </div>

              <div className="panel">
                <ol style={{ margin: 0, paddingLeft: 18 }}>
                  {(recipe.steps || []).map((step, idx) => (
                    <li key={idx} style={{ color: "rgba(230,237,243,0.9)", lineHeight: 1.6 }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}