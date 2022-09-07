<?php

session_start();
session_regenerate_id();

if (!isset($_POST["send"]) || ($_POST["send"]) !== "Send Message") die("<h1>Not Allowed</h1>");

function test_input($data)
{
  $data = trim($data); // remove spaces from start and end
  $data = stripslashes($data); // remove backslashes from string
  $data = htmlspecialchars($data); // 
  $data = filter_var($data, FILTER_SANITIZE_SPECIAL_CHARS); // translate SPECIAL_CHARS to HTML entities
  return $data;
}

$username = $email = $password = $msg = "";
$usernameErr = $emailErr = $passwordErr = $msgErr = "";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["send"]) && $_POST["send"] === "Send Message") {
  $_POST["send"] === ""; // to prevent [duplicat] adding same item ervey refresh
  if (empty($_POST["username"])) {
    $usernameErr = "username is Required";
    /* 
    elseif (!preg_match("/^[a-zA-Z'_\s]*$/i", $_POST["username"])) {
    $usernameErr = "only letter, Underscores & ' & spaces are allowed";
    }
    */
  } else {
    $username = test_input($_POST["username"]);
  }

  if (empty($_POST["email"])) {
    $emailErr = "email is Required";
  } else {
    $email = test_input($_POST["email"]);
  }

  if (empty($_POST["password"])) {
    $passwordErr = "password is Required";
  } else {
    $password = test_input($_POST["password"]);
    $password = password_hash($password, PASSWORD_DEFAULT);
  }

  if (empty($_POST["msg"])) {
    $msgErr = "message is Required";
  } else {
    $msg = test_input($_POST["msg"]);
  }

  // echo "Before";

  if ($usernameErr === "" && $emailErr === "" && $passwordErr === "" && $msgErr === "") {

    // echo "After";

    // Connect Database
    $servername = "localhost";
    $uname = "root";
    $upass = "1234";
    $dbname = "login_system";

    $conn = new mysqli($servername, $uname, $upass);
    if ($conn->connect_error) {
      die("Connection Failed Bro." . $conn->connect_error);
    }
    // echo "Connection Established <br>";


    $stmt = $conn->prepare("INSERT INTO $dbname.`msgs` (username, email, password, msg) VALUES (? , ? , ?, ?)");
    $stmt->bind_param("ssss", $username, $email, $password, $msg);

    try {
      $stmt->execute();
      // echo "Done Successfully";
    } catch (Exception $ex) {
      echo "Error Saving Msg $ex";
    } finally {
      // header("Location: index.html");
      echo '
<script>
  location.href="index.html";
</script>
';
      $stmt->close();
      $conn->close();
      exit;
    }
  }
} // end of POST
