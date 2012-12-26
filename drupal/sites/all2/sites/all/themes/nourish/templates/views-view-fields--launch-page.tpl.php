<?php
/**
 * @file views-view-fields.tpl.php
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
//dpm($fields);
$title_class = (isset($fields['field_icon'])) ? "title-with-icon" : "";
$color = $fields['field_color']->content;
$nid = $fields['nid']->raw;
?>

<style>
.capability-<?php print $nid; ?> h2 a:hover,
.page-portfolio .capability-<?php print $nid; ?> h2 a.active {
  color:<?php print $color; ?>;
}
.capability-<?php print $nid; ?> .cap-body {
  color:<?php print $color; ?>;
}
.capability-<?php print $nid; ?> a,
.page-results .capability-<?php print $nid; ?> a {
  color:<?php print $color; ?>;
}
.page-results .capability-<?php print $nid; ?>:hover h2 a {
  color:<?php print $color; ?>;
}
.page-portfolio .capability-<?php print $nid; ?> h2 a:hover {
  color:<?php print $color; ?>;
}

</style>
<div class="<?php print $title_class; ?>">
<?php foreach ($fields as $id => $field): ?>
  <?php if (!empty($field->separator)): ?>
    <?php print $field->separator; ?>
  <?php endif; ?>

  <?php print $field->wrapper_prefix; ?>
    <?php print $field->label_html; ?>
    <?php print $field->content; ?>
  <?php print $field->wrapper_suffix; ?>
<?php endforeach; ?>
</div>