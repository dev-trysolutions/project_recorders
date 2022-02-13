<?php

require_once 'Server.php';

$server = new Server();

if (isset($_FILES["audio"])) {

    $fileName = random_int(10000, 1000000000) . ".mp3";

    $uploadDirectory = 'uploads/' . $fileName;
    move_uploaded_file($_FILES["audio"]["tmp_name"], $uploadDirectory);

    $server->uploadAudio($fileName);
}
