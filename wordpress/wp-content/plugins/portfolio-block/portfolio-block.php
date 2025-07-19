<?php
/**
 * Plugin Name: Portfolio Block API
 * Description: Expose raw block content in the REST API.
 * Version: 1.0
 * Author: Robbie Sherre
 */

add_filter( 'rest_prepare_post', function( $response, $post, $request ) {
    $raw = get_post_field( 'post_content', $post );
    $data = $response->get_data();
    $data['content']['raw'] = $raw;
    $response->set_data( $data );
    return $response;
}, 10, 3 );