document.addEventListener('DOMContentLoaded', function(){
    let coef = 12.25;
    let lines = document.querySelectorAll('.line');
    let parent = document.querySelector('.lines__wrapper');
    let backgroundEU = '#ff7171';
    let backgroundOther = '#3f70d9';

    let eu = document.querySelectorAll('.ue');
    let others = document.querySelectorAll('.line:not(.ue)')


    let procents = [];
    
    for (let item of lines) {
        let procent = item.dataset.procent;
        procents.push(+item.dataset.procent);
        // Увеличиваем высоту в зависимости от процента
        let height = procent * coef;
        item.style.height = `${height}px`;

        // Проверяем есть ли класс EU и красим, если меньше 0, то трансформируем
        if (item.classList.contains('ue')) {
            item.style.background = backgroundEU
            if (procent < 0) {
                let height = -procent * coef;
                item.style.height = `${height}px`
                item.style.transform = `translateY(${height}px)`;
            } else if (procent == 0) {
                item.style.height = '2px';
                item.style.background = backgroundEU
            }
        } else {
            item.style.background = backgroundOther
            if (procent < 0) {
                let height = -procent * coef;
                item.style.height = `${height}px`
                item.style.transform = `translateY(${height}px)`;
            } else if (procent == 0) {
                item.style.height = '2px';
                item.style.background = backgroundOther
            }
        }
    }

    let minElement = Math.min(...procents);
    minElement = -minElement * coef;
    
    for (let i of lines) {
        i.style.marginBottom = `${Math.ceil(minElement) + 58}px`;
        console.log(i.style)
    }

    // Создание блока с родителем
    function createElement(k) {
        let div = document.createElement('div');
        div.classList.add('line__wrapper')
        div.appendChild(k);
        parent.appendChild(div);

        // Создание информации
        let p = document.createElement('p');
        let img = document.createElement('img');
        let span = document.createElement('span');

        let imageLink = k.dataset.map;
        img.src = imageLink;
        let procent = k.dataset.procent;
        p.classList.add('line__info');

        p.appendChild(img);
        procent > 0 ? span.textContent = `+${procent}%`: span.textContent = `${procent}%`;
        div.appendChild(p);
        p.appendChild(span);
        
    }

    // Европа
    let euLines = [...eu];
    euLines.sort(function(a, b) {
        return a.dataset.procent - b.dataset.procent;
    })

    for (let k of euLines) {
        createElement(k);
    }

    // Остальной мир
    let arrayLines = [...others];
    arrayLines.sort(function(a, b) {
        return a.dataset.procent - b.dataset.procent;
    })

    for (let k of arrayLines) {
        createElement(k);
    }

});