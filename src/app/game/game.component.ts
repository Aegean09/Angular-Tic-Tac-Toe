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
    const start_button1=document.getElementById("start_button");
    if(start_button1!=null){
      start_button1.style.display="none";
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
              inf.innerHTML="The winner is player number"+this.game.currentTurn;
              const start_button1=document.getElementById("start_button");
              if(start_button1!=null){
                start_button1.style.display="block";
              }
            }
          }
          
        });
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
