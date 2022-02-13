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
    
    public function uploadAudio($data)
    {
        $audio = $data;
        $stmt  = $this->conn->prepare("INSERT INTO `audios`(`audio`) VALUES (?)");
        $stmt->execute(array($audio));

        return 1;
    }
}
