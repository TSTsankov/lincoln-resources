application.controller("AdminController",function($scope,dataBlock,$location,navigate,$timeout,dataFetcher){
    "use strict";
    $scope.selected = "";
    $scope.step=0;
    $scope.chapter = null;

    function capitalize(str){
        return str.slice(0,1).toUpperCase() + str.slice(1);
    }
    if (dataBlock){
        var data = dataBlock;
        $scope.data = angular.copy(data);
        $scope.group = capitalize(navigate.getGroup());

    }
    $scope.saveChanges = function(){
        dataFetcher.post($scope.group,$scope.data).$promise
            .then(function(res){
                console.log(res);
            })
            .catch(function(err){
            console.log(err);
        });
    };
    $scope.selectGroup = function(grp){
        $location.path("/admin/"+grp);
    };
    $scope.editBlock = function(i){
        if ($scope.selected!==i)
            $scope.selected = i;
        else $scope.selected= null;
    };
    $scope.addBlock = function(){
        $scope.data.push({
            "name": "Edit this block",
            "introcontent": {},
            "chapters": []
        });
    };
    $scope.editChapter = function(ch_index,bl_index){

        if (ch_index===-1)
            $scope.chapter = $scope.data[bl_index].introcontent;
        else{
            $scope.chapter = $scope.data[bl_index].chapters[ch_index];
        }
        $scope.step=1;
        $scope.$broadcast("prepareFields");
    };
    $scope.addChapter = function(par){
        $scope.data[par].chapters.push({
            "blockname": $scope.data[par].name,
            "name": "Edit this chapter",
            "sections": []
        });
    };
    $scope.deleteChapter = function(ch_index,bl_index,event){
        event.stopPropagation();
        event.preventDefault();
        $scope.data[bl_index].chapters.splice(ch_index,1);
    };
    $scope.goBack = function(){
        $scope.chapter=null;
        $scope.data = angular.copy(data);
        $scope.step=0;
        $scope.$broadcast("deleteSelectors");
        $timeout(function(){
            scrollTo("adminEditor");
        },50);

    };
    $scope.submit = function(){
        data = $scope.data ;
        $scope.data = angular.copy(data);
        $scope.goBack();
    };
    var scrollTo = function(idi){
        var elem = angular.element(document.getElementById(idi));
        var container = angular.element(document.getElementById("mainContent"));
        container.scrollToElement(elem,0,50);
    }
});