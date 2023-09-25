let myFunction = () => {
    let get = new XMLHttpRequest;
    get.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", true);
    get.send();
    get.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let myjson = JSON.parse(this.responseText);
            let formTag = document.getElementsByTagName('form')[0];
            let buttonTag = document.createElement('button');
            buttonTag.setAttribute('type', 'button');
            buttonTag.setAttribute('onclick', 'updateScore()');
            buttonTag.innerText = 'Submit';
            let qNum = 1;
            let optNum = 1;
            for (let i = 0; i < myjson.length; i++) {
                let divTag = document.createElement('div');
                for (let obj in myjson[i]) {
                    if (obj == 'question') {
                        let h4Tag = document.createElement('h4');
                        h4Tag.innerHTML = 'Q' + qNum + '. ' + myjson[i][obj];
                        divTag.appendChild(h4Tag);
                    }
                    else if (obj == 'options') {
                        for (let options = 0; options < myjson[i][obj].length; options++) {
                            let spanTag = document.createElement('span');
                            spanTag.className = 'options';
                            let radioTag = document.createElement('input');
                            let labelTag = document.createElement('label');
                            radioTag.setAttribute('type', 'radio');
                            if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4) {
                                radioTag.setAttribute('name', 'ques' + qNum);
                                spanTag.appendChild(radioTag);
                            }

                            if (options == 0 || options == 1 || options == 2 || options == 3 || options == 4) {
                                radioTag.setAttribute('id', 'opt' + optNum);
                                labelTag.setAttribute('for', 'opt' + optNum);
                                optNum = optNum + 1;
                            }
                            labelTag.innerHTML = myjson[i][obj][options];
                            spanTag.appendChild(labelTag);
                            divTag.appendChild(spanTag);
                        }
                    }
                    formTag.appendChild(divTag);
                    formTag.appendChild(buttonTag);
                }
                qNum = qNum + 1;
            }
        }
    }
}
myFunction();
function updateScore() {
    let score = 0;
    let getInput = [
        document.querySelectorAll('input[name="ques1"]:checked'),
        document.querySelectorAll('input[name="ques2"]:checked'),
        document.querySelectorAll('input[name="ques3"]:checked'),
        document.querySelectorAll('input[name="ques4"]:checked'),
        document.querySelectorAll('input[name="ques5"]:checked')
    ];
    for (let k = 0; k < getInput.length; k++) {
        for (let g = 0; g < getInput[k].length; g++) {
            if (getInput[k][g].id == 'opt3' || getInput[k][g].id == 'opt5' || getInput[k][g].id == 'opt11' || getInput[k][g].id == 'opt15' || getInput[k][g].id == 'opt18'){
                score = score + 1;
                console.log(getInput[k][g]);
            }
        }
    }
    document.getElementById('printScore').innerText = score;
}
