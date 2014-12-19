<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
	

	require_once("../includes/clientService.php");

	$loginName = $_POST["loginName"];
	$loginPassword = $_POST["loginPassword"];

	$clientService = new MBClientService();
	$result= $clientService->ValidateLogin($loginName,$loginPassword);

	if(sprintf($result->ValidateLoginResult->ErrorCode)==200){
		$cdsHtml = 'Welcome,';
		$cdsHtml .= sprintf($result->ValidateLoginResult->Client->FirstName);
		$cdsHtml .= sprintf($result->ValidateLoginResult->ErrorCode);
	}else{
		$cdsHtml = 'Username and password do not match';
	}

	echo($cdsHtml);

?>