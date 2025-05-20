import { useState } from "react";
export default function AlunniRiga(props) {
    const a = props.alunno;
    const caricaAlunni = props.caricaAlunni;
    const [conferma, setConferma] = useState(false);
    async function eliminaAlunno(){
        const data = await fetch(`http://localhost:8080/alunni/${a.id}`, { method: "DELETE" });
        caricaAlunni();
    }
    return (
        <tr> 
            <td>{a.id}</td>
            <td>{a.nome}</td>
            <td>{a.cognome}</td>
            <td>
                {conferma ? (
                    <div>
                    sei sicuro?
                    <button onClick={eliminaAlunno}>si</button>
                    <button onClick={() => setConferma(false)}>no</button>
                    </div>
                ) : (
                    <button onClick={() => setConferma(true)}>elimina</button>
                )}
                
            </td>
          </tr>
    );
  }