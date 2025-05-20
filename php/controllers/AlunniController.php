<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args){
    sleep(3);
    $mysqli_connection = db::getInstance();
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);
    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function search(Request $request, Response $response, $args){
    $mysqli_connection = db::getInstance();
    $result = $mysqli_connection->query("SELECT * FROM alunni where (nome like '%".$args['key']."%' or cognome like '%".$args['key']."%')");
    $results = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function sort(Request $request, Response $response, $args){
    $mysqli_connection = db::getInstance();
    $columns = $mysqli_connection->query("describe alunni");
    $arrCol = $columns->fetch_all(MYSQLI_ASSOC);
    $trovato = false;
    foreach($arrCol as $colu){
      if($colu['Field'] == $args['col']){
        $trovato = true;
        break;
      }
    }
    if($trovato){
      $result = $mysqli_connection->query("SELECT * FROM alunni order by ".$args['col']."");
      $results = $result->fetch_all(MYSQLI_ASSOC);

      $response->getBody()->write(json_encode($results));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);
    }
    else{
      $response->getBody()->write(json_encode(["msg" => "colonna non trovata"]));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);
    }
      
  }

  public function destroy(Request $request, Response $response, $args){
    $mysqli_connection = db::getInstance();
    $id=$args["id"];
    $result = $mysqli_connection->query("DELETE FROM alunni WHERE id = '$id';");
  
    $response->getBody()->write(json_encode($result));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function add(Request $request, Response $response, $args){
    $body= json_decode($request->getBody()->getContents(), true);
    $nome = $body["nome"];
    $cognome = $body["cognome"];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("INSERT INTO `alunni`(`nome`, `cognome`) VALUES ('$nome','$cognome')");

    return $response->withHeader("Content-Type", "application/json")->withStatus(201);  
  }

  public function edit(Request $request, Response $response, $args){ //modifica i parametri di un'alunno dato l'id
    $body= json_decode($request->getBody()->getContents(), true);
    $response->getBody()->write($args["id"]);
    $nome = $body["nome"];
    $cognome = $body["cognome"];
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("UPDATE `alunni` SET `nome`='$nome',`cognome`='$cognome' WHERE alunni.id = $args[id]");

    return $response->withHeader("Content-Type", "application/json")->withStatus(200);
  }

}
