import { initCalendar } from "./calendar.js";
import { initEventCreateButtons } from "./event-create-button.js";
import { initEventDeleteDialog } from "./event-delete-dialog.js";
import { initEventDetailsDialog } from "./event-details-dialog.js";
import { initEventFormDialog } from "./event-form-dialog.js";
import { initEventStore } from "./event-store.js";
import { initHamburger } from "./hamburger.js";
import { initMiniCalendars } from "./mini-calendar.js";
import { initMobileSidebar } from "./mobile-sidebar.js";
import { initNav } from "./nav.js";
import { initNotifications } from "./notifications.js";
import { initViewSelect } from "./view-select.js";
import { initResponsive } from "./responsive.js";
import { initUrl } from "./url.js";
import { initSync } from "./sync.js";

const params = new URLSearchParams(window.location.search);
const isReadonly = params.get("readonly") === "1";

const eventStore = initEventStore();
initCalendar(eventStore);

if (!isReadonly) {
  initEventCreateButtons();
  initEventDeleteDialog();
  initEventDetailsDialog();
  initEventFormDialog();
  initNotifications();
  initSync();
}

initHamburger();
initMiniCalendars();
initMobileSidebar();
initNav();
initViewSelect();
initUrl();
initResponsive();