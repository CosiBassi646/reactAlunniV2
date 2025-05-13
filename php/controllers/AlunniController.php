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
}
