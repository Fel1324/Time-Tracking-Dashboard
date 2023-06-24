const cardList = document.querySelector('.main__cards');

const buttons = document.querySelectorAll('.personal__button');

const dailyButton = document.querySelector('#daily');
const weeklyButton = document.querySelector('#weekly');
const monthlyButton = document.querySelector('#monthly');

const DEFAULT_FREQUENCY = 'weekly';

let cardData = [];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        const frequency = button.dataset.frequency ?? DEFAULT_FREQUENCY;
        fetchData(frequency);
    });
});

function fetchData(frequency) {
    if(cardData.length > 0) {
        return mountList(cardData, frequency);
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            cardData = data;
            mountList(data, frequency);
        })
        .catch(error => console.error(error));
}

function mountList(data, frequency) {
    cardList.innerHTML = '';
    data.forEach(card => {
        const cardItem = document.createElement('li');
        cardItem.classList.add('main__card');

        cardItem.innerHTML = `
        <a href="" class="card__content">
            <h2 class="card__title">${card.title}</h2>
            <button class="card__button" title="Opções">
                <img src="./images/icon-ellipsis.svg" alt="Abrir opções">
            </button>

            <h3 class="card__current">${card.timeframes[frequency].current}hrs</h3>
            <p class="card__previous">Last Week - ${card.timeframes[frequency].previous}hrs</p>
        </a>`;

        cardList.appendChild(cardItem);
    });
}

fetchData(DEFAULT_FREQUENCY);
