/*!
Copyright 2016 OÜ Nevermore

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store } from "redux";
import { Provider } from "react-redux";

export interface DialogOptions {
	[key: string]: Store<any> | boolean;
	store?: Store<any>;
	destroyOnClose?: boolean;
	showClose?: boolean;
}

export class Dialog {
	options: DialogOptions;
	isOpen: number; // 0 - Closed, 1 - Modal, 2 - Regular
	ref: any; // Reference returned by ReactDOM.render()

	private elContainer: HTMLDivElement;
	private elDialog: HTMLDivElement;
	private elDialogClose: HTMLDivElement;
	private elDialogContent: HTMLDivElement;

	static defaults: DialogOptions = {store: undefined, destroyOnClose: true, showClose: true};

	private static optionsWithDefaults(options: DialogOptions = {}) {
		let result: DialogOptions = {};
		for (let prop in this.defaults) {
			if (this.defaults.hasOwnProperty(prop)) {
				if (options.hasOwnProperty(prop)) {
					result[prop] = options[prop];
				} else {
					result[prop] = this.defaults[prop];
				}
			}
		}
		return result;
	}

	constructor(reactElement: React.ReactElement<any>, options: DialogOptions = {}) {
		this.options = Dialog.optionsWithDefaults(options);
		this.isOpen = 0;

		// Create the container DOM element
		this.elContainer = document.createElement("div");
		this.elContainer.className = "rud-container";

		// Create the dialog DOM element
		this.elDialog = document.createElement("div");
		this.elDialog.className = "rud-dialog";

		if (this.options.showClose) {
			this.elDialogClose = document.createElement("div");
			this.elDialogClose.className = "mdl-button mdl-js-button mdl-button--icon material-icons rud-close";
			componentHandler.upgradeElement(this.elDialogClose);
			this.onClickClose = this.onClickClose.bind(this);
			this.elDialogClose.addEventListener("click", this.onClickClose);
			this.elDialog.appendChild(this.elDialogClose);
		}

		this.elDialogContent = document.createElement("div");
		this.elDialogContent.className = "rud-content";
		this.elDialog.appendChild(this.elDialogContent);

		this.onClick = this.onClick.bind(this);
		this.elContainer.addEventListener("click", this.onClick);
		this.elContainer.appendChild(this.elDialog);

		this.onKeyDown = this.onKeyDown.bind(this);
		document.addEventListener("keydown", this.onKeyDown);
		document.body.appendChild(this.elContainer);
		
		// Create & mount the react component to the dialog's content element
		if (this.options.store == undefined) {
			// Directly, if no redux store is provided
			this.ref = ReactDOM.render(reactElement, this.elDialogContent);
		} else {
			// .. otherwise wrap it in a react-redux Provider element to pass the redux store via react context
			this.ref = ReactDOM.render(React.createElement(Provider, {store: this.options.store}, reactElement), this.elDialogContent);
		}
	}

	destroy() {
		if (this.elDialogContent != undefined) {
			ReactDOM.unmountComponentAtNode(this.elDialogContent);
			this.elDialogContent = undefined;
			this.ref = undefined;
		}
		if (this.elDialogClose != undefined) {
			this.elDialogClose.removeEventListener("click", this.onClickClose);
			componentHandler.downgradeElements(this.elDialogClose);
			this.elDialogClose = undefined;
		}
		if (this.elDialog != undefined) {
			this.elDialog = undefined;
		}
		if (this.elContainer != undefined) {
			this.elContainer.removeEventListener("click", this.onClick);
			document.body.removeChild(this.elContainer);
			this.elContainer = undefined;
		}
		document.removeEventListener("keydown", this.onKeyDown);
	}

	open(modal = true) {
		// TODO: Implement non-modal
		if (this.elContainer != undefined) {
			this.elContainer.style.display = "block";
			this.isOpen = 1;
		}
	}

	close() {
		this.isOpen = 0;
		if (this.elContainer != undefined) {
			this.elContainer.style.display = "none";			
		}
		if (this.options.destroyOnClose) {
			this.destroy();
		}
	}

	private onKeyDown(e: KeyboardEvent) {
		// We only care about open modal dialogs here
		if (this.isOpen != 1) return;
		// Key: Escape
		if (e.which == 27) {
			e.preventDefault();
			e.stopPropagation();
			this.close();
		}
	}

	private onClickClose(e: MouseEvent) {
		this.close();
	}

	private clickedInDialog(e: MouseEvent) {
		if (this.elDialog == undefined) return false;
		let rect = this.elDialog.getBoundingClientRect();
		return (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
	}

	private onClick(e: MouseEvent) {
		if (!this.clickedInDialog(e)) {
			this.close();
		}
	}
}