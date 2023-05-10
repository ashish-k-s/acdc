<?php
$cmd = "python ../scripts/file_type.py " . $_GET["core_file_selected"] . " " . $_GET["rpms_file_selected"];
//print($cmd);
exec($cmd,$output,$ret);
echo $ret . "|" . $output[0] . "|" . $output[1] . "|" . $output[2] . "|" . $output[3];
?>
