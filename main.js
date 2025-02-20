/* ScrollReveal: Mostrar elementos quando der scroll na página */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#inicio .image, #inicio .text,
  #sobre .image, #sobre .text,
  #acrosticos header, #acrosticos .card,
  #enviar header, 
  #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* Menu ativo conforme a seção visível na página */
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})

document.addEventListener("DOMContentLoaded", () => {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  const prevButtons = document.querySelectorAll(".prev");
  const nextButtons = document.querySelectorAll(".next");
  const pageIndicators = document.querySelectorAll(".page-indicator");

  const cardsData = [
    {
      author: "Manoel Prado",
      acrostico: [
        { letter: "A", text: "o que me parece" },
        { letter: "N", text: "ão é de forma humana" },
        { letter: "N", text: "a verdade," },
        { letter: "A", text: "ngelical é essa mulher," },
        { space: true },
        { letter: "P", text: "or dentro e por fora." },
        { letter: "A", text: "nseio por estarmos" },
        { letter: "U", text: "nidos para sempre," },
        { letter: "L", text: "ado a lado," },
        { letter: "A", text: "mando-te" },
        { space: true },
        { letter: "M", text: "ais do que a mim mesmo," },
        { letter: "E", text: "ntrelaçando nossos corpos e almas," },
        { letter: "U", text: "ma só carne nos tornar." },
        { space: true },
        { letter: "A", text: "inda que tarde," },
        { letter: "M", text: "eu amor guardado para ti está," },
        { letter: "O", text: "utrora degradado, agora" },
        { letter: "R", text: "estaurado em Cristo para ti, doar." }
      ]
    }
  ];

  let currentPage = 0;

  function renderPage(pageIndex) {
    cardsWrapper.innerHTML = "";
    const { author, acrostico } = cardsData[pageIndex];

    const cardsGrid = document.createElement("div");
    cardsGrid.classList.add("cards", "grid");

    acrostico.map(({ letter, text, space }) => {
      if(space) {
        const card = document.createElement("br");

        cardsGrid.appendChild(card);
      }else {
        const card = document.createElement("div");
        card.classList.add("card");
  
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        titleDiv.innerHTML = `<h3>${letter}</h3>`;
  
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content-text");
        contentDiv.innerHTML = `<p>${text}</p>`;
  
        card.appendChild(titleDiv);
        card.appendChild(contentDiv);
        cardsGrid.appendChild(card);
      }
    });

    cardsWrapper.appendChild(cardsGrid);
    updatePagination();
    scrollReveal.reveal(".card", { interval: 100 });
  }

  function updatePagination() {
    prevButtons.forEach(button => button.disabled = currentPage === 0);
    nextButtons.forEach(button => button.disabled = currentPage === cardsData.length - 1);
    pageIndicators.forEach(indicator => indicator.textContent = `${currentPage + 1} / ${cardsData.length}`);
  }

  prevButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage -= 1;
        renderPage(currentPage);
      }
    });
  });

  nextButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (currentPage < cardsData.length - 1) {
        currentPage += 1;
        renderPage(currentPage);
      }
    });
  });

  renderPage(currentPage);
});
