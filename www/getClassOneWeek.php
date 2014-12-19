<?php
	
if (is_ajax()) {
      test_function();
    
  
}

function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function test_function(){
	require_once("../includes/classService.php");
$loginName = $_POST["loginName"];
$loginPassword = $_POST["loginPassword"];

// initialize default credentials

$clientService = new MBClientService();

$result= $clientService->ValidateLogin($loginName,$loginPassword);

if(sprintf($result->ValidateLoginResult->ErrorCode)==200){
	$cdsHtml = 'Welcome,';
	$cdsHtml .= sprintf($result->ValidateLoginResult->Client->FirstName);
	$cdsHtml .= sprintf($result->ValidateLoginResult->ErrorCode);
}else{
	$cdsHtml = 'Wrong login';
}

echo($cdsHtml);
}
?>