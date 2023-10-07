import { copyBoard, makeBoard } from "@shared/utils";

console.log("loading: @test/test");

const board = makeBoard();
const copy = copyBoard(board);
copy[0][0] = 9;

console.log("testing: utils.makeBoard()");
console.log(board);
console.log("testing: utils.copyBoard()");
console.log(copy);