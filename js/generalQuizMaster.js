/** This function handles the Kwargs with an Enviroment error if a listen Keyword
 Argument is not listed in Kwargs */
function kwargs_handler(not_list, kwargs_dict, kwagrs_setter_dict) {
    /** iterates the not_list */
    not_list.forEach(function (iter) {
        /** If an Item from not_list is not included in the Kwargs */
        if (!(kwargs_dict.hasOwnProperty(iter))) {
            throw '{0} not given by kwargs_dict and required in not_list'
        }
    });
    /** iterates the kwagrs_setter_dict */
    for (var key in kwagrs_setter_dict) {
        /** If an Item from kwagrs_setter_dict is not included in the Kwargs */
        if (!(kwargs_dict.hasOwnProperty(key))) {
            /** amend value of kwagrs_setter_dict*/
            kwargs_dict[key] = kwagrs_setter_dict[key];
        }
    }
    return kwargs_dict
}

/** Promise Function for sending Requests
 * V1 up to now just supports get requests
 * post requests are not tested yet*/
function request_v1(kwargs_dict) {
    /** Not List checking with kwargs_handler */
    kwargs_dict = kwargs_handler(['url'], kwargs_dict, {
        'method': 'get',
        'noCache': true
    });

    // return new Promise((resolve, reject) => {
    return new Promise(function (resolve, reject) {
        var myRequest = new Request({
            url: kwargs_dict['url'],
            method: kwargs_dict['method'],
            noCache: kwargs_dict['noCache'],
            onSuccess: function (responseText) {
                /** successCallback */
                // console.log('responseText', responseText)
                resolve(responseText);
            },
            onFailure: function () {
                // console.log("Failure");
                reject(false);
            }
        });
        myRequest.send();
    });

}


function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
