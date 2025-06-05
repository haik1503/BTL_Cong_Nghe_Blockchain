// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LuckyDraw {
    struct Winner {
        string code;
        string time;
    }

    Winner[] private winners;

    function saveWinner(string memory code, string memory time) public {
        winners.push(Winner(code, time));
    }

    function getWinner(uint index) public view returns (string memory code, string memory time) {
        require(index < winners.length, "Invalid index");
        Winner storage w = winners[index];
        return (w.code, w.time);
    }

    function getWinnerCount() public view returns (uint) {
        return winners.length;
    }
}
