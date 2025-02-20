/*  abre e fecha o menu quando clicar no icone: hamburguer e x */
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: false,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

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

/* Botão voltar para o topo */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

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
      author: "Diógenes Cândido de Lima",
      acrostico: [
        { letter: "I", text: "magem linda que me encanta" },
        { letter: "B", text: "eijando a serra ao seu redor" },
        { letter: "I", text: "dolatro essa terra querida" },
        { letter: "A", text: "inda que eu não esteja só." },
        { letter: "J", text: "amais esquecerei sua doçura" },
        { letter: "A", text: " encantar meu coração" },
        { letter: "R", text: "ogo a Deus todos os dias por" },
        { letter: "A", text: "mor, paz e consolação." },
        { space: true },
        { letter: "M", text: "iro a tarde no horizonte" },
        { letter: "E", text: " sinto meu coração palpitar" },
        { letter: "U", text: "ma alegria a me contagiar" },
        { space: true },
        { letter: "A", text: "mo esse lugar enigmático" },
        { letter: "M", text: "ístico e varonil" },
        { letter: "O", text: "rvalho da minha existência" },
        { letter: "R", text: "etrato do meu Brasil." },
      ]
    },
    {
      author: "Pode ser você",
      acrostico: [
        { letter: "I", text: "exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo" },
        { letter: "B", text: "exemplo exemplo exemplo" },
        { letter: "I", text: "exemplo exemplo exemplo exemplo exemplo exemplo" },
        { letter: "A", text: "exemplo exemplo exemplo exemplo exemplo" },
        { letter: "J", text: "exemplo exemplo exemplo exemplo exemplo exemplo" },
        { letter: "A", text: "exemplo exemplo exemplo exemplo" },
        { letter: "R", text: "exemplo exemplo exemplo" },
        { letter: "A", text: "exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo" },
        { space: true },
        { letter: "M", text: "exemplo exemplo exemplo exemplo exemplo exemplo" },
        { letter: "E", text: "exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo" },
        { letter: "U", text: "exemplo exemplo exemplo exemplo exemplo exemplo" },
        { space: true },
        { letter: "A", text: "exemplo exemplo exemplo exemplo exemplo" },
        { letter: "M", text: "exemplo exemplo exemplo exemplo exemplo exemplo exemplo exemplo" },
        { letter: "O", text: "exemplo exemplo exemplo exemplo exemplo exemplo exemplo" },
        { letter: "R", text: "exemplo exemplo exemplo" },
      ]
    }
  ];

  let currentPage = 0;

  function renderPage(pageIndex) {
    cardsWrapper.innerHTML = "";
    const { author, acrostico } = cardsData[pageIndex];

    const cardsGrid = document.createElement("div");
    cardsGrid.classList.add("cards", "grid");

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.innerHTML = `<span>${author}</span>`;

    cardsGrid.appendChild(authorDiv);

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

    const authorDiv2 = document.createElement("div");
    authorDiv2.classList.add("author");
    authorDiv2.innerHTML = `<span>${author}</span>`;
    cardsGrid.appendChild(authorDiv2);

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
