import { LitElement, html, css } from "lit";
import flatpickr from "./flatpickr.js";
import {
	endOfMonth,
	endOfWeek,
	format,
	startOfMonth,
	startOfWeek,
	subDays,
	subMonths,
	subWeeks
} from "./date-fns-exported.js";

/**
 *
 * @param {Date} date
 * @return {string}
 */
function getTaipeiTimeStr(date){
	let time = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
	return dateToStr(time);  // 只取 `YYYY-MM-DD`
}

/**
 *
 * @param {Date} date
 * @return {string}
 */
function dateToStr(date) {
	return date.toISOString().split("T")[0];
}
class FlatpickrDatePicker extends LitElement {
	static styles = css`

      input{
        height: 30px;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 0 6px;
        background-color: #fff;
        font-size: 14px;
        line-height: 30px;
        color: #FF6E00;
        text-align: center;
        border: 1px solid #979797; }
      input:hover{
        border: 1px solid #FF6E00; }
      input[disabled]{
        color: #3B3B3B;
        background-color: #EAEAEA;
        box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.2); }
      input {
        background-position: left 5px;
        padding-left: 20px;
      }
      input {
        background: #fff url(https://imag-sg-1311956177.cos.ap-singapore.myqcloud.com/images/backend/calendar.png) no-repeat 8px 7px;
        background-size: 15px;
        vertical-align: top;
        padding-left: 35px;
      }
	`;

	firstUpdated() {
		// **动态加载 flatpickr CSS**
		this.loadFlatpickrCSS();
		let now = new Date()
		// **初始化 flatpickr**
		this.fp = flatpickr(this.shadowRoot.querySelector("input"), {
			mode: "range",  // 选择范围
			defaultDate: getTaipeiTimeStr(now),
			maxDate: getTaipeiTimeStr(now)
		});
	}

	loadFlatpickrCSS() {
		if (!document.querySelector("#flatpickr-css")) {
			const link = document.createElement("link");
			link.id = "flatpickr-css";
			link.rel = "stylesheet";
			link.href = "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";
			document.head.appendChild(link);
		}
	}

	render() {
		return html`<input type="text">`;
	}
	setDate(date) {
		this.fp.setDate(date);
	}

	/**
	 *
	 * @param {"today"|"yesterday"|"thisWeek"|"lastWeek"|"thisMonth"|"lastMonth"}period
	 */
	setDateRange(period) {
		let today = new Date(getTaipeiTimeStr(new Date()));
		let startDate, endDate;

		switch (period) {
			case "today":
				startDate = endDate = today;
				break;
			case "yesterday":
				startDate = endDate = subDays(today, 1);
				break;
			case "thisWeek":
				startDate = startOfWeek(today, { weekStartsOn: 1 }); // 周一开始
				endDate = today;
				break;
			case "lastWeek":
				startDate = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
				endDate = endOfWeek(startDate, { weekStartsOn: 1 });
				break;
			case "thisMonth":
				startDate = startOfMonth(today);
				endDate = today; // 本月 1 号到今天
				break;
			case "lastMonth":
				let lastMonthDate = subMonths(today, 1);
				startDate = startOfMonth(lastMonthDate);
				endDate = endOfMonth(lastMonthDate);
				break;
			default:
				return null;
		}
		// **设置 Flatpickr 日期**
		this.fp.setDate([startDate, endDate].map(date=>format(date, "yyyy-MM-dd")));
	}
	getDate() {
		return this.fp.selectedDates.map(dateToStr);
	}

}

customElements.define("flatpickr-datepicker", FlatpickrDatePicker);
