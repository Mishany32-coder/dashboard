(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    let currentPage = 1;
    const totalPages = 40;
    const data = [ {
        name: "Jane Cooper",
        company: "Microsoft",
        phone: "(225) 555-0118",
        email: "jane@microsoft.com",
        country: "United States",
        status: "Active"
    }, {
        name: "Floyd Miles",
        company: "Yahoo",
        phone: "(205) 555-0100",
        email: "floyd@yahoo.com",
        country: "Kiribati",
        status: "Inactive"
    }, {
        name: "Ronald Richards",
        company: "Adobe",
        phone: "(302) 555-0107",
        email: "ronald@adobe.com",
        country: "Israel",
        status: "Inactive"
    }, {
        name: "Marvin McKinney",
        company: "Tesla",
        phone: "(252) 555-0126",
        email: "marvin@tesla.com",
        country: "Iran",
        status: "Active"
    }, {
        name: "Jerome Bell",
        company: "Google",
        phone: "(629) 555-0129",
        email: "jerome@google.com",
        country: "Réunion",
        status: "Active"
    }, {
        name: "Kathryn Murphy",
        company: "Microsoft",
        phone: "(406) 555-0120",
        email: "kathryn@microsoft.com",
        country: "Curaçao",
        status: "Active"
    }, {
        name: "Jacob Jones",
        company: "Yahoo",
        phone: "(208) 555-0112",
        email: "jacob@yahoo.com",
        country: "Brazil",
        status: "Active"
    }, {
        name: "Kristin Watson",
        company: "Facebook",
        phone: "(704) 555-0127",
        email: "kristin@facebook.com",
        country: "Åland Islands",
        status: "Inactive"
    } ];
    function menuItemsInit() {
        const menuItems = document.querySelectorAll(".menu__item");
        if (menuItems.length) document.addEventListener("click", (function(e) {
            if (e.target.closest(".menu__item") || e.target.closest(".menu__link")) {
                let targetElement = e.target;
                e.target.closest(".menu__link") ? targetElement = e.target.parentElement : "";
                menuItems.forEach((item => {
                    item.classList.remove("_selected");
                }));
                targetElement.classList.add("_selected");
            }
        }));
    }
    function generateTable(data) {
        const tbody = document.querySelector(".table-customers__body");
        if (tbody && data) data.forEach((item => {
            const row = document.createElement("tr");
            row.classList.add("table-customers__row");
            Object.entries(item).forEach((([key, value]) => {
                const cell = document.createElement("td");
                cell.classList.add("table-customers__cell");
                if (key !== "status") cell.textContent = value; else cell.classList.add(value === "Active" ? "_active-label" : "_inactive-label");
                row.appendChild(cell);
            }));
            tbody.appendChild(row);
        }));
    }
    function generatePagination(totalPages, currentPage) {
        const paginationContainer = document.querySelector(".pagination__items");
        if (paginationContainer) {
            const prevButton = '<span class="pagination__item pagination__item_prev ">&lt;</span>';
            const nextButton = '<span class="pagination__item pagination__item_next ">&gt;</span>';
            let MAX_VISIBLE_BUTTONS = 5;
            const BUTTONS_ON_EACH_SIDE = Math.round((MAX_VISIBLE_BUTTONS - 2) / 2);
            let startPage = 1;
            let endPage = totalPages;
            paginationContainer.innerHTML = "";
            if (totalPages > MAX_VISIBLE_BUTTONS) if (currentPage <= BUTTONS_ON_EACH_SIDE + 1) endPage = MAX_VISIBLE_BUTTONS - 1; else if (currentPage >= totalPages - BUTTONS_ON_EACH_SIDE) startPage = totalPages - MAX_VISIBLE_BUTTONS + 2; else {
                startPage = currentPage - BUTTONS_ON_EACH_SIDE;
                endPage = currentPage + BUTTONS_ON_EACH_SIDE - 1;
            }
            if (startPage > 1) {
                const firstButton = createPageButton(1);
                paginationContainer.appendChild(firstButton);
                if (startPage > 2) {
                    const dots = createDots();
                    paginationContainer.appendChild(dots);
                }
            }
            for (let i = startPage; i <= endPage; i++) {
                const pageButton = createPageButton(i, currentPage === i);
                paginationContainer.appendChild(pageButton);
            }
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    const dots = createDots();
                    paginationContainer.appendChild(dots);
                }
                const lastButton = createPageButton(totalPages);
                paginationContainer.appendChild(lastButton);
            }
            paginationContainer.insertAdjacentHTML("afterbegin", prevButton);
            paginationContainer.insertAdjacentHTML("beforeend", nextButton);
            const prevArrow = document.querySelector(".pagination__item_prev");
            const nextArrow = document.querySelector(".pagination__item_next");
            prevArrow.addEventListener("click", (function() {
                if (currentPage > 1) {
                    currentPage--;
                    generatePagination(totalPages, currentPage);
                }
            }));
            nextArrow.addEventListener("click", (function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    generatePagination(totalPages, currentPage);
                }
            }));
        }
    }
    function createPageButton(pageNumber, isActive = false) {
        const button = document.createElement("button");
        button.textContent = pageNumber;
        button.classList.add("pagination__item");
        if (isActive) button.classList.add("_selected");
        button.addEventListener("click", (function() {
            currentPage = pageNumber;
            generatePagination(totalPages, currentPage);
        }));
        return button;
    }
    function createDots() {
        const dots = document.createElement("span");
        dots.textContent = "...";
        dots.classList.add("pagination__item", "pagination__item_ellipsis");
        return dots;
    }
    function setupTableSearch(tableId, inputId) {
        const searchInput = document.getElementById(inputId);
        const tableRows = document.querySelectorAll(`.${tableId} tbody tr`);
        searchInput.addEventListener("keyup", (function() {
            const searchTerm = this.value.toLowerCase();
            tableRows.forEach((function(row) {
                if (row.textContent.toLowerCase().indexOf(searchTerm) === -1) row.style.display = "none"; else row.style.display = "table-row";
            }));
        }));
    }
    generateTable(data);
    menuItemsInit();
    setupTableSearch("table-customers", "search");
    generatePagination(totalPages, currentPage);
    isWebp();
})();