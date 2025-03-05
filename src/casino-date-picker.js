import { LitElement, html, css } from "lit";
import { format, parse } from "date-fns";

class CasinoDatePicker extends LitElement {
	static styles = css`
        :host {
            display: inline-block;
            position: relative;
        }

        input {
            padding: 8px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 150px;
        }

        .calendar-container {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            border: 1px solid #ccc;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            padding: 10px;
            display: none;
            z-index: 1000;
        }

        .calendar-container.open {
            display: block;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            width: 14%;
            text-align: center;
            padding: 6px;
            cursor: pointer;
        }

        th {
            background: #eee;
        }

        td:hover {
            background: #ddd;
        }

        .selected {
            background: #00ff00;
            color: white;
        }
    `;

	static properties = {
		selectedDate: { type: String },
		isOpen: { type: Boolean }
	};

	constructor() {
		super();
		this.selectedDate = format(new Date(), "yyyy-MM-dd");
		this.isOpen = false;
	}

	firstUpdated() {
		document.addEventListener("click", this._handleOutsideClick.bind(this));
	}

	disconnectedCallback() {
		document.removeEventListener("click", this._handleOutsideClick.bind(this));
		super.disconnectedCallback();
	}

	_handleOutsideClick(event) {
		if (!this.shadowRoot.contains(event.target)) {
			this.isOpen = false;
			this.requestUpdate();
		}
	}

	_toggleCalendar() {
		this.isOpen = !this.isOpen;
		this.requestUpdate();
	}

	_selectDate(event) {
		const day = event.target.textContent;
		if (day !== "") {
			const newDate = new Date(this.currentYear, this.currentMonth, day);
			this.selectedDate = format(newDate, "yyyy-MM-dd");
			this.isOpen = false;
			this.dispatchEvent(new CustomEvent("date-selected", { detail: this.selectedDate }));
		}
	}

	_goPrevMonth() {
		if (this.currentMonth === 0) {
			this.currentMonth = 11;
			this.currentYear--;
		} else {
			this.currentMonth--;
		}
		this.requestUpdate();
	}

	_goNextMonth() {
		if (this.currentMonth === 11) {
			this.currentMonth = 0;
			this.currentYear++;
		} else {
			this.currentMonth++;
		}
		this.requestUpdate();
	}

	_getDaysInMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}

	_generateCalendar() {
		this.currentYear = this.currentYear ?? new Date().getFullYear();
		this.currentMonth = this.currentMonth ?? new Date().getMonth();
		const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
		const daysInMonth = this._getDaysInMonth(this.currentYear, this.currentMonth);

		let days = [];
		for (let i = 0; i < firstDay; i++) {
			days.push("");
		}
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(i);
		}

		let rows = [];
		for (let i = 0; i < days.length; i += 7) {
			rows.push(days.slice(i, i + 7));
		}

		return rows;
	}

	render() {
		const calendarData = this._generateCalendar();

		return html`
            <input type="text" readonly .value="${this.selectedDate}" @click="${this._toggleCalendar}">
            <div class="calendar-container ${this.isOpen ? "open" : ""}">
                <table>
                    <tr>
                        <th colspan="2" @click="${this._goPrevMonth}">◀</th>
                        <th colspan="3">${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}</th>
                        <th colspan="2" @click="${this._goNextMonth}">▶</th>
                    </tr>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                    ${calendarData.map(
			(week) => html`
                            <tr>
                                ${week.map(
				(day) =>
					html`<td
                                            class="${day === parse(this.selectedDate, "yyyy-MM-dd", new Date()).getDate() ? "selected" : ""}"
                                            @click="${this._selectDate}"
                                        >
                                            ${day}
                                        </td>`
			)}
                            </tr>
                        `
		)}
                </table>
            </div>
        `;
	}
}

customElements.define("casino-date-picker", CasinoDatePicker);
