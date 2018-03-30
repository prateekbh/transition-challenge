import { route } from 'preact-router';
import { setTimeout } from 'timers';

export default class AppRouter {
	constructor(ghostContainer, header) {
		this.ghostContainer_ = ghostContainer;
		this.header_ = header;
		this.prevUrl = null;
		this.currentUrl = '';
	}

	setRoute(url) {
		this.prevUrl = this.currentUrl;
		this.currentUrl = url;
	}

	isFirstPage() {
		return this.prevUrl === null;
	}

	/**
	 * @private
	 */
	clearGhostContainer_() {
		this.ghostContainer_.innerHTML = '';
	}

	/**
	 * Animates to details page.
	 * @param {Node} ghostCard
	 * @param {JsonObject} cardBoundingRect
	 * @param {number} cardIndex
	 */
	animateToDetails(ghostCard, cardBoundingRect, cardIndex) {
		this.header_.navigateRequest('details');
		const travelDistance = cardBoundingRect.top - 66;
		ghostCard.className = 'mdc-card';
		ghostCard.removeAttribute('style');
		ghostCard.style.top = `${cardBoundingRect.top - 16}px`;
		ghostCard.style.transitionDuration = '500ms';
		ghostCard.addEventListener('transitionend', () => {
			setTimeout(() => {
				ghostCard.remove();
				this.clearGhostContainer_();
			}, 300);

		});
		this.ghostContainer_.appendChild(ghostCard);
		requestAnimationFrame(() => {
			window.scrollTo(0,0);
			ghostCard.style.transform = `translateY(-${travelDistance}px)`;
			route(`/details/${cardIndex}`);
		});
	}
}