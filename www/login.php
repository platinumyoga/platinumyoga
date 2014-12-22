<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
	

	require_once("../includes/clientService.php");
	
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$loginName = $request->username;
	$loginPassword = $request->password;
	
	/*$loginName = $_POST["username"];
	$loginPassword = $_POST["password"];*/

	$clientService = new MBClientService();
	$result= $clientService->ValidateLogin($loginName,$loginPassword);

	echo json_encode($result);

?>