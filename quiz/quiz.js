const data = [
    {
        question: 'hit b?',
        a: '1',
        b: '2',
        c: '3',
        d: '4',
        correct: 'b',
    },
    {
        question: 'hit d?',
        a: '11',
        b: '22',
        c: '33',
        d: '44',
        correct: 'd',
    },
    {
        question: 'hit a?',
        a: '111',
        b: '222',
        c: '333',
        d: '444',
        correct: 'a',
    },
    {
        question: 'hit c?',
        a: '1111',
        b: '2222',
        c: '3333',
        d: '4444',
        correct: 'c',
    },
]
/* let item = ()=>{
    return `
    <ul>
        <li>
            <input type="radio" id='a' name='answer'>
            <label for="a">Question</label>
        </li>
        <li>
            <input type="radio" id='b' name='answer'>
            <label for="b">Question</label>
        </li>
        <li>
            <input type="radio" id='c' name='answer'>
            <label for="c">Question</label>
        </li>
        <li>
            <input type="radio" id='d' name='answer'>
            <label for="d">Question</label>
        </li>
    </ul>`
} */
const quizContainer = document.querySelector('.quiz-container'),
aLi = document.querySelector('.a_label'),
bLi = document.querySelector('.b_label'),
cLi = document.querySelector('.c_label'),
dLi = document.querySelector('.d_label'),
question = document.querySelector('.question'),
submitBtn = document.querySelector('.sub-btn');
let selectRa = ()=>{
    let radioEl = document.getElementsByName('answer');
    for(let i = 0; i<radioEl.length;i++){
        if(radioEl[i].checked) return  {res:radioEl[i].id,
        id:i}
    }
}

let n = 0, totalScr =0;
let addHtml = (n)=>{
    question.innerText = data[n].question;
    aLi.innerText = data[n].a;
    bLi.innerText = data[n].b;
    cLi.innerText = data[n].c;
    dLi.innerText = data[n].d;
}
addHtml(n); 
submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let answer = selectRa()
    console.log(data[n].correct)
    if(answer.res == data[n].correct){
        totalScr++;
    }
    n++;
    if(n<data.length){
        addHtml(n);
    }else{
        console.log(`You made ${totalScr}/4`)
        quizContainer.innerText = `You made ${totalScr}/4`
        console.warn('///...')
    }
})
