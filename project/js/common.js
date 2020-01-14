document.addEventListener('DOMContentLoaded', function(){

    // Проверка разрешения экрана
    let size = false;

    function sizeScreen() {
        return window.matchMedia("(max-width: 992px)").matches ?
            size = true : size;
    }

    sizeScreen();

    window.addEventListener('resize', function() {
        sizeScreen();
    });

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
        // Увеличиваем высоту и ширину в зависимости от процента
        let length = procent * coef;
        console.log(length)
        item.style.height = `${length}px`;
        
        let width = procent * coef;
        // item.style.width = `${length}px`;

        // Проверяем есть ли класс EU и красим, если меньше 0, то трансформируем
        if (item.classList.contains('ue')) {
            item.style.background = backgroundEU
            if (procent < 0) {
                let length = -procent * coef;
                item.style.height = `${length}px`
                item.style.transform = `translateY(${length}px)`;
            } else if (procent == 0) {
                item.style.height = '2px';
                item.style.background = backgroundEU
            }
        } else {
            item.style.background = backgroundOther
            if (procent < 0) {
                let length = -procent * coef;
                item.style.height = `${length}px`
                item.style.transform = `translateY(${length}px)`;
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
    }

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
        p.classList.add('line__info');

        p.appendChild(img);
        procent > 0 ? span.textContent = `+${procent}%`: span.textContent = `${procent}%`;
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