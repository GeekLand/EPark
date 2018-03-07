/** 
 * Create by weigm 
 */
import $ from 'jquery';
import CookieUtil from './CookieUtil';

class Request {
    
    synPost(url, data) {
        let result;
        let userid = CookieUtil.getCookie('id');
        if(userid == null || typeof('userid')=='undefined'){
            alert("系统超时，请重新登录。");
            return ;
        }
        $.ajax({
            type: 'POST',
            async: false,
            url: "epark/" + url,
            data: data,
            success: function (json) {
                if (json.code === "200") {
                    result = json.data;
                } else {
                    alert(json.message || "系统出错,请重新操作!");
                }
            },
            dataType: 'json',
        });
        return result;
    }

    getBaseUrl(){
        return "http://localhost:8084/epark/";
    }
}

export default new Request();