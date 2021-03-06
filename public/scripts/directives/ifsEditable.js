module.exports = function(application){
    "use strict";
    application.directive("ifsEditable",["$timeout","$parse","$compile",
        function($timeout,$parse,$compile) {
        "use strict";
        return {
            restrict: "A",
            link: function (scope, elem, attrs, ctrl, transcludeFn) {
                let arr = $parse(attrs['callbackArray'])(scope);
                let classes= attrs['ifsEditableClass'] || '';
                var content = angular.element(`<div class="btn-group btn-group-sm ${classes} " role="group">
  <button type="button" class="btn btn-info small py-0 px-1" ng-hide="$first" ng-click="sendUpMessage($event)" ><span class="fa fa-arrow-up"></span></button>
  <button type="button" class="btn btn-info small py-0 px-1" ng-hide="$last" ng-click="sendDownMessage($event)"><span class="fa fa-arrow-down"></span></button>
  <button type="button" class="btn btn-danger small py-0 px-1" ng-click="sendDeleteMessage($event)"><span class="fa fa-trash"></span></button>
</div>`);
                content.css({
                    position: "absolute",
                    top: "0.4rem",
                    right:"0",
                    "z-index": "100",
                    "opacity": "0.3",
                    "font-size": "5px"
                });
                content.hover(function(){
                        content.css("opacity","0.95");
                    },
                    function(){
                        content.css("opacity","0.3");
                    });
                scope.message = attrs['ifsEditable'];
                var content = $compile(content)(scope);
                $timeout(function(){
                    
                    elem.addClass("position-relative");
                    elem.append(content);
                },0);
    
                scope.sendUpMessage = function(e){
                    e.stopPropagation();
                    console.log(scope.$index);
                    
                    scope.$emit("move",{
                        message: scope.message,
                        index: scope.$index,
                        parentIndex: scope.$parent.$index,
                        direction: "up",
                        array: arr
                    });
                };
                scope.sendDownMessage = function(e){
                    e.stopPropagation();
                    scope.$emit("move",{
                        message: scope.message,
                        index: scope.$index,
                        parentIndex: scope.$parent.$index,
                        direction: "down",
                        array: arr
                    });
                };
                scope.sendDeleteMessage = function(e){
                    e.stopPropagation();
                    scope.$emit("deleteFromArray",{
                        message: scope.message,
                        index: scope.$index,
                        parentIndex: scope.$parent.$index,
                        array: arr
                    });
                }
            },
            controller: function($scope){
            
            }
            
        }
    }]);
};
