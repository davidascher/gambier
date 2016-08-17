import Crypto from 'hmac-crypto.js';

var THUMBRIO_API_KEY = 'YOUR_API_KEY';
var THUMBRIO_SECRET_KEY = 'YOUR_SECRET_KEY'; // XXX get from firebase
var THUMBRIO_BASE_URLS = [
    'http://api.thumbr.io/', 'https://api.thumbr.io/'
];

export function thumbrio(url, size, thumbName, queryArguments, baseUrl) {
    thumbName = thumbName || 'thumb.png';
    baseUrl = baseUrl || THUMBRIO_BASE_URLS[0];

    var encodedUrl = _thumbrioUrlencode(url.replace(/^http:\/\//, ''));
    var encodedSize = _thumbrioUrlencode(size);
    var encodedThumbName = _thumbrioUrlencode(thumbName);
    var path = encodedUrl + '/' + encodedSize + '/' + encodedThumbName;

    if (queryArguments) {
        if (queryArguments[0] == '?') {
            path += queryArguments;
        }
        else {
            path += '?' + queryArguments;
        }
    }

    // We should add the API to the URL when we use the non customized
    // thumbr.io domains
    if (THUMBRIO_BASE_URLS.indexOf(baseUrl) != -1) {
        path = THUMBRIO_API_KEY + '/' + path;
    }

    // some bots (msnbot-media) "fix" the url changing // by /, so even if
    // it's legal it's troublesome to use // in a URL.
    path = path.replace(/\/\//g, '%2F%2F');

    // In node.js: var token = crypto.createHmac('md5', THUMBRIO_SECRET_KEY)
    //                  .update(baseUrl + path).digest('hex');
    var token = Crypto.HMAC(Crypto.MD5, baseUrl + path, THUMBRIO_SECRET_KEY);
    return baseUrl + token + '/' + path;
}

function _thumbrioUrlencode(str) {
    var encodedStr = encodeURIComponent(str);
    return encodedStr.replace(/[~!'()\*]/g, _thumbrioEscapeSingle).replace(/%2F/g, '/');
}

function _thumbrioEscapeSingle(c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
}
