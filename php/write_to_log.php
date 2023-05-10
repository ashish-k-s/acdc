<?php
$Host_IP = $_GET["Host_IP"];
$Host_Passwd = $_GET["Host_Passwd"];
$sfdc_core = $_GET["sfdc_core"];
$str = $_GET["str"];

//write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$str);

function write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$str)
{
//sshpass -p redhat ssh -o StrictHostKeyChecking=no 192.168.122.193 -l root "echo -e hi" |  sshpass -p redhat ssh -o StrictHostKeyChecking=no 192.168.122.193 -l root "tee -a /root/acdc/123/console.out"

$cmd = "sshpass -p " . $Host_Passwd . " ssh -o StrictHostKeyChecking=no " . $Host_IP . " -l root \"echo -e \"" . $str . "\"\" | sshpass -p " . $Host_Passwd . " ssh -o StrictHostKeyChecking=no " . $Host_IP . " -l root " . "\"tee -a /root/acdc/" . $sfdc_core . "/console.out\"";
exec($cmd,$output,$ret);
}
/*
print("$cmd");
print ("<br>");
print("$ret");
print ("<br>");
print("$output");
print ("<br>");

//}

function write_to_server_log($str)
{

}
*/
?>
