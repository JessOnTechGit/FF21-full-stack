// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {TwentyOne} from "../src/TwentyOne.sol";

contract TwentyOneScript is Script {
    function run() external returns(TwentyOne) {
        vm.startBroadcast();
        TwentyOne twentyOne = new TwentyOne();
        vm.stopBroadcast();
        return twentyOne;
    }
}
