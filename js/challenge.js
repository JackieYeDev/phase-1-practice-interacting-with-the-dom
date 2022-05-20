// const init = () => {
//     counter = document.getElementById('counter');
//     counter.addEventListener("DOMContentLoaded", () => {
//         let pause = false
//         while(!pause) {
//             setTimeout(() => counter.textContent = parseInt(counter.innerText) + 1, 1000)
//         }
//     })
// }
let paused = false;

document.addEventListener("DOMContentLoaded", () => {
    const plusButton = document.getElementById('plus');
    const minusButton = document.getElementById('minus');
    const heartButton = document.getElementById('heart');
    const submitButton = document.getElementById('submit');
    const pauseButton = document.getElementById('pause');
    const counter = document.getElementById('counter');
    
    setInterval(() => {
        if(!paused){
            counter.textContent = " " + increment(counter.textContent) + " ";
        }
    } ,1000);

    plusButton.addEventListener('click', () => {
        counter.textContent = " " + increment(counter.textContent) + " ";
    });

    minusButton.addEventListener('click', () => {
        counter.textContent = " " + decrement(counter.textContent) + " ";
    });

    heartButton.addEventListener('click', () => {
        /*
        ** <li data-num="${int}">${int} has been liked <span> ${int} </span> time </li>
        */
        const currentVal = parseInt(counter.textContent);
        const list = document.querySelector('ul.likes')

        // If entry exist increment <span> else create new entry
        const entry = document.querySelectorAll('li');
        let found = false;

        for(let e of entry) {
            if(e.getAttribute('data-num') == currentVal) {
                const s = e.querySelector('span');
                s.textContent = " " + increment(s.textContent) + " ";
                found = true;
            }
        }

        if (!found){
            const li = document.createElement('li')
            const span = document.createElement('span')
            span.textContent = " 1 "
            li.setAttribute('data-num', currentVal)
            li.innerHTML = `${currentVal} has been liked<span> 1 </span>time`
            list.append(li)
        }
    });

    submitButton.addEventListener('click', () => {
        /*
        ** <p> ${comment} </p>
        */
       event.preventDefault();
       const input =  document.getElementById('comment-input');
       const comment  = document.createElement('p');
       const commentList = document.getElementById('list');

       comment.textContent = input.value;
       commentList.append(comment);
       input.value = "";
    })

    pauseButton.addEventListener('click', () => {
        // Pause or reset the counter before anything happens
        paused = !paused;
        if(!paused) {
            counter.textContent = " 0 ";
        }

        // Disable or re-enable buttons
        disableButtons(plusButton, minusButton, heartButton, submitButton);

        // Modify button text
        const text = pauseButton.innerText;
        pauseButton.innerText = text === "pause" ? "restart" : "pause";
    })
});

function increment(obj) {
    return parseInt(obj) + 1;
}

function decrement(obj) {
    return parseInt(obj) - 1;
}

function disableButtons(...obj){
    if (paused) {
        for(let o of obj) {
            o.setAttribute('disabled', true);
        }
    } else {
        for(let o of obj) {
            o.removeAttribute('disabled');
        }
    }
}