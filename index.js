// const root = document.getElementById("root");

class model{
    #board
    constructor(){
        this.#board=[[],[],[],[],[],[],[]];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
            this.#board[i][j]={fill:'N',row:i,line:j};                      
            }
        }
        console.log(this.#board);
    }
    addKey(color,row){
        let line;
        for (let i = 0; i < 7; i++) {
            if(this.#board[row][i].fill=='N')
            {
                this.#board[row][i].fill=color; 
                line=i;
                i=8;           
            }
        }
        let answer=this.checkWin(row,line,color);
        if(answer!=false)
            return  answer
        return this.#board; 
    }
    checkWin(row,line,color){
        console.log(`row:${row} line:${line} ${color}`);
        let answer=this.checkRow(row,line,color);
        if(typeof  answer === 'string')
        {
            return answer;
        }
        answer =this.checkLine(row,line,color);
        if(typeof  answer === 'string')
        {
            return answer;
        }
        answer =this.checkLeftSlant(row,line,color);
        if(typeof  answer === 'string')
        {
            return answer;
        }
        answer =this.checkRightSlant(row,line,color);
        if(typeof  answer === 'string')
        {
            return answer;
        }
        return false;
        
    }
    newGame(){
        this.#board=[[],[],[],[],[],[],[]];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
            this.#board[i][j]={fill: 'N',row:i,line:j};                      
            }
        }
        return this.#board;
    }
    checkRow(row,line,color){
        let count=0;
        for (let i = 0; i < 7; i++) {
            if(i!=0){
                if (`${this.#board[row][i-1].fill}`==color&&`${this.#board[row][i].fill}`==color) 
                {
                    count++;
                    if(count==3)
                        i=8;
                }
                else
                    count=0;
            }
        }
        if(count==3)
            return `${color} win`;
        else
            return false;
    }
    checkLine(row,line,color){
        let count=0;
        for (let i = 0; i < 7; i++) {
            if(i!=0){
                if (`${this.#board[i-1][line].fill}`==color&&`${this.#board[i][line].fill}`==color) 
                {
                    count++;
                    if(count==3)
                        i=8;
                }   
                else
                count=0;
            }
        }
        if(count==3)
            return `${color} win`;
        else
            return false;
    }
    checkLeftSlant(row,line,color){
        let leftR=row,leftL=line,count=0;
        while(leftR!=0&&leftL!=0)
        {
            leftR--;
            leftL--;
        }
        for (let i = 0; i < 7; i++) {
            if(i!=0&&leftR<7&&leftL<7){
                if (`${this.#board[leftR][leftL].fill}`==color/* &&`${this.#board[i][line].fill}`==color */) 
                {
                    count++;
                    if(count==4)
                        i=8;
                }   
                else
                    count=0;
                leftR++;
                leftL++;
            }
        }
        if(count==4)
            return `${color} win`;
        else
            return false;
    }
    checkRightSlant(row,line,color){
        let leftR=row,leftL=line,count=0;
        while(leftR<6&&leftL!=0)
        {
            leftR++;
            leftL--;
        }   
        console.log(leftR,leftL);
        for (let i = 0; i < 7; i++) {
            if(i!=0&&leftR>=0&&leftL<7){
                if (`${this.#board[leftR][leftL].fill}`==color/* &&`${this.#board[i][line].fill}`==color */) 
                {
                    count++;
                    if(count==4)
                    i=8;
                    console.log(count);
                    console.log(leftR,leftL);
                }   
                else
                    count=0;
                leftR--;
                leftL++;
            }
        }   
        if(count==4)
            return `${color} win`;
        return false;
    }

}
class view{
    #turn
    constructor(){
        this.#turn='R';
        const root=document.getElementById('header');
        root.append(this.createElement('h1',[],['display-1','d-flex', 'justify-content-center'],{},'Connect 4'))
        let grid=this.createElement('div',[],["container","board"]);
        grid.id='grid';
        root.append(grid);
        for (let i = 0; i < 7; i++) {
            let row=this.createElement('div',[],["row"]);
            row.id=`line ${6-i}`;
            for (let j = 0; j < 7; j++) {
                let column=this.createElement('div',[],['col'],{},``);
                column.id=j;
                if(i==0)
                    this.addColorChange(column);
                row.prepend(column);           
            }
            grid.append(row)
        }
        console.log(grid)
    }
    addColorChange(col){
        col.addEventListener('mouseover',(e)=>{
            e.target.style.background='white';
        });
        col.addEventListener('mouseout',(e)=>{
            e.target.style.background='darkgrey';
        });
    }
    addMove(handleTurn){
        document.getElementById(`line 6`).addEventListener('click',(e)=>{
            if(e.target.id!=undefined)
            {
                handleTurn(this.#turn,e.target.id);
                if(this.#turn=='R')
                this.#turn='O';
                else
                this.#turn='R';
            }
        })
    }
    renderDisplay(newBoard){
        let grid=document.getElementById('grid');
        grid.innerHTML=''
        for (let i = 0; i < 7; i++) {
            let line=this.createElement('div',[],["row"]);
            line.id=`line ${6-i}`;
            for (let j = 0; j < 7; j++) {
                let column=this.createElement('div',[],['col'],{},``);
                column.id=j;
                column.classList.add(`${newBoard[j][6-i].fill}`)
                if(i==0)
                    this.addColorChange(column);
                line.prepend(column);           
            }
            grid.append(line)
        }
    }
    renderWin(winner){
        let p = this.createElement('h4',[],['display-4','d-flex', 'justify-content-center'],{},winner);
        grid.innerHTML=''
        grid.append(p);
        let newBtn=this.createElement('button',[],['btn','btn-outline-info','d-flex', 'justify-content-center'],{type:'button'},'Play again!')
        newBtn.id='rematch';
        grid.append(newBtn);
    }
    rematch(handleRematch){
        document.getElementById('rematch').addEventListener('click',(e)=>{
            handleRematch();
        })
    }
    createElement(tagName ,children = [], classes = [], attributes = {},innerText) {
    const el = document.createElement(tagName);
        // Children
        for(const child of children) {
            el.append(child);
        }
        // Classes
        for(const cls of classes) {
            el.classList.add(cls);
        }
        // Attributes
        for (const attr in attributes) {
            el.setAttribute(attr, attributes[attr]);
        }
        if(innerText!=undefined)
        el.innerText=innerText;
        return el;
    }

}
class controller{
        #model;
        #view;
        constructor(view,model){
            this.#view=view;    
            this.#model=model;
            this.#view.addMove(this.#handleTurn);
    }
    #handleTurn=(color,id)=>{
        let newBoard=this.#model.addKey(color,id);
        if(!(typeof newBoard === 'string') )
        {
            this.#view.renderDisplay(newBoard);
            this.#view.addMove(this.#handleTurn);
        }
        else
        {
            this.#view.renderWin(newBoard);
            this.#view.rematch(this.#playAgain)
        }
    }
    #playAgain=()=>{
        let newBoard=this.#model.newGame();
        this.#view.renderDisplay(newBoard);
        this.#view.addMove(this.#handleTurn);
    }
}
const con = new controller(new view(),new model())


