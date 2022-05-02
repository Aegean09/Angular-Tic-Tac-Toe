import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers:[Gamelogic]
})
export class GameComponent implements OnInit {

  constructor( public game: Gamelogic) { }

  ngOnInit(): void {
  }
  startGame(): void {
    this.game.gameStart();
    var currentsymbol;
    if (this.game.currentTurn==1){
      currentsymbol="X";
    }
    else{
      currentsymbol="O";
    }
    const currentPlayer = 'Current turn: Player: '+currentsymbol;
    const inf=document.querySelector(".current-status");
    if(inf!=null){
      inf.innerHTML=currentPlayer;
    }
    const start_button1=document.getElementById("start_button");
    if(start_button1!=null){
      start_button1.style.display="none";
    }
  }

  async clickSubfield(subfield:any): Promise<void>{
    var currentsymbol;
    if(this.game.gameStatus===1){
      const position = subfield.currentTarget.getAttribute('position');
      const inf=document.querySelector(".current-status");
      if(await this.game.checkEmpty(position)){
        if(await this.game.checkEmpty(position)){
          this.game.setField(position, this.game.currentTurn);
          const color=this.game.getPlayerColorClass();
          subfield.currentTarget.classList.add(color);
        }
        await this.game.checkGameEndWinner().then( (end: boolean)=>{
          if(this.game.gameStatus===0 && end){
            if (inf!=null){
              if (this.game.currentTurn==1){
                currentsymbol="X";
              }
              else{
                currentsymbol="O";
              }
              inf.innerHTML="The winner is player: "+currentsymbol;
              const start_button1=document.getElementById("start_button");
              if(start_button1!=null){
                start_button1.style.display="block";
              }
            }
          }
           this.game.checkGameEndFull().then( (end: number)=>{
            if(this.game.gameStatus===0 && end==1){
              if (inf!=null){
                inf.innerHTML="No Winner, DRAW!";
                const start_button1=document.getElementById("start_button");
                if(start_button1!=null){
                  start_button1.style.display="block";
                }
              }
            }
            if(this.game.gameStatus===0 && end==0){
              if (inf!=null){
                if (this.game.currentTurn==1){
                  currentsymbol="X";
                }
                else{
                  currentsymbol="O";
                }
                inf.innerHTML="The winner is player: "+currentsymbol;
                const start_button1=document.getElementById("start_button");
                if(start_button1!=null){
                  start_button1.style.display="block";
                }
              }
            }
          });
        });
        this.game.changePlayer();
        if (this.game.currentTurn==1){
          currentsymbol="X";
        }
        else{
          currentsymbol="O";
        }
        if(this.game.gameStatus===1){
          const currentPlayer = 'Current turn: Player: '+currentsymbol;
          if(inf!=null){
            inf.innerHTML=currentPlayer;
          }
        }
      }
    }
  }
}
