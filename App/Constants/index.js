import { Platform } from "react-native"
export const CONSTANTS = {
    LIVE_URL:`https://livecdn.live247stream.com/discoverpakistan/${Platform.OS === `ios` ? `iphone` : Platform.OS}/playlist.m3u8`,
    //BASE_URL:'https://discoverpakistan.tv/Legacy_api/',
    BASE_URL:'https://discoverpakistan.tv/dp-admin/Legacy_api/',
    // BASE_URL:'http://smartmultimediahouse.com/discover/Legacy_api/',
    // WEB_URL:'https://discoverpakistan.tv/',
    WEB_URL:'https://discoverpakistan.tv/dp_admin/',
}

export const SOCIAL_LOGIN = {
    FACEBOOK:'1620949568083766',
    GOOGLE_IOS:'388807787471-5j629v9aq98dhjtonk8pdo1een6d3n0o.apps.googleusercontent.com',
    GOOGLE_ANDROID:'388807787471-afhq1g2ns58p8b3v4jto52paujmpctjb.apps.googleusercontent.com'
}

export const KEYS = {
    BA_UNAME:'WEJnTnFPNE96Zm0yOUZWT29OSWxRMzNsbHQ5c0V1ZTI0bDZha2E4clE0NlRndW9JSnN1ZFRGS0dJYjlCM3Y5VjE1ODAzMDI2NzM',
    BA_PWD:'NVRscEJJMUZhWXNiNW9RZ0p2RGhaeTBmOE1lZlAzSlcxNTgwMzAyNjcz'
}

export const URI = {
    LOGIN:'login',
    SIGNUP:'signup',
    RESET_PASSWORD:'password_reset?email=',
    SEARCH:'search',
    UPDATE_PROFILE: 'update_profile',
    GET_USER_DETAILS: 'get_user_details_by_user_id',
    CATEGORIES:'category',
    VIDEO_BY_SLUG: 'get_video_by_slug',
    GET_SINGLE_VIDEO: 'get_single_video_by_slug',
    GET_PARTNERS:'partners',
    ADD_FAVORITE:'add_favorite',
    RM_FAVORITE:'remove_favorite',
    GET_FAVORITE:'get_favorite',
    GET_SHOWS_DETAIL:'shows',
    GET_VIDEOS_BY_SHOW_ID:'get_video_by_show_id',
    ADD_COMMUNITY_COMMENT:'add_community_comment',
    COMMUNITY_LIKE_DISLIKE:'cummunity_like_dislike',
    APPLY_FOR_JOB: 'apply_career',
    JOBS_LIST:'career',
    
    COMMUNITIES: 'communities',
    SUGGEST_COMMUNITY:'suuggest_tourist_community',
    GET_COMMENTS:'get_video_comments',
    DO_COMMENTS:'add_video_comment',
    ADD_WATCH_LATER:'add_to_watch_later',
    REMOVE_WATCH_LATER:'remove_watch_later',
    GET_WATCH_LATER:'watch_later',
    VIDEO_LIKE_DISLIKE:'video_like_dislike',
    VIDEO_COMMENT_DEL:'delete_video_comment',
    UPDATE_VIDEO_COMMENT:'update_video_comment',
    COMMENT_LIKE_DISLIKE:'video_comment_like_dislike',

    UPLOAD_CONTRIBUTOR:'upload_contributor',
    
    GET_COMMUNITIES_COMMENTS:'get_community_comments',
    DEL_COMMUNITY_COMMENT:'delete_community_comment',
    UPDATE_COMMUNITY_COMMENT:'update_community_comment',
    GET_MARCHANDIES_PRODUCT:'discover_products',
    GET_SINGLE_PRODUCT:'view_product',

    GET_MOVES:'get_movies',

    GET_CART_LIST:'cart_items',
    ADD_TO_CART:'add_to_cart',
    REMOVE_CART:'delete_item',
    ORDER_PRODUCTS:'insert_order',
    UPDATE_PROFILE_PIC:''
}