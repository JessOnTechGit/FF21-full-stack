// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TwentyOne} from "../src/TwentyOne.sol";

contract TwentyOneTest is Test {
    TwentyOne public twentyOne;

    address player1 = address(0x123);
    address player2 = address(0x456);

    function setUp() public {
        twentyOne = new TwentyOne();
        vm.deal(player1, 10 ether); // Fund player1 with 10 ether
        vm.deal(player2, 10 ether); // Fund player2 with 10 ether
        vm.deal(address(twentyOne), 10 ether); // Fund the contract with 10 ether
    }

    function test_StartGame() public {
        vm.startPrank(player1); // Start acting as player1

        uint256 initialBalance = player1.balance;

        // Start the game with 1 ether bet
        twentyOne.startGame{value: 1 ether}();

        // Check that the player's balance decreased by 1 ether
        assertEq(player1.balance, initialBalance - 1 ether);

        // Check that the player's hand has two cards
        uint256[] memory playerCards = twentyOne.getPlayerCards(player1);
        assertEq(playerCards.length, 2);

        vm.stopPrank();
    }

    function test_Hit() public {
        vm.startPrank(player1); // Start acting as player1

        twentyOne.startGame{value: 1 ether}();

        // Initial hand size should be 2
        uint256[] memory initialCards = twentyOne.getPlayerCards(player1);
        assertEq(initialCards.length, 2);

        // Player hits (takes another card)
        twentyOne.hit();

        // Hand size should increase to 3
        uint256[] memory updatedCards = twentyOne.getPlayerCards(player1);
        assertEq(updatedCards.length, 3);

        vm.stopPrank();
    }
}
