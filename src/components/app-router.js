import { route } from 'preact-router';
import { setTimeout } from 'timers';

export default class AppRouter {
	constructor(ghostContainer, header) {
		this.ghostContainer_ = ghostContainer;
		this.sharedElement_;
		this.sharedElementPosition_;
		this.header_ = header;
		this.prevUrl = null;
		this.currentUrl = window!==undefined?window.location.href:'';
	}

	setRoute(url) {
		this.prevUrl = this.currentUrl;
		this.currentUrl = url;
	}

	getPrevUrl() {
		return this.prevUrl;
	}

	/**
	 * @private
	 */
	clearGhostContainer_() {
		this.sharedElement_ = null;
		this.sharedElementPosition_ = null;
		this.ghostContainer_.innerHTML = '';
	}

	/**
	 * Animates to details page.
	 * @param {Node} ghostCard
	 * @param {DomRect} cardBoundingRect
	 */
	addSharedElement(element, cardBoundingRect) {
		this.sharedElement_ = element;
    this.sharedElementPosition_ = cardBoundingRect;
    element.classList.add('shared-element');
		element.style.top = `${cardBoundingRect.top}px`;
		element.style.left = `${cardBoundingRect.left}px`;
		element.style.height = `${cardBoundingRect.height}px`;
		element.style.width = `${cardBoundingRect.width}px`;
		element.style.transitionDuration = '500ms';
		this.ghostContainer_.appendChild(this.sharedElement_);
	}

	/**
	 * Animates the shared element to destination coordinates
	 * @param {*} position
	 */
	runAnimation({ top, left = 0 }) {
		return new Promise((resolve, reject) => {
			try {
        const verticalTravelDistance = top - this.sharedElementPosition_.top;
        const horizontalTravelDistance = left - this.sharedElementPosition_.left;
				this.ghostContainer_.addEventListener('transitionend', () => {
					resolve();
					setTimeout(() => {
            this.sharedElement_ && this.sharedElement_.remove();
						this.clearGhostContainer_();
					}, 300);
				}, { once: true });
				requestAnimationFrame(() => {
					this.sharedElement_.style.transform = `translateY(${verticalTravelDistance}px) translateX(${horizontalTravelDistance}px)`;
				});
			}
			catch (e) {
        console.error(e);
				this.clearGhostContainer_();
				reject();
			}
		});
	}
}