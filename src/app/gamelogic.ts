import { Status } from "./game-status";

export class Gamelogic {

    gameField: Array<number>=[];

    currentTurn: number | undefined;

    gameStatus: Status;


    public constructor(){
        this.gameStatus= Status.STOP;
        this.gameField=[0,0,0,0,0,0,0,0,0];
    }
    gameStart():void{
        this.gameField=[0,0,0,0,0,0,0,0,0];
        this.currentTurn= this.randomPlayerStart();
        console.log(this.currentTurn);
        this.gameStatus= Status.START;
    }
    randomPlayerStart():number{
        const startPlayer = Math.floor(Math.random()*2)+1;
        return startPlayer;
    }
}
