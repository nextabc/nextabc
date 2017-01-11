angular.module('vietteltvServices').service('ChannelService', ChannelService);

ChannelService.$inject = ['$http', '$q', '$resource', 'Constant'];

function ChannelService($http, $q, $resource, Constant) {

    this.getChannelList = function (limit) {
        var url = Constant.APIHost + '/api1/contents/channels?region=OTT&child=all&access_token=' + Config.accessToken + '&offset=0&limit=' + limit;
        //console.log(url);
        return $resource(url,
                {}, {
            get: {method: 'GET', cache: false, isArray: false}
        }
        );
    };
    this.getChannelGuide = function (id, date) {
        var dd, mm, yyyy;
        if (typeof date === "undefined") {
            var date = new Date();
            dd = date.getDate();
            mm = date.getMonth(); //January is 0!
            yyyy = date.getFullYear();
        } else {
            var dates = date.split("-");
            dd = dates[0];
            mm = dates[1] - 1; //January is 0!
            yyyy = dates[2];
        }

        var since = (new Date(yyyy, mm, dd, 03, 00, 00, 00)).getTime();
        var until = (new Date(yyyy, mm, dd, 23, 59, 59, 99)).getTime();
        var url = Constant.APIHost + '/api1/contents/channels/schedules?region=OTT&access_token=' + Config.accessToken + '&id=' + id + '&include=product&since=' + since + '&until=' + until;
        return $resource(url,
                {}, {
            get: {method: 'GET', cache: false, isArray: false}
        }
        );
    };
    this.getChannelRunning = function () {
        var since = new Date().getTime();
        var until = new Date().getTime();

        var url = Constant.APIHost + "/api1/contents/channels/schedules?id=" +
                "54c201bc718ce0b6e1007944," + //vtv1
                "54c201bc718ce0b6e100794a," + //54c201bc718ce0b6e100794a
                "54c201bb718ce0b6e1007874," + //54c201bb718ce0b6e1007874
                "54c201bc718ce0b6e1007946," + //vtv3
                "54c201bc718ce0b6e1007932," + //vtc3  VTV6 HD, iTV HD, QPVN HD

                //"1111"+//VTV6
                "54c201bc718ce0b6e1007940," + //iTV
                "54c201bc718ce0b6e100792a" + //QPVN
                "region=OTT&access_token=" + Config.accessToken + "&include=product&limit=8&since=" + since + "&until=" + until;
        return $resource(url,
                {}, {
            get: {method: 'GET', cache: false, isArray: false}
        }
        );
    };

    this.getPrepareChannel = function (param) {
        var url = Constant.APIHost + '/api1/watches/handheld/live/prepare';

        $http.defaults.headers.post["Content-Type"] = "application/json";
        var resource = $resource(url, {}, {
            'getPrepareChannel': {method: 'POST'}
        }
        );
        return resource.getPrepareChannel(param);

    };
    this.getPrepareCatchup = function (catchupId) {
        var url = Constant.APIHost + '/api1/watches/catchup/prepare?id=' + catchupId + '&access_token=' + Config.accessToken;

        return $resource(url,
                {}, {
            get: {method: 'GET', cache: false, isArray: false}
        }
        );
    };



}
;