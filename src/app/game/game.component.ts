import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { audit } from 'rxjs';
// import { promisify } from 'util';
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

  startAI():void{
    this.game.AIStart();
    var currentsymbol;
    if (this.game.currentTurn==1){
      currentsymbol="X";
    }
    else{
      currentsymbol="O";
    }
    const inf=document.querySelector(".current-status");
    const currentPlayer = 'It\'s your turn...';
    if(inf!=null){
        inf.innerHTML=currentPlayer;
     }
    const start_button1=document.getElementById("start_button");
    if(start_button1!=null){
      start_button1.style.display="none";
    }
    const start_ai_button1=document.getElementById("start_ai");
    if(start_ai_button1!=null){
      start_ai_button1.style.display="none";
    }
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
    const start_ai_button1=document.getElementById("start_ai");
    if(start_ai_button1!=null){
      start_ai_button1.style.display="none";
    }
  }

  async clickSubfield(subfield:any): Promise<void>{
    var currentsymbol;
    const easterEgg=document.getElementById("easteregg");
    //#region Against AI
    if(this.game.gameStatus===2){
      const position = subfield.currentTarget.getAttribute('position');
      const inf=document.querySelector(".current-status");

      if(this.game.gameStatus===2){
        const currentPlayer = 'It\'s your turn...';
        if(inf!=null){
          inf.innerHTML=currentPlayer;
        }
      }
      console.log(this.game.currentTurn);
      if(this.game.currentTurn==1){
        if(await this.game.checkEmpty(position)){
          if(await this.game.checkEmpty(position)){
            this.game.setField(position, this.game.currentTurn);
            if (easterEgg!=null){
              if (Number(easterEgg.innerHTML)==2){
                const color=this.game.getEasterClass();
                subfield.currentTarget.classList.add(color);
              }
              else{
                const color=this.game.getPlayerColorClass();
                subfield.currentTarget.classList.add(color);
              }
            }
          }
          await this.game.checkGameEndWinner().then( (end: boolean)=>{
            if(this.game.gameStatus===0 && end){
              if (inf!=null){
                if (this.game.currentTurn==1){
                  inf.innerHTML="You won!";
                }
                else{
                  inf.innerHTML="I have beaten you!";
                }
                const start_button1=document.getElementById("start_button");
                if(start_button1!=null){
                  start_button1.style.display="block";
                }
                const start_ai_button1=document.getElementById("start_ai");
                if(start_ai_button1!=null){
                  start_ai_button1.style.display="block";
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
                  const start_ai_button1=document.getElementById("start_ai");
                  if(start_ai_button1!=null){
                    start_ai_button1.style.display="block";
                  }
                }
              }
              if(this.game.gameStatus===0 && end==0){
                if (inf!=null){
                  if (this.game.currentTurn==1){
                    inf.innerHTML="You won!";
                  }
                  else{
                    inf.innerHTML="I have beaten you!";
                  }
                  const start_button1=document.getElementById("start_button");
                  if(start_button1!=null){
                    start_button1.style.display="block";
                  }
                  const start_ai_button1=document.getElementById("start_ai");
                  if(start_ai_button1!=null){
                    start_ai_button1.style.display="block";
                  }
                }
              }
            });
          });

          //#region AI
          
          this.game.currentTurn=2;
          if(this.game.gameStatus===2){
            const currentPlayer = 'I\'m thinking.... ';
            if(inf!=null){
              inf.innerHTML=currentPlayer;
            }
          }
          await new Promise(f=>setTimeout(f,2000));
          var rand_index = this.game.changeAI();
          while(await this.game.checkEmpty(rand_index)==false){
            rand_index=this.game.changeAI();
            console.log(rand_index);
          }
          if(this.game.currentTurn==2){
            if(await this.game.checkEmpty(rand_index)){
              if(await this.game.checkEmpty(rand_index)){
                this.game.setField(rand_index, this.game.currentTurn);
                if (easterEgg!=null){
                  if (Number(easterEgg.innerHTML)==2){
                    const color_ai=this.game.getEasterClass();
                    document.getElementById(rand_index.toString())?.classList.add(color_ai);
                  }
                  else{
                    const color_ai=this.game.getPlayerColorClass();
                    document.getElementById(rand_index.toString())?.classList.add(color_ai);
                  }
                }
              }
              await this.game.checkGameEndWinner().then( (end: boolean)=>{
                if(this.game.gameStatus===0 && end){
                  if (inf!=null){
                    if (this.game.currentTurn==1){
                      inf.innerHTML="You won!";
                    }
                    else{
                      inf.innerHTML="I have beaten you!";
                    }
                    const start_button1=document.getElementById("start_button");
                    if(start_button1!=null){
                      start_button1.style.display="block";
                    }
                    const start_ai_button1=document.getElementById("start_ai");
                    if(start_ai_button1!=null){
                      start_ai_button1.style.display="block";
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
                      const start_ai_button1=document.getElementById("start_ai");
                      if(start_ai_button1!=null){
                        start_ai_button1.style.display="block";
                      }
                    }
                  }
                  if(this.game.gameStatus===0 && end==0){
                    if (inf!=null){
                      if (this.game.currentTurn==1){
                        inf.innerHTML="You won!";
                      }
                      else{
                        inf.innerHTML="I have beaten you!";
                      }
                      const start_button1=document.getElementById("start_button");
                      if(start_button1!=null){
                        start_button1.style.display="block";
                      }
                      const start_ai_button1=document.getElementById("start_ai");
                      if(start_ai_button1!=null){
                        start_ai_button1.style.display="block";
                      }
                    }
                  }
                });
              });
            }
          }
          //#endregion

          if(this.game.gameStatus===2){
            this.game.changePlayer();
            const currentPlayer = 'It\'s your turn...';
            if(inf!=null){
                inf.innerHTML=currentPlayer;
            }
          }          
        }
      }
    }
    //#endregion


    //#region Co-Op
    if(this.game.gameStatus===1){
      const position = subfield.currentTarget.getAttribute('position');
      const inf=document.querySelector(".current-status");
      if(await this.game.checkEmpty(position)){
        if(await this.game.checkEmpty(position)){
          this.game.setField(position, this.game.currentTurn);
          if (easterEgg!=null){
            if (Number(easterEgg.innerHTML)==2){
              const color=this.game.getEasterClass();
              subfield.currentTarget.classList.add(color);
            }
            else{
              const color=this.game.getPlayerColorClass();
              subfield.currentTarget.classList.add(color);
            }
          }
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
              const start_ai_button1=document.getElementById("start_ai");
              if(start_ai_button1!=null){
                start_ai_button1.style.display="block";
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
                const start_ai_button1=document.getElementById("start_ai");
                if(start_ai_button1!=null){
                  start_ai_button1.style.display="block";
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
                const start_ai_button1=document.getElementById("start_ai");
                if(start_ai_button1!=null){
                  start_ai_button1.style.display="block";
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
    //#endregion
  }

  easterEgg():void{
    var a;
    const fieldy= document.getElementById("board");
    const title = document.getElementById("tic-title");
    const testing = document.getElementById("easteregg");
    if(testing!=null){
      a=Number(testing.innerHTML);
      a=a+1;
      a=String(a);
      testing.innerHTML=a;
      if(a>="32"){
        // this.game.playTheme();
        if(title!=null){
          title.innerHTML="Tic-Tac-SWAMP!";
        }
        if(fieldy!=null){
          fieldy.classList.add("easter-egg");
        }
      }
    }
  }
}
