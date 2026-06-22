'use strict';

const pastries = JSON.parse(localStorage.getItem('pastries')) || [];

const template = document.createElement('template');

template.innerHTML = `
  <style>
    /* CSS custom properties inherit through the Shadow DOM boundary,
       so these pick up the same palette as the rest of the site.
       Fallback values are provided in case this component is ever
       used on a page without those variables defined. */

    :host {
      display: block;
      width: min(92vw, 920px);
      margin: 0 auto;
    }

    .card {
      position: relative;
      background-color: var(--paper, #FBF6EE);
      border: 1px solid var(--gold, #C9A24B);
      border-radius: 2px;
      padding: 56px 64px 64px;
      text-align: center;
      box-shadow: 0 16px 44px -14px rgba(58, 42, 30, 0.3);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card::before {
      content: '';
      position: absolute;
      inset: 16px;
      border: 1px solid rgba(201, 162, 75, 0.4);
      pointer-events: none;
    }

    :host(:hover) .card {
      transform: translateY(-6px);
      box-shadow: 0 24px 56px -16px rgba(58, 42, 30, 0.38);
    }

    /* ---------- Name ---------- */
    .card-name {
      font-family: var(--font-display, 'Cormorant Garamond', serif);
      font-weight: 600;
      font-size: clamp(2.1rem, 1.6rem + 1.6vw, 3.1rem);
      color: var(--espresso, #3A2A1E);
      letter-spacing: 0.01em;
      margin-bottom: 32px;
    }

    /* ---------- Image ---------- */
    .card-image-wrap {
      width: 100%;
      max-width: 560px;
      aspect-ratio: 4 / 3;
      margin: 0 auto 36px;
      overflow: hidden;
      border-radius: 2px;
      border: 2px solid var(--gold, #C9A24B);
      background-color: var(--cream, #F4ECE1);
    }

    .card-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* ---------- Description ---------- */
    .card-description {
      font-family: var(--font-body, 'EB Garamond', serif);
      font-style: italic;
      font-size: 1.15rem;
      line-height: 1.75;
      color: var(--espresso-soft, #5C4737);
      max-width: 60ch;
      margin: 0 auto 40px;
    }

    /* ---------- Price ---------- */
    .card-price-wrap {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      padding-top: 24px;
      border-top: 1px solid rgba(201, 162, 75, 0.45);
    }

    .card-currency {
      font-family: var(--font-display-sc, 'Cormorant SC', serif);
      font-size: 1.1rem;
      color: var(--gold, #C9A24B);
    }

    .card-price {
      font-family: var(--font-display-sc, 'Cormorant SC', serif);
      font-size: 1.9rem;
      letter-spacing: 0.04em;
      color: var(--terracotta, #B5654A);
    }

    @media (max-width: 600px) {
      .card {
        padding: 40px 28px 44px;
      }

      .card-name {
        margin-bottom: 24px;
      }

      .card-image-wrap {
        margin-bottom: 28px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }
    }
  </style>






  <article class="card">
    <h2 class="card-name">Pastry Name</h2>

    <div class="card-image-wrap">
      <img class="card-image" src="" alt="" />
    </div>

    <p class="card-description">Pastry description.</p>

    <p class="card-price-wrap">
      <span class="card-currency">$</span>
      <span class="card-price">0.00</span>
    </p>
  </article>


`;

class PastryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    //reading values

    const nameP = this.getAttribute('nameP');
    const imageP = this.getAttribute('imageP');
    const descriptionP = this.getAttribute('descriptionP');
    const priceP = this.getAttribute('priceP');

    //writing values
    this.shadowRoot.querySelector('h2').textContent = nameP;
    this.shadowRoot.querySelector('img').src = imageP;
    this.shadowRoot.querySelector('.card-description').textContent =
      descriptionP;
    this.shadowRoot.querySelector('.card-price').textContent = priceP;
  }
}
customElements.define('pastry-card', PastryCard);

function takeData() {
  const menuContainer = document.getElementById('menu-container');

  pastries.forEach((pastryElement) => {
    console.log(pastryElement);
    const card = document.createElement('pastry-card');

    card.setAttribute('idP', pastryElement.id);
    card.setAttribute('nameP', pastryElement.name);
    card.setAttribute('imageP', pastryElement.image);
    card.setAttribute('descriptionP', pastryElement.description);
    card.setAttribute('priceP', pastryElement.price);
    menuContainer.appendChild(card);
  });
}

takeData();

