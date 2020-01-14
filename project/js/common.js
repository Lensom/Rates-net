document.addEventListener('DOMContentLoaded', function(){

    let size = false;
    let left = 150;

    // Проверка разрешения экрана
    window.addEventListener('resize', function() {
        sizeScreen();
        distance();
        generateLines();
    });

    function sizeScreen() {
        return (window.matchMedia("(max-width: 992px)").matches)
            ? size = true
            : size = false;
    }

    sizeScreen();

    let coef = 12.25;
    let lines = document.querySelectorAll('.line');
    let parent = document.querySelector('.lines__wrapper');
    let backgroundEU = '#ff7171';
    let backgroundOther = '#3f70d9';

    let eu = document.querySelectorAll('.ue');
    let others = document.querySelectorAll('.line:not(.ue)')


    let procents = [];
    let width = [];

    function generateLines() {
        for (let item of lines) {
            let procent = item.dataset.procent;
            procents.push(+item.dataset.procent);
            // Увеличиваем высоту и ширину в зависимости от процента
            let length = procent * coef;
            console.log(size);
            if (!size) {
                item.style.height = `${length}px`;
                item.style.width = '20px';
                item.style.transform = `translateY(${0}px)`;
            } else {
                item.style.height = '20px';
                item.style.width = `${length}px`;
                item.style.transform = `translateY(-50%)`;
            }
    
            width.push(length);
    
            // Проверяем есть ли класс EU и красим, если меньше 0, то трансформируем
            if (item.classList.contains('ue')) {
                item.style.background = backgroundEU
                if (procent < 0) {
                    let length = -procent * coef;
                    if (!size) {
                        item.style.height = `${length}px`
                        item.style.transform = `translateY(${length}px)`;
    
                    } else {
                        item.style.width = `${length}px`
                    }
                } else if (procent == 0) {
                    item.style.background = backgroundEU;
                    if (!size) {
                        item.style.height = '2px';
                    } else {
                        item.style.height = '20px';
                        item.style.width = '2px';
                    }
                }
            } else {
                item.style.background = backgroundOther
                if (procent < 0) {
                    let length = -procent * coef;
                    if (!size) {
                        item.style.height = `${length}px`
                        item.style.transform = `translateY(${length}px)`;
                    } else {
                        item.style.width = `${length}px`
                    }
                } else if (procent == 0) {
                    item.style.height = '2px';
                    item.style.background = backgroundOther;
                }
            }
        }
    }

    generateLines();

    let minElement = Math.min(...procents);
    minElement = -minElement * coef;

    function distance() {
        for (let i = 0; i < lines.length; i++) {
            if (!size) {
                lines[i].style.marginBottom = `${Math.ceil(minElement) + 58}px`;
                lines[i].style.left = '0px';
            } else {
                if (width[i] < 0) {
                    lines[i].style.left = `${left + width[i]}px`
                } else {
                    lines[i].style.left = `${left}px`;
                }
            }
        }
    }

    distance();
    
    // Создание блока с родителями
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
        console.log(procent);
        p.classList.add('line__info');

        p.appendChild(img);
        procent > 0 ? span.textContent = `+${procent}%`:
        procent == 0 ? span.textContent = `+${procent}.00%`: 
        span.textContent = `${procent}%`;
        div.appendChild(p);
        p.appendChild(span);
        
        // Create tooltip
        let tooltip = document.createElement('div');
        let tooltipSpan = document.createElement('span');
        tooltip.classList.add('line__tooltip');
        let country = k.dataset.country
        // console.log(country)
        tooltipSpan.innerHTML = country;
        tooltip.appendChild(tooltipSpan);
        p.appendChild(tooltip)
        
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

document.addEventListener('DOMContentLoaded', function(){

    let btn = $('.header__mobile');
    let body = $('body');

    $(btn).on('click', function(e) {
        e.preventDefault();
        $(body).toggleClass('show');
    });

});


$(function() {
	// (Optional) Active an item if it has the class "is-active"	
	$(".accordion > .accordion__item-active").children(".accordion__panel").slideDown();
	
	$(".accordion > .accordion__item").click(function() {
		// Cancel the siblings
		$(this).siblings(".accordion__item").removeClass("is-active").children(".accordion__panel").slideUp();
		// Toggle the item
		$(this).toggleClass("accordion__item-active").children(".accordion__panel").slideToggle("ease-out");
	});
});