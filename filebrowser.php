<?php
//http://127.0.0.1/filebrowser.php?fs_path=/data/

$path = $_GET["fs_path"];
print "<pre>";

$chkbx_str="<br/><input type='radio' name='output' value=";
$chkbx_str_1=" \"/>";
//$path = "/data/";

//function list_fs($path)
//{
$cmd = "/bin/ls -l " . $path . " | awk '{print $9}'";
exec($cmd,$output,$ret);
if($output)
{
$count = sizeof($output);

for($i=1;$i<$count;$i++)
{
$s = $output[$i];
$file=$path . $s;
echo "<br>";
//print ($file);

if (is_dir($file)) { $span = "<span style='color:blue' id='" . $s . "'>" . $file . "</span>"; }
else { $span = "<span style='color:black' id='" . $s . "'>" . $file . "</span>"; }

print ($chkbx_str);
print ($chkbx_str_1);
$chkbox = $chkbx_str . $s . $GLOBALS['chkbx_str_1'];
print $chkbox;
//$p = $span . $file . "</span>";
//$p = $s;
//print ($p);
print ($span);
}
}
else
{
print ("ERROR: Invalid Path!");
}
//}

list_fs($path);
print "</pre>";
?>
