angular.module('starter.services', [])
.service('FetchService', ['$http', FetchService])
.service('SigninService', ['$http', SigninService])
.service('AddUserService', ['$http', AddUserService])

.service("AuthInterceptor", function($location, $q) {
  return {
    request: function(config) {
      // prevent browser bar tampering for /api routes
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      var token = localStorage.getItem("Authorization");
      if (token)
        config.headers.Authorization = token;
      return $q.resolve(config);
    },
    responseError: function(err) {
      // if you mess around with the token, log them out and destroy it
      if (err.data === "invalid token" || err.data === "invalid signature" || err.data === "jwt malformed") {
        $location.path("/signin");
        return $q.reject(err);
      }
      // if you try to access a user who is not yourself
      if (err.status === 401) {
        $location.path('/signin');
        return $q.reject(err);
      }
      return $q.reject(err);
    }
  };
})

.service('Fetches', ['$http', function($http) {
  return {
    all : function() {
      return $http.get('http://localhost:3000/fetches/', fetch)
      .then(function(fetchObj) {
        // console.log(fetchObj);
        return fetchObj;
      }, function(response) {
        console.error(new Error(response));
      });
    }
    // this.remove = function(fetch) {
    //   fetchObj.splice(fetchObj.indexOf(fetch), 1);
    // };
    };
  }]);

function FetchService($http){
  return {
    getFetch:function(user){
      console.log(user);
      return $http.post('http://localhost:3000/fetches/user/', user)
        .then(function(response){
          console.log(response);
        }, function(error){
          console.log(error);
        });
      },
    // showAvailFetches: function(fetch){
    //     return $http.get('http://localhost:3000/fetches/', fetch)
    //     .then(function(response){
    //       console.log(response);
    //       return response;
    //     }, function(error){
    //       console.log(error);
    //     });
    //   },
    // getFetchDetails: function(id) {
    //   console.log(id);
    //   return $http.get('http://localhost:3000/' + id)
    //   .then(function(response){
    //     console.log(response);
    //   }, function(error){
    //     console.log(error);
    //   });
    // },
    postNewFetch: function(fetchObj) {
      console.log(fetchObj);
        return $http.post('http://localhost:3000/fetches', fetchObj)
        .then(function(response){
          console.log(response);
        }, function(error){
          console.log(error);
        });
    }
    // ,
    // deleteFetch: function(id) {
    //   return $http.delete('http://localhost:3000/' + id);
    // },
    // editFetch: function(id, editObj) {
    //   return $http.put('http://localhost:3000/' + id, editObj);
    // }
  };
}

function SigninService($http){
  return {
    signin: function(user){
        return $http.post('http://localhost:3000/users/signin', user)
        .then(function(response){
          return response;
        }, function(error){
          return error;
        });
    }
  };
}

function AddUserService($http){
  return {
    signup: function(user){
        return $http.post('http://localhost:3000/users/signup', user)
        .then(function(response){
          return response;
        }, function(error){
          return error;
        });
      }
    };
  }
