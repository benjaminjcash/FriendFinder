var friendData = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;        
        console.log("new friend recieved, added to array.");
        var diffArr = [];
        for (let i = 0; i < friendData.length; i++) {
            var currentFriend = friendData[i];
            var totalDifference = 0;
            for (let j = 0; j < currentFriend.scores.length; j++) {
                var diff = Math.abs(parseInt(newFriend.scores[j]) - parseInt(currentFriend.scores[j]));
                totalDifference += diff;
            }   
            diffArr.push(parseInt(totalDifference));
        }
        console.log(diffArr);
        var closestMatchIndex = diffArr.indexOf(Math.min(...diffArr));
        var closestFriend = friendData[closestMatchIndex];
        res.json(closestFriend);
        friendData.push(newFriend);
    });
}
