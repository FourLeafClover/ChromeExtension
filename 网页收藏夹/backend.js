 /**
  * chromeWeb Module
  *
  * Description
  */
 (function() {
     angular.module('chromeWeb', []).controller('myCtrl', ['$scope', function($scope) {

         var　storageKey　= 'franktest';
         $scope.urlModel = {
             GroupName: '',
             Url: '',
             UrlName: '',
             UrlDesc: ''
         };
         $scope.isShowHome = true;

         $scope.operatorMsg = "Developer:Frank.C.Zhang~Email:zc_smile@outlook.com";

         $scope.Data = getDataStorage();

         $scope.add = function() {
             $scope.isShowHome = false;
             $scope.operatorMsg = "Group Name & Url & UrlName Required";
         };
         $scope.selectGroup = function(group) {
             $scope.urlModel.GroupName = group.GroupName;
         };
         $scope.save = function() {
            console.log("save");
            if($scope.urlModel.GroupName!=='' && $scope.urlModel.Url!==''){
                $scope.urlModel.GroupName = $scope.urlModel.GroupName.trim();
                $scope.urlModel.Url = $scope.urlModel.Url.trim();
                $scope.urlModel.UrlName = $scope.urlModel.UrlName.trim();
                $scope.urlModel.UrlDesc = $scope.urlModel.UrlDesc.trim();
                var group = getCurrentGroup($scope.urlModel.GroupName);

                var addModel = {
                        GroupName:$scope.urlModel.GroupName,
                        Url:$scope.urlModel.Url,
                        UrlName:$scope.urlModel.UrlName,
                        UrlDesc:$scope.urlModel.UrlDesc
                };

                if(group !== null){
                    group.UrlList.push(addModel);
                }else{
                    var addGroup = { GroupName:$scope.urlModel.GroupName };
                    addGroup.UrlList = [];
                    addGroup.isShow = true;
                    addGroup.UrlList.push(addModel);
                    $scope.Data.push(addGroup);
                }
                addDataToStorage($scope.Data);
                $scope.operatorMsg = "Save successfully";
                $scope.clear();
            }else{
                $scope.operatorMsg = "Group Name & Url & UrlName Required";
            }
         };
         $scope.clear = function() {
             $scope.urlModel.GroupName = '';
             $scope.urlModel.Url = '';
             $scope.urlModel.UrlName = '';
             $scope.urlModel.UrlDesc = '';
         };
         $scope.exit = function() {
             $scope.isShowHome = true;
             $scope.operatorMsg = "Developer:Frank.C.Zhang~Email:zc_smile@outlook.com";
         };
         $scope.cllectCurrentPage = function(){
                chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
                 function(tabs){
                       var activeTab = tabs[0];
                        var activeTabId = activeTab.id; // or do whatever you need
                        $scope.urlModel.Url = activeTab.url;
                        $scope.urlModel.UrlName = activeTab.title;
                        $scope.isShowHome = false;
                        $scope.operatorMsg = "Group Name & Url & UrlName Required";
                        $scope.$apply();
                    }
                );
         };
         $scope.refresh = function(){
            $scope.Data = getDataStorage();
         };
         $scope.deleteGroup = function(group){
            $scope.Data.pop(group);
         };
         $scope.deleteUrl = function(url){
            var currentGroup = getCurrentGroup(url.GroupName);
            var index = currentGroup.UrlList.indexOf(url);
            currentGroup.UrlList.splice(index,1);
            if(currentGroup.UrlList.length===0){
                var groupIndex = $scope.Data.indexOf(currentGroup);
                $scope.Data.splice(groupIndex,1);
            }
            addDataToStorage($scope.Data);
         };
         $scope.showGroup = function(group){
            group.isShow = !group.isShow;
         };
         function getCurrentGroup(groupName){
             var currentGroup = null;
             for(var index=0;index<$scope.Data.length;index++){
                 if($scope.Data[index].GroupName.trim() === groupName.trim()){
                    currentGroup = $scope.Data[index];
                 }
             }
             return currentGroup;
         }

         function isAccessToLocalStorage() {
             return angular.isUndefined(window.localStorage);
         }

         function addDataToStorage(data) {
             window.localStorage.setItem(storageKey, JSON.stringify(data));
         }

         function getDataStorage() {
             var data = window.localStorage.getItem(storageKey);
             if (data === null || angular.isUndefined(data) || data === '') {
                 return [];
             } else {
                var result = JSON.parse(data);
                angular.forEach(result, function(group){
                    group.isShow = true;
                });
                return result;
             }
         }
     }]);
 })();