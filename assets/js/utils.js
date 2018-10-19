(function(util){
    util.post = function(url,data,success,error){
        axios({
            url:url,
            method:'post',
            data:data,
            timeout:5000,
            baseURL:'http://192.168.1.122',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(success).catch(error);
    }
    util.guid = function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}(window.api = {}));