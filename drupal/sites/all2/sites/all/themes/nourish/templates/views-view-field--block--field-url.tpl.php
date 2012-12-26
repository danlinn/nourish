<?php
 /**
  * This template is used to print a single field in a view. It is not
  * actually used in default Views, as this is registered as a theme
  * function which has better performance. For single overrides, the
  * template is perfectly okay.
  *
  * Variables available:
  * - $view: The view object
  * - $field: The field handler object that can process the input
  * - $row: The raw SQL result that can be used
  * - $output: The processed output that will normally be used.
  *
  * When fetching output from the $row, this construct should be used:
  * $data = $row->{$field->field_alias}
  *
  * The above will guarantee that you'll always get the correct data,
  * regardless of any changes in the aliasing that might happen if
  * the view is modified.
  */
  list($pageurl,$title,$color) = explode('~',$output);
  $page = explode('/',$pageurl);
  $page = $page[1];
  $currentpage = explode('/',drupal_get_path_alias(request_uri()));
  $currentpage = $currentpage[2];
  if($page == $currentpage) {
    $class = "class='active'";
    print "<style>.page-portfolio .active-color{color:" . $color . ";}.page-portfolio .field-label{color:" . $color . ";}</style>";
  } else {
    $class = "";
  }
?><h2><a href="<?php print $page; ?>"<?php print $class; ?>><?php print $title; ?></a></h2>

