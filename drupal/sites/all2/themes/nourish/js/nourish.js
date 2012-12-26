(function($){
	Drupal.behaviors.nourish = {
		attach : function(context) { 
			$('.node-readmore a').text("Read the entire post");
		}
	}
})(jQuery);
