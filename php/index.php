<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';
require __DIR__ . '/controllers/CertificazioniController.php';
require __DIR__ . '/controllers/includes/Db.php';

$app = AppFactory::create();

$app->get('/alunni', "AlunniController:index");
$app->get('/search/alunni/{key:\w{3,}}', "AlunniController:search");
$app->get('/sort/alunni/{col:\w{3,}}', "AlunniController:sort");
$app->post('/alunni', "AlunniController:add");
$app->put('/alunni/{id:\d+}', "AlunniController:edit");
$app->get('/alunni/{id:\d+}/cert', "CertificazioniController:index");
$app->get('/alunni/{id:\d+}/cert/{id_cert:\d+}', "CertificazioniController:search");
$app->post('/alunni/{id:\d+}/cert', "CertificazioniController:add");
$app->delete('/alunni/{id}', "AlunniController:destroy");

$app->run();
