/**
 * @file request
 * @author luoxiaolan@badu.com
 */

import hyphenate from './hyphenate';
import fetch from 'isomorphic-fetch';
import {notification} from 'antd';

// function checkStatus(response) {
//     if (response.ok) {
//         return response;
//     }
//     const error = new Error();
//     error.response = response;
//     throw error;
// }

function generateTimeTag() {
    return `t=${new Date().valueOf()}`;
}

export default async function request(url, options, unhyphenate = true, type = 'JSON', noerror = false) {
    options = options || {};
    if (options.body) {
        let body = unhyphenate
            ? JSON.stringify(options.body)
            : hyphenate.toKebabCaseJSON(JSON.stringify(options.body));
        options.method = options.method
            ? options.method
            : 'GET';

        body = JSON.parse(body);
        if (options.method.match(/^get$/gi)) {
            url += (/\?/.test(url) ? '&' : '?') + hyphenate.encodeData(body);
            delete options.body;
        } else {
            options.body = JSON.stringify(body);
        }
    }

    // 给 get 请求都加上时间戳
    if (options.method.match(/^get$/gi)) {
        url += (/\?/.test(url) ? '&' : '?') + generateTimeTag();
    }

    !options.credentials && (options.credentials = 'include');

    options.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    // header 中添加 token 认证
    const token = localStorage.getItem('token');
    token && (options.headers.Authorization = `Bearer ${token}`);

    try {
        const response = await fetch(url, options);
        // checkStatus(response);
        let data;
        let responseData = {};
        let headers = {};
        let body = {};
        if (type === 'JSON') {
            responseData = await response.json();
            if (!responseData
                || !responseData.hasOwnProperty('ret')
                || (!!responseData.ret && responseData.ret !== 0 && responseData.ret !== 'SUCCESS')) {
                // 登陆跳转
                if (responseData.ret === 'NO_LOGIN') {
                    window.location.href = '/#/login';
                }
                // 请求未成功错误提示
                else {
                    let msg = responseData.msg || '服务器错误';
                    let ret = responseData.ret || 'fail';
            
                    notification.error({
                        message: '错误提示',
                        description: responseData.message,
                        placement: 'bottomRight'
                    });
                }
            } else if (responseData.content && responseData.content.token){
                // 如果有 token，则将 token 存到 localStorage 中
                localStorage.setItem('token', responseData.content.token);
            }
        } else if (type === 'text') {
            data = await response.text();
            responseData = data;
        } else if (type === 'blob') {
            data = await response.blob();
            responseData = data;
            headers = await response.headers;
            body = await response.body;
        }
        const ret = {
            data: responseData,
            headers: headers,
            body: body
        };

        if (response.headers.get('x-total-count')) {
            ret.headers['x-total-count'] = response
                .headers
                .get('x-total-count');
        }
        return ret;

    } catch (e) {
        if (noerror) {
            return;
        }
        notification.error({
            message: '错误提示',
            description: '连接网络失败，请稍后重试',
            placement: 'bottomRight'
        });
    }
}
