const cardList = document.querySelector('.main__cards');

fetch('data.json')
    .then(response => response.json())
    .then(cardListData => {
        cardListData.forEach(card => {
            const cardItem = document.createElement('li');
            cardItem.classList.add('main__card');
            
            cardItem.innerHTML = `
                <a href="" class="card__content">
                    <h2 class="card__title">${card.title}</h2>
                    <button class="card__button" title="Opções">
                        <img src="./images/icon-ellipsis.svg" alt="Abrir opções">
                    </button>

                    <h3 class="card__current">${card.timeframes.weekly.current}hrs</h3>
                    <p class="card__previous">Last Week - ${card.timeframes.weekly.previous}hrs</p>
                </a>
            `;
            cardList.appendChild(cardItem);
        });
    })

.catch(error => console.error(error));

const buttons = document.querySelectorAll('.personal__button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');
    });
});
