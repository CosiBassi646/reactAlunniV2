import AlunniRiga from "./AlunniRiga";
export default function AlunniTable(props) {
  const alunni = props.myArray;
  const caricaAlunni = props.caricaAlunni;
  return (
    <table border="1">
      <tbody>
      {alunni.map((a) => (
        <AlunniRiga alunno={a} key={a.id} caricaAlunni={caricaAlunni} />
      ))}
      </tbody>
    </table>
  );
}
