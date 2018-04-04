class CookieUtil {

    setCookie(json) {
        const {name, role, id, account, password} = json;
        document.cookie = `name=${encodeURIComponent(name)};max-age=${7*24*60*60}`;
        document.cookie = `role=${encodeURIComponent(role)};max-age=${7*24*60*60}`;
        document.cookie = `id=${encodeURIComponent(id)};max-age=${7*24*60*60}`;
        document.cookie = `account=${encodeURIComponent(account)};max-age=${7*24*60*60}`;
        document.cookie = `password=${encodeURIComponent(password)};max-age=${7*24*60*60}`;
    }

    getCookie(name) {
        let arr;
        const reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        arr=document.cookie.match(reg);
        if(arr && arr.length > 0){
            return decodeURIComponent(arr[2]);
        } else {
            return null;
        }
    }

    delCookie(name) {
        var value = this.getCookie(name);
        if(value){
            document.cookie= name + "="+value+";max-age=0";
        }
    }

}

export default new CookieUtil();