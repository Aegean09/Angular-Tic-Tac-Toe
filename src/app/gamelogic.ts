import { Status } from "./game-status";

export class Gamelogic {

    gameField: Array<number>=[];

    currentTurn: number;

    gameStatus: Status;

    winSituationsOne: Array<Array<number>>=[
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [0,0,1,0,1,0,1,0,0],
    ];

    winSituationsTwo: Array<Array<number>>=[
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2],
        [0,0,2,0,2,0,2,0,0],
    ];

    public constructor(){
        this.gameStatus= Status.STOP;
        this.gameField=[0,0,0,0,0,0,0,0,0];
    }
    gameStart():void{
        this.gameField=[0,0,0,0,0,0,0,0,0];
        this.currentTurn= this.randomPlayerStart();
        this.gameStatus= Status.START;
    }
    randomPlayerStart():number{
        const startPlayer = Math.floor(Math.random()*2)+1;
        return startPlayer;
    }
    setField(position:number, value:number):void{
        this.gameField[position]=value;
    }
    getPlayerColorClass():string{
        let colorClass=""
        if(this.currentTurn===2){
            colorClass='player-two';
        }
        else if(this.currentTurn===1){
            colorClass='player-one';
        }
        return colorClass;
    }
    changePlayer():void{
        if(this.currentTurn===2){
            this.currentTurn=1;
        }
        else if(this.currentTurn===1){
            this.currentTurn=2;
        }
    }
    async checkEmpty(position:number): Promise<boolean>{
        let isempty=true;
        if(this.gameField[position]===0){
            isempty=true;
        }
        else if(this.gameField[position]===1){
            isempty=false;
        }
        else if(this.gameField[position]===2){
            isempty=false;
        }
        if (isempty){
            return true;
        }
        else{
            return false;
        }
    }
    async checkGameEndFull(): Promise<boolean>{
        let isfull=true;
        if(this.gameField.includes(0)){
            isfull=false;
        }

        if (isfull){
            this.gameEnd();
            return true;
        }
        else{
            return false;
        }
    }

    arrayEquals(a:Array<any>,b:Array<any>):boolean{
        return Array.isArray(a) && Array.isArray(b) && a.length===b.length &&
        a.every((value,index)=>value===b[index]);
    }

    async checkGameEndWinner(): Promise<boolean>{
        let isWinner=false;
        
        const checkarray =(this.currentTurn===1)? this.winSituationsOne:this.winSituationsTwo;
        const currentarray=[];

        this.gameField.forEach((subfield, index)=>{
            if (subfield !== this.currentTurn){
                currentarray[index]=0;
            }
            else{
                currentarray[index]=subfield;
            }
        })

        checkarray.forEach((checkfield,checkindex)=>{
            if(this.)
        })

        if (isWinner){
            this.gameEnd();
            return true;
        }
        else{
            return false;
        }
    }
    
    gameEnd():void{
        this.gameStatus= Status.STOP;
    }
}
