$("#core_Submit").click(function() {
//  var fs_path = "/data/";
  var fs_path = document.getElementById('core_file_path').innerHTML
//  alert(fs_path);
  $("#progress_with_core").css('display', 'block');;

  $.ajax({
  url: 'filebrowser_core.php',
  data: 'fs_path='+fs_path,
  success: function(data) { 
  $("#fs_list_core").html(data);
  $("#progress_with_core").css('display', 'none');
  }
});
});

