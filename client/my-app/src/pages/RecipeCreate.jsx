import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Page.css";

const toLines = (text) =>
  (text || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

export default function RecipeCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");

  useEffect(() => {
    document.body.classList.add("homeBg");
    return () => document.body.classList.remove("homeBg");
  }, []);

  const preview = useMemo(() => {
    const ingredients = toLines(ingredientsText);
    const steps = toLines(stepsText);
    return { ingredients, steps };
  }, [ingredientsText, stepsText]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setOkMsg("");

    if (!title.trim()) return setError("Podaj tytuł.");
    if (!description.trim()) return setError("Podaj opis.");
    if (preview.ingredients.length === 0) return setError("Dodaj przynajmniej 1 składnik (1 linia = 1 składnik).");
    if (preview.steps.length === 0) return setError("Dodaj przynajmniej 1 krok (1 linia = 1 krok).");

    setSaving(true);
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          ingredients: preview.ingredients,
          steps: preview.steps,
          imageUrl: imageUrl.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}${txt ? `: ${txt}` : ""}`);
      }

      const created = await res.json();
      setOkMsg("Dodano przepis. Przekierowuję…");

      // React Router v6: po udanym zapisie na stronę szczegółów [web:2141]
      navigate(`/recipes/${created._id}`, { replace: true });
    } catch (err) {
      setError(err?.message || "Błąd zapisu");
    } finally {
      setSaving(false);
    }
  };

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

        <header className="panel">
          <div className="panel__top">
            <h1 className="h1">Dodaj przepis</h1>
            <span className="chip chip--accent">Public</span>
          </div>
          <p className="p">Na razie każdy może dodać przepis. Później podepniemy to pod użytkowników.</p>
        </header>

        {error ? <div className="state state--error">Błąd: {error}</div> : null}
        {okMsg ? <div className="state">{okMsg}</div> : null}

        <section className="section">
          <div className="panel">
            <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
              <label>
                <div className="hint">Tytuł</div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Np. Makaron carbonara"
                  className="input"
                />
              </label>

              <label>
                <div className="hint">Opis</div>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Krótki opis przepisu"
                  className="input"
                />
              </label>

              <label>
                <div className="hint">Image URL (opcjonalnie)</div>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="input"
                />
              </label>

              <label>
                <div className="hint">Składniki (1 linia = 1 składnik)</div>
                <textarea
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  placeholder={"Makaron\nJajka\nBoczek\nParmezan\nPieprz"}
                  className="textarea"
                  rows={6}
                />
              </label>

              <label>
                <div className="hint">Kroki (1 linia = 1 krok)</div>
                <textarea
                  value={stepsText}
                  onChange={(e) => setStepsText(e.target.value)}
                  placeholder={"Ugotuj makaron.\nPodsmaż boczek.\nWymieszaj jajka z serem.\nPołącz wszystko i dopraw."}
                  className="textarea"
                  rows={7}
                />
              </label>

              <div className="row">
                <button className="btn" type="submit" disabled={saving}>
                  {saving ? "Zapisywanie..." : "Dodaj przepis"}
                </button>
                <span className="chip">
                  Składniki: {preview.ingredients.length} • Kroki: {preview.steps.length}
                </span>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
