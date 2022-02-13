<?php

require_once 'Server.php';

$server = new Server();

if (isset($_FILES["video"])) {

    $fileName = random_int(10000, 1000000000) . ".mp4";

    $uploadDirectory = 'uploads/' . $fileName;
    move_uploaded_file($_FILES["video"]["tmp_name"], $uploadDirectory);

    $server->uploadVideo($fileName);
}
