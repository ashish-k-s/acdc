<?php
$Host_IP = $_GET["Host_IP"];
$Host_Passwd = $_GET["Host_Passwd"];
$sfdc_core = $_GET["sfdc_core"];

include 'write_to_log.php';

//cat install-debug.py | sshpass -p redhat ssh -o StrictHostKeyChecking=no 10.65.211.115 -l root "cd /root/acdc/123/;python -"

write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: Running install-debug.py");


$cmd = "cat ../scripts/install-debug.py | sshpass -p " . $Host_Passwd . " ssh -o StrictHostKeyChecking=no " . $Host_IP . " -l root \"cd /root/acdc/" . $sfdc_core . "/;python -\" ";
write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$cmd);
print($cmd);
print("<br>");

exec($cmd,$output,$ret);
if($ret != 0)
{
   print($ret);
   print("<br>");
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: ERROR running install-debug.py");
   print("ERROR: instaling required packages!");
   exit(1);
}
else
{
   print($ret);
   print("<br>");
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: SUCCESS running install-debug.py");
   print("Done with installation of required packages..");
}

?>

