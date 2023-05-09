<?php
function rename_less_files($dir) {
  // 扫描目录中的文件和子目录
  $files = scandir($dir);

  foreach ($files as $file) {
    if ($file == '.' || $file == '..') continue;

    // 如果是文件夹则递归重命名子目录下的文件
    if (is_dir("$dir/$file")) {
      rename_less_files("$dir/$file");
    } else {
      // 如果是 .less 文件，则重命名为 .less.bak
      $ext = pathinfo("$dir/$file", PATHINFO_EXTENSION);
      if ($ext == 'bak') {
        $new_name = "$dir/" . pathinfo("$dir/$file", PATHINFO_FILENAME) . '.less';
        rename("$dir/$file", $new_name);
        echo "已将文件 $dir/$file 重命名为 $new_name<br>";
      }
    }
  }
}

// 指定目标目录
$dir = './';

// 开始递归重命名 .less 文件
rename_less_files($dir);
?>
