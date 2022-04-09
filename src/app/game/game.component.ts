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
    const currentPlayer = 'Current turn: Player: '+this.game.currentTurn;
    const inf=document.querySelector(".current-status");
    if(inf!=null){
      inf.innerHTML=currentPlayer;
    }
  }

  async clickSubfield(subfield:any): Promise<void>{
    if(this.game.gameStatus===1){
      const position = subfield.currentTarget.getAttribute('position');
      const inf=document.querySelector(".current-status");

      if(await this.game.checkEmpty(position)){
        this.game.setField(position, this.game.currentTurn);
        const color=this.game.getPlayerColorClass();
        subfield.currentTarget.classList.add(color);
      }
      

      await this.game.checkGameEndWinner().then( (end: boolean)=>{
        if(this.game.gameStatus===0 && end){
          if (inf!=null){
            inf.innerHTML="The winner is player number"+this.game.currentTurn;
          }
        }
      });



      await this.game.checkGameEndFull().then( (end: boolean)=>{
        if(this.game.gameStatus===0 && end){
          if (inf!=null){
            inf.innerHTML="No Winner, DRAW!";
          }
        }
      });


      this.game.changePlayer();
      if(this.game.gameStatus===1){
        const currentPlayer = 'Current turn: Player: '+this.game.currentTurn;
        if(inf!=null){
          inf.innerHTML=currentPlayer;
        }
      }
    }
  }
}
