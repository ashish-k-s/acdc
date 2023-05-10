<?php
//copy selected files to test system
$Host_IP = $_GET["Host_IP"];
$Host_Passwd = $_GET["Host_Passwd"];
$core_file_selected = $_GET["core_file_selected"];
$core_file_name = $_GET["core_file_name"];
$core_file_bin = $_GET["core_file_bin"];
$core_file_arch = $_GET["core_file_arch"];
$rpms_file_selected = $_GET["rpms_file_selected"];
$rpms_file_name = $_GET["rpms_file_name"];
$sfdc_core = $_GET["sfdc_core"];

include 'write_to_log.php';

////cat ../scripts/create_dir.py | sshpass -p redhat ssh -o StrictHostKeyChecking=no 192.168.122.138 -l root "python -" 123
$cmd = "cat ../scripts/create_dir.py | sshpass -p " . $Host_Passwd . " ssh -o StrictHostKeyChecking=no " . $Host_IP . " -l root \"python -\" " . $sfdc_core;
//print($cmd);
//print("<br>");
exec($cmd,$output,$ret);
if ($ret==0)
{


write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: copying selected files");

   ////sshpass -p redhat scp -o StrictHostKeyChecking=no file.out root@10.65.210.40:/root/acdc/123/
   $cmd = "sshpass -p " . $Host_Passwd . " scp -o StrictHostKeyChecking=no " . $core_file_selected . " " . $rpms_file_selected . " root@" . $Host_IP . ":/root/acdc/" . $sfdc_core . "/";
//   print($cmd);
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$cmd);
//   print("<br>");
   exec($cmd,$output,$ret);
   if($ret != 0)
   {
      print($ret);
      print("<br>");
      print("ERROR: unable to copy selected files to test system");
      exit(1);
   }
}
else
{
   print($ret);
   print("<br>");
   print("ERROR: unable to create directory on test system");
   exit(1);
}

echo "<br>";

write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: Backing-up current rpmpopt file and injecting new rpmpopt");

//sshpass -p redhat ssh -o StrictHostKeyChecking=no 10.65.211.122 -l root "mv /usr/lib/rpm/rpmpopt-4.8.0 /usr/lib/rpm/rpmpopt-4.8.0.orig"
$cmd = "sshpass -p " . $Host_Passwd . " ssh -o StrictHostKeyChecking=no " . $Host_IP . " -l root \" mv /usr/lib/rpm/rpmpopt-4.8.0 /usr/lib/rpm/rpmpopt-4.8.0.orig \"";
//print($cmd);
//print("<br>");
write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$cmd);
exec($cmd,$output,$ret);
if($ret != 0)
{
   print($ret);
   print("<br>");
   print("ERROR: Error moving rpmpopt file");
   exit(1);
}



////sshpass -p redhat scp -o StrictHostKeyChecking=no rpmpopt-4.8.0 root@10.65.210.40:/usr/lib/rpm/rpmpopt-4.8.0
$cmd = "sshpass -p " . $Host_Passwd . " scp -o StrictHostKeyChecking=no /var/www/html/acdc//rpmpopt-4.8.0 " . " root@" . $Host_IP . ":/usr/lib/rpm/rpmpopt-4.8.0";
//print($cmd);
//print("<br>");
write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$cmd);
exec($cmd,$output,$ret);
if($ret != 0)
{
   print($ret);
   print("<br>");
   print("ERROR: unable to inject rpmpop file to system");
   exit(1);
}

//cat setup.py | sshpass -p redhat ssh -o StrictHostKeyChecking=no 10.65.211.115 -l root "cd /root/acdc/123/;python -" xterm  core.22620 installed-rpms.el6 x86_64

write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: running setup.py");

$cmd = "cat ../scripts/setup.py | sshpass -p " . $Host_Passwd . " ssh -o StrictHostKeyChecking=no " . $Host_IP . " -l root \"cd /root/acdc/" . $sfdc_core . "/;python -\" " . $core_file_bin . " " . $core_file_name . " " . $rpms_file_name . " " . $core_file_arch;
//print($cmd);
print("<br>");
write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$cmd);

exec($cmd,$output,$ret);
if($ret != 0)
{
   print($ret);
   print("<br>");
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: ERROR: setup.py failed");
   print("ERROR: setup.py failed!");
   exit(1);
}
else
{
   print($ret);
   print("<br>");
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: SUCCESS: done with execution of setup.py");
   print("setup.py done");
/*
// rpmpopt should not be restored here. do it after entire setup

   //sshpass -p redhat ssh -o StrictHostKeyChecking=no 10.65.211.122 -l root "mv -f /usr/lib/rpm/rpmpopt-4.8.0.orig /usr/lib/rpm/rpmpopt-4.8.0"
   
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: restoring original rpmpopt file");

   $cmd = "sshpass -p " . $Host_Passwd . " ssh -o StrictHostKeyChecking=no " . $Host_IP . " -l root \" mv -f /usr/lib/rpm/rpmpopt-4.8.0.orig /usr/lib/rpm/rpmpopt-4.8.0 \"";
   print($cmd);
   print("<br>");
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$cmd);
   exec($cmd,$output,$ret);
   if($ret != 0)
   {
      print($ret);
      print("<br>");
      write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,"acdc: ERROR restoring rpmpopt file");
      print("ERROR: Error restoring rpmpopt file");
      //exit(1);
   }
*/

echo "<br>";
exit(0);
}
?>

