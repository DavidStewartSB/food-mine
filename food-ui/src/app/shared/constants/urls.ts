const API_URL = "http://localhost:5000";

export const FOODS_URL = API_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOOD_BY_ID_URL = FOODS_URL + '/';


export const USER_LOGIN_URL = API_URL + '/api/users/login';
export const USER_REGISTER_URL = API_URL + '/api/users/register';


export const ORDERS_URL = API_URL + '/api/orders';
export const ORDERS_CREATE_URL = ORDERS_URL + '/create';
export const ORDERS_NEW_ORDER = ORDERS_URL + '/novoPedido';

export const ORDERS_PAY_URL = ORDERS_URL + '/pay';
export const ORDERS_TRACK_URL = ORDERS_URL + '/track/';