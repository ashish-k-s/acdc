<?php
$Host_IP = $_GET["Host_IP"];
$Host_Passwd = $_GET["Host_Passwd"];
$sfdc_core = $_GET["sfdc_core"];
$name_to_cat = $_GET["name_to_cat"];
include 'write_to_log.php';

////sshpass -p redhat ssh -o StrictHostKeyChecking=no 192.168.2.138 -l root "cat /root/acdc/123/dependency.txt"

$str = "acdc: Displaying " . $name_to_cat;
write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$str);

$cmd = "sshpass -p ".$Host_Passwd." ssh -o StrictHostKeyChecking=no ".$Host_IP." -l root \"cat /root/acdc/".$sfdc_core."/".$name_to_cat."\"";
//print($cmd);
//print("<br>");
write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$cmd);
exec($cmd,$output,$ret);
if ($ret==0)
{
   //print("SUCCESS");
   $outputlength=count($output);
   if ($outputlength==0)
   {
      print($outputlength);
      exit(0);
   }

   //
   echo "<br>";
   //
   print($outputlength);
   //
   echo "<br>";
   
   for($x=0;$x<$outputlength;$x++)
   {
      //  echo $x;
     echo $output[$x];
     echo "<br>";
   }

   //
   print("<br>");
   //
   //print_r($output);
   //
   print("<br>");
   exit(0);
}
else
{
   print($ret);
   print("<br>");
   $str = "acdc: ERROR displaying " . $name_to_cat;
   write_to_client_log($Host_IP,$Host_Passwd,$sfdc_core,$str);
   print("ERROR: listing pacakges");
   exit(1);
}
?>

