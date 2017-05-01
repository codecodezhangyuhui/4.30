var aa=angular.module("myapp",["ngRoute","ngAnimate"]);
aa.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:"/table.html",
        controller:"table"
    }).when('/add',{
        templateUrl:"/add.html",
        controller:"add"
    })
})
aa.controller("table",["$scope","$http",function($scope,$http){
    $http({
        method:"get",
        url:"/select"
    }).then(function(q){
        $scope.data=q.data;
    })
    $scope.blur=function(id,ziduan,value){
        $http({
            method:"get",
            url:"/update",
            params:{
                id:id,
                ziduan:ziduan,
                value:value
            }
        }).then(function(q){
            if(q.data=="1"){
                console.log("修改成功")
            }
        })

    }
    $scope.del=function(id){
        $http({
            method:"get",
            url:"/del",
            params:{
                id:id,
            }
        }).then(function(q){
            if(q.data=="1"){
                $scope.data.forEach(function(obj,index){
                    if(obj.id==id){
                        $scope.data.splice(index,1);
                    }
                })
                console.log("删除成功");
            }
        })
    }
    //
}])
aa.controller("add",["$scope","$http",function($scope,$http){
    $scope.add=function(num,name,sex,age){
        if(num==undefined){
            num="";
        }
        if(name==undefined){
            name="";
        }
        if(sex==undefined){
            sex="";
        }
        if(age==undefined){
            age="";
        }
        console.log(num,name,sex,age);
        $http({
            url:"/add",
            params:{
                num:num,
                name:name,
                sex:sex,
                age:age
            }
        }).then(function(q){
            console.log(q.data);
        })
    }

}])