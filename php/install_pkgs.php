<?php
$Host_Passwd = $_GET["Host_Passwd"];
$Host_IP = $_GET["Host_IP"];
$sfdc_core = $_GET["sfdc_core"];

include 'write_to_log.php';

//cat install-dep.py | sshpass -p redhat ssh -o StrictHostKeyChecking=no 10.65.211.115 -l root "cd /root/acdc/123/;python -" xterm  core.22620 installed-rpms.el6 x86_64

write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: Installing required dependencies");

$cmd = "cat ../scripts/install-dep.py | sshpass -p " . $Host_Passwd . " ssh -o StrictHostKeyChecking=no " . $Host_IP . " -l root \"cd /root/acdc/" . $sfdc_core . "/;python -\" ";
print($cmd);
print("<br>");
write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$cmd);

exec($cmd,$output,$ret);
if($ret != 0)
{
   print($ret);
   print("<br>");
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: ERROR installing required dependencies");
   print("ERROR: instaling required packages!");
   exit(1);
}
else
{
   print($ret);
   print("<br>");
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: SUCCESS installing required dependencies");
   print("Done with installation of required packages..");
}

?>

