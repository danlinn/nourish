/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function ($) {
    CKEDITOR.on( 'dialogDefinition', function( ev )
    {
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;

        if ( dialogName == 'uicolor' )
        {
            // Get a reference to the configBox and hide it (cannot be removed).
            var configBox = dialogDefinition.getContents( 'tab1' ).get( 'configBox' );
            configBox.style = 'display:none';
        }
    });

    $(document).ready(function() {
        if (typeof(CKEDITOR) == "undefined")
            return;

        $('#edit-uicolor-textarea').show();

        Drupal.ckeditorUiColorOnChange = function() {
            var color = CKEDITOR.instances["edit-uicolor-textarea"].getUiColor();
            $("#edit-uicolor").val("custom");
            if (typeof(color) != "undefined") {
                if (color == "default"){
                    $("#edit-uicolor").val("default");
                }
                $('input[name$="uicolor_user"]').val(color);
            }
        };

        if ( $("#edit-skin").val() == "kama" ){
            $("#edit-uicolor").removeAttr('disabled');
            $("#edit-uicolor").parent().removeClass('form-disabled');
            CKEDITOR.replace("edit-uicolor-textarea",
            {
                extraPlugins : 'uicolor',
                height: 60,
                uiColor: $('input[name$="uicolor_user"]').val() || '#D3D3D3',
                width: 400,
                toolbar : [[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList'],[ 'UIColor' ]],
                skin: $("#edit-skin").val(),
                on:
                {
                    focus : Drupal.ckeditorUiColorOnChange,
                    blur : Drupal.ckeditorUiColorOnChange
                }
            });
        }
        else {
            $("#edit-uicolor").attr('disabled', 'disabled');
            $("#edit-uicolor").parent().addClass('form-disabled');
            CKEDITOR.replace("edit-uicolor-textarea",
            {
                height: 60,
                uiColor: $('input[name$="uicolor_user"]').val() || '#D3D3D3',
                width: 400,
                toolbar : [[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList']],
                skin: $("#edit-skin").val(),
                on:
                {
                    focus : Drupal.ckeditorUiColorOnChange,
                    blur : Drupal.ckeditorUiColorOnChange
                }
            });
        }

        $("#edit-skin").bind("change", function() {
            CKEDITOR.instances["edit-uicolor-textarea"].destroy();
            if ( $("#edit-skin").val() == "kama" ){
                $("#edit-uicolor").removeAttr('disabled');
                $("#edit-uicolor").parent().removeClass('form-disabled');
                CKEDITOR.replace("edit-uicolor-textarea",
                {
                    extraPlugins : 'uicolor',
                    height: 60,
                    uiColor: $('input[name$="uicolor_user"]').val() || '#D3D3D3',
                    width: 400,
                    toolbar: [[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList'],[ 'UIColor' ]],
                    skin: $("#edit-skin").val(),
                    on:
                    {
                        focus : Drupal.ckeditorUiColorOnChange,
                        blur : Drupal.ckeditorUiColorOnChange
                    }
                });
            }
            else {
                $("#edit-uicolor").attr('disabled', 'disabled');
                $("#edit-uicolor").parent().addClass('form-disabled');
                CKEDITOR.replace("edit-uicolor-textarea",
                {
                    height: 60,
                    uiColor: $('input[name$="uicolor_user"]').val() || '#D3D3D3',
                    width: 400,
                    toolbar: [[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList']],
                    skin: $("#edit-skin").val(),
                    on:
                    {
                        focus : Drupal.ckeditorUiColorOnChange,
                        blur : Drupal.ckeditorUiColorOnChange
                    }
                });
            }
        });

        $("#edit-uicolor").bind("change", function() {
            if (typeof(Drupal.settings.ckeditor_uicolor) != "undefined") {
                CKEDITOR.instances["edit-uicolor-textarea"].setUiColor(Drupal.settings.ckeditor_uicolor[$(this).val()]);
            }
            if ($(this).val() != "custom") {
                $('input[name$="uicolor_user"]').val("");
            }
            else {
                var color = CKEDITOR.instances["edit-uicolor-textarea"].getUiColor();
                if (typeof(color) != "undefined") {
                    $('input[name$="uicolor_user"]').val(color);
                }
            }
        });
    });
})(jQuery);;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the uri fragment identifier. 
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($('.error' + anchor, $fieldset).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
