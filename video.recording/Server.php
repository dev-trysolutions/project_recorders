<?php

class Server
{
    private $conn;

    public function __construct()
    {
        $server   = "localhost";
        $dbname   = "test";
        $username = "root";
        $password = "";

        $this->conn = new PDO("mysql:host=$server;dbname=$dbname;charset=utf8", $username, $password);
    }

    public function uploadVideo($data)
    {
        $video = $data;
        $stmt  = $this->conn->prepare("INSERT INTO `videos`(`video`) VALUES (?)");
        $stmt->execute(array($video));

        return 1;
    }
}
