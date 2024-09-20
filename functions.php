<?php  ini_set('max_execution_time', 300);
function my_enqueue_assets() { 
	$parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style )
    );	   	
}
add_action( 'wp_enqueue_scripts', 'my_enqueue_assets' );   

//-------------------------------------------\
//START YOUR Function here
//-------------------------------------------
include 'assets/hooks.php';    
include 'assets/controller.php';          
include 'assets/shortcodes.php';        

add_filter( 'wpseo_json_ld_output', '__return_false' );

//-------------------------------------------
//Adding Webhype text on menu and theme options
function webhype_admin_head_function() { ?>
<style>
#adminmenu > li.toplevel_page_goodlayers_main_menu, 
body.toplevel_page_goodlayers_main_menu  #wpbody-content  .gdlr-core-theme-option-logo img
{ display: none; }      
</style>
<?php }      
add_action( 'admin_head', 'webhype_admin_head_function' );

                         
function webhype_admin_footer_function() { ?>
 <script>
jQuery(document).ready(function(){
      jQuery('#adminmenu > li.toplevel_page_goodlayers_main_menu  .dashicons-before > img').attr('src','<?php echo get_stylesheet_directory_uri(); ?>/images/admin-option-icon.png');   
     jQuery('#adminmenu > li.toplevel_page_goodlayers_main_menu  .wp-menu-name,  #adminmenu > li.toplevel_page_goodlayers_main_menu  .wp-submenu > .wp-submenu-head,  #adminmenu > li.toplevel_page_goodlayers_main_menu   .wp-first-item > a').html('Webhype');
  	 jQuery('body.toplevel_page_goodlayers_main_menu  #wpbody-content  .gdlr-core-theme-option-logo img').attr('src','<?php echo get_stylesheet_directory_uri(); ?>/images/theme-option-logo.png').show('slow');         
     jQuery('#adminmenu  >  li.toplevel_page_goodlayers_main_menu').show('slow');                             
});

</script>
<?php }        
add_action('admin_footer', 'webhype_admin_footer_function');


function my_child_theme_enqueue_assets() {
    // Enqueue parent theme's styles
    wp_enqueue_style('parent-theme-style', get_template_directory_uri() . '/style.css');

    // Enqueue custom CSS file located in child theme's /asset/css/ directory
    wp_enqueue_style('child-custom-style', get_stylesheet_directory_uri() . '/asset/css/style.css');

    // Deregister default jQuery (optional, if you want to load a custom version)
    wp_deregister_script('jquery');

    // Enqueue custom jQuery and ensure it's loaded with WordPress dependencies
    //wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.6.0.min.js', array(), '3.6.0', true); // Optional, if you want to use an external version of jQuery
    
    // Enqueue custom JS file located in child theme's /asset/js/ directory
    wp_enqueue_script('child-custom-js', get_stylesheet_directory_uri() . '/asset/js/app.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'my_child_theme_enqueue_assets');