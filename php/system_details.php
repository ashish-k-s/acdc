<?php
//print "<pre>";
//echo "<br>";
$cmd = "sshpass -p " . $_GET["Host_Passwd"] . " ssh -o StrictHostKeyChecking=no " . $_GET["Host_IP"] . " -l root \"cat /etc/redhat-release;arch\" 2> /dev/null";
exec($cmd,$output,$ret);
//echo $output[0].'|'.$output[1];
print("$ret");
print ("<br>");
print("$output[0]");
print ("<br>");
print("$output[1]");
//print "</pre>";
?>
