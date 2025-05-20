import { useState } from "react";

export default function AlunniRiga(props) {
  const a = props.alunno;
  const caricaAlunni = props.caricaAlunni;

  const [confermaElimina, setConfermaElimina] = useState(false);
  const [confermaModifica, setConfermaModifica] = useState(false);

  const [nome, setNome] = useState(a.nome);
  const [cognome, setCognome] = useState(a.cognome);

  async function eliminaAlunno() {
    await fetch(`http://localhost:8080/alunni/${a.id}`, { method: "DELETE" });
    caricaAlunni();
    setConfermaElimina(false);
  }

  async function modificaAlunno() {
    await fetch(`http://localhost:8080/alunni/${a.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cognome }),
    });
    caricaAlunni();
    setConfermaModifica(false);
  }

  return (
    <tr>
      <td>{a.id}</td>
      <td>
        {confermaModifica ? (
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} autoFocus/>
        ) : (
          a.nome
        )}
      </td>
      <td>
        {confermaModifica ? (
          <input type="text" value={cognome} onChange={(e) => setCognome(e.target.value)}/>
        ) : (
          a.cognome
        )}
      </td>
      <td>
        {confermaElimina ? (
          <div>
            sei sicuro?
            <button onClick={eliminaAlunno}>si</button>
            <button onClick={() => setConfermaElimina(false)}>no</button>
          </div>
        ) : (
          <button onClick={() => setConfermaElimina(true)}>elimina</button>
        )}
      </td>
      <td colSpan={2}>
        {confermaModifica ? (
          <>
            <button onClick={modificaAlunno}>salva</button>
            <button
              onClick={() => {
                setNome(a.nome);
                setCognome(a.cognome);
                setConfermaModifica(false);
              }}
            >
              non salvare
            </button>
          </>
        ) : (
          <button onClick={() => setConfermaModifica(true)}>modifica nome e cognome</button>
        )}
      </td>
    </tr>
  );
}


