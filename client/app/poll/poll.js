angular.module('WebTerminal.poll', [])
.controller('pollController', function ($scope, $webSql, $rootScope) {
	
  	var id = 6;
  	$scope.idValue = {};
    $scope.currentPage = 'pollList';
    $scope.activePoll = {};
    $scope.polls = [
        {
            id:1,
            title:'what is the best OS ?',
            options:[
                {id:1, text:"linux", count:1},
                {id:2, text:"windows", count:1},
                {id:3, text:"macOS X", count:1}
            ]
        },
        {
            id:2,
            title:'what is the best phone?',
            options:[
                {id:4, "text":"Iphone", count:1},
                {id:5, "text":"samsung", count:1},
                {id:6, "text":"huawei", count:1}
            ]
        }
    ];


     $scope.AddPoll = function () {
     $scope.polls.push({
             id:3,
             title : $scope.polls.title,
             options:[ 
               {id:$scope.addID(),text :$scope.polls.options1, count:0},
               {id:$scope.addID(),text :$scope.polls.options2, count:0},
               {id:$scope.addID(),text :$scope.polls.options3, count:0}
                   ]
               })
    };


    $scope.choosePoll = function (pollId) {
        $scope.findById(pollId, function (poll) {
            $scope.activePoll = poll;
  
            $scope.currentPage = 'pollVote'
        });
    };


    $scope.findById = function (id, callback) {
        var thePoll = null
        angular.forEach($scope.polls, function (poll) {
            if (id == poll.id) thePoll = poll

        })
        callback(thePoll)
    };


    $scope.vote = function (idValue) {
        option_id = idValue.selectedOption;
        angular.forEach($scope.activePoll.options, function (option) {
            if (option_id == option.id) {
                option.count++;
            }
        })
       $scope.currentPage = 'pollResults'
    };


    $scope.mainPollPage = function () {
        $scope.currentPage = 'pollList'
    }

    $scope.addID = function () {
   	return id += 1;
   }



$scope.db.createTable('comments', {
        "id":{
            "type": "INTEGER",
            "null": "NOT NULL", 
            "primary": true, 
            "auto_increment": true // auto increment
        },
        "created":{
            "type": "TIMESTAMP",
            "null": "NOT NULL",
            "default": "CURRENT_TIMESTAMP" // default value
        },
        "comment":{
            "type": "TEXT",
            "null": "NOT NULL"
        },"username":{
            "type": "TEXT",
            "null": "NOT NULL"
        }
    })

$scope.addComment = function () {
    $scope.db.insert('comments', {"comment": $scope.user.comment,
                    "username": $rootScope.userInfo.username})
                .then(function(results) {
                })
$scope.getAll();

}

$scope.getAll = function (){
$scope.allComment = [];
$scope.db.selectAll("comments").then(function(results) {
   for (var i = 0; i < results.rows.length; i++) {
        $scope.allComment.push(results.rows[i])
    }
})
} 
$scope.getAll();

})
