import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params)
    this.setTitle('Presentation')
  }

  async getHtml() {
    return`        
      <div class="transition slide-right is-active"></div>
        <nav>
          <div class="home__header">
            <a href="/" >
              <h1 class="animate-text">Dr Bruyère-Franc</h1>
            </a>
          </div>
          <div class="views__footer">
            <a href="/presentation" class="home__footer__section__presentation" data-link>
              <svg x="100" y="20" viewBox="0 0 10 2">
                <text x="0" y="2">PRESENTATION</text>
              </svg>
            </a>
            <a href="/traitements" class="home__footer__section__traitements" data-link>
              <svg x="100" y="20" viewBox="0 0 10 2">
                <text x="0" y="2">TRAITEMENTS</text>
              </svg>
            </a>
            <a href="/contact" class="home__footer__section__contact" data-link>
              <svg x="100" y="20" viewBox="0 0 10 2">
                <text x="0" y="1">CONTACT</text>
              </svg>
            </a>
          </div>
        </nav>
      `
  }
}