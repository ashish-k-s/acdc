$("#rpms_Submit").click(function() {
//  var fs_path = "/data/";
  var fs_path = document.getElementById('rpms_file_path').innerHTML
//  alert(fs_path);
  $("#progress_with_rpms").css('display', 'block');;

  $.ajax({
  url: 'filebrowser_rpms.php',
  data: 'fs_path='+fs_path,
  success: function(data) { 
  $("#fs_list_rpms").html(data);
  $("#progress_with_rpms").css('display', 'none');
  }
});
});

