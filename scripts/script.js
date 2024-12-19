'use strict';

window.addEventListener('DOMContentLoaded', () => {
    fix100vh();

    window.addEventListener('resize', () => {
        fix100vh();
        setTooltipPosition();
        toggleTableOverlay();
        if (filtersContainer && filtersContainer.classList.contains('cases-filters--open-filters')) {
            filtersContainer.classList.remove('cases-filters--open-filters');
        }
    });

    const header = document.querySelector('.js-header');
    const headerNav = document.querySelector('.js-header-nav');

    // Open and close menu

    const menuBurgerBtn = document.querySelector('.js-menu-burger-btn');
    
    menuBurgerBtn.addEventListener('click', () => {
        const isHasOpenClass = header.classList.contains('header--menu-open');
        return isHasOpenClass ? closeMenu() : openMenu();
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && header.classList.contains('header--menu-open')) { 
            closeMenu();
            document.body.style.overflow = '';
        }
    });

    function closeMenu(){
        header.classList.remove('header--menu-open');
        if (document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
        }
    }

    function openMenu(){
        header.classList.add('header--menu-open');
        if (document.documentElement.clientWidth < 756) {
            document.body.style.overflow = 'hidden';
        }
    }
    // End Open and close menu

    // Open and close filters

    const filtersContainer = document.querySelector('.js-cases-filters-container');
    const filtersBtn = document.querySelector('.js-cases-filters-btn');
    const filters = document.querySelector('.js-cases-filters');

    filtersBtn && filtersBtn.addEventListener('click', () => {
        filtersContainer.classList.toggle('cases-filters--open-filters');
    });

    // END Open and close filters

    // Open and Close notifications
    const notifications = document.querySelectorAll('.js-notification');
    const notificationsBtn = document.querySelector('.js-notifications-btn');
    
    notificationsBtn.addEventListener('click', () => {
        notifications.forEach((notification, i) => {
            if (!notification.classList.contains('notification--open')){
                setTimeout(() => notification.classList.add('notification--open'), i*300);
                setTimeout(() => notification.classList.remove('notification--open'), 3000);
            }
        })
    });
    // END Open and Close notifications

    // Modal
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modalCloseBtns = document.querySelectorAll('.js-modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', e => openModal(e));
    })

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.js-modal'));
        })
    })

    function openModal(e) {
        const target = e.currentTarget;
        const modalTarget = document.querySelector(`[data-modal-name=${target.dataset.modalTrigger}]`);
        modalTarget.classList.add('modal--open');
        document.body.style.overflow = 'hidden';  
        toggleTableOverlay();    
    }

    function closeModal(modal) {
        if (modal.classList.contains('modal--open')) {
            modal.classList.remove('modal--open');
            document.body.style.overflow = '';
        }
    }
    // END Modal

    // Select
    const selectTriggers = document.querySelectorAll('.js-select-btn');
    const selectOptions = document.querySelectorAll('.js-select li');

    selectTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const select = trigger.closest('.js-select');
            if ( select && !select.classList.contains('select--open')) {
                openSelectMenu(select);
            } else if (select && select.classList.contains('select--open')) {
                closeSelectMenu(select);
            }
        })
    });

    selectOptions.forEach(option => {
        option.addEventListener('click', () => {
            const select = option.closest('.js-select');
            const selectOptionHtml = select.querySelector('.js-selected-value');
            if (selectOptionHtml) {
                selectOptionHtml.innerHTML = option.querySelector('label').innerHTML;
            }
            select && closeSelectMenu(select);
        })
    });

    function openSelectMenu(select) {
        select.classList.add('select--open');     
    }

    function closeSelectMenu(select) {
        select.classList.remove('select--open');     
    }
    // END Select

    // Open and close chance table
    const chanceBtns = document.querySelectorAll('.js-chance-btn');

    chanceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const skin = btn.closest('.js-skin');
            skin.querySelector('.js-chance-table').classList.toggle('skin__table--open');
        })
    });

    // END Open and close chance table

    // Spin and open/close win block
    const roulettes = document.querySelectorAll('.js-case-roulette');
    const winBtn = document.querySelector('.js-win-btn');
    const winBlock = document.querySelector('.js-win-block');
    const winSellBtn = document.querySelector('.js-win-sell-btn');

    winBtn && winBtn.addEventListener('click', () => {
        winBlock.classList.add('win--open');
    })

    winSellBtn && winSellBtn.addEventListener('click', () => {
        winBlock.classList.remove('win--open');
    })
    // END Spin and open/close win block

    // Mini skin tooltip position
    setTooltipPosition();
    // END Mini skin tooltip position

    // Tabs
    const tabs = document.querySelectorAll('.js-tab');
    !!tabs && tabs.forEach(tab => {
        if (tab.checked) {
            const tabContent = document.querySelector(`[data-tab="${tab.id}"]`);
            tabContent.classList.add('open');
        }
    })

    !!tabs && tabs.forEach(tab => {
        tab.addEventListener('change', (e) => {
            const currentChoice = e.target.id;
            const currentChoiceBlock = document.querySelector(`[data-tab="${currentChoice}"]`);

            if (e.target.checked) {
                const nameTabs = document.querySelectorAll(`[name="${e.target.name}"]`);
                nameTabs.forEach(tab => {
                    const tabContent = document.querySelector(`[data-tab="${tab.id}"]`);
                    if (tabContent.classList.contains('open')) {
                        tabContent.classList.remove('open');
                    }
                })
                currentChoiceBlock.classList.add('open');
            }

            if (e.target.name === "support") {
                const supportHeader = document.querySelector('.js-support-header');
                supportHeader.classList.toggle('support__header--chat');
                scrollToBottom();
            }

        })
    })
    // END Tabs

    // Display/hide support
    const supportBtns = document.querySelectorAll('.js-support-btn');
    const supportBody = document.querySelector('.js-support-body');
    const supportBtnClose = document.querySelector('.js-support-close');

    supportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            supportBody.classList.toggle('support__body--open');
        });
    })

    supportBtnClose.addEventListener('click', () => {
        supportBody.classList.remove('support__body--open');
    });
    // END Display/hide support

    // Accordions
    const accordionBtns = document.querySelectorAll('.js-accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const content = btn.nextElementSibling;

            if (!expanded) {
                accordionBtns.forEach(accordion => {
                    accordion.setAttribute('aria-expanded', false);
                    accordion.nextElementSibling.style.maxHeight = '0';
                })
                btn.setAttribute('aria-expanded', !expanded);
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
    // END Accordions

    // Chat scroll
    const supportMessages = document.querySelector('.js-support-messages');

    function scrollToBottom() {
        supportMessages.scrollTop = supportMessages.scrollHeight;
    }

    const observer = new MutationObserver(() => {
        scrollToBottom();
    });
    observer.observe(supportMessages, { childList: true, subtree: true });
    // END Chat scroll

    // Upgrade
    const upgradeBlock = document.querySelector('.js-upgrade');
    const upgradeBtn = document.querySelector('.js-upgrade-btn');
    const upgradeBtns = document.querySelector('.js-upgrade-btns');
    const upgradeFailBtns = document.querySelector('.js-upgrade-fail-btns');
    const upgradeWin = document.querySelector('.js-upgrade-win');
    const upgradeFail = document.querySelector('.js-upgrade-fail');
    const upgradeSellBtn = document.querySelector('.js-upgrade-sell-btn');
    const upgradeRepeatBtn = document.querySelector('.js-upgrade-repeat-btn');
    const upgradeCloseBtn = document.querySelector('.js-upgrade-close-btn');

    upgradeBtn && upgradeBtn.addEventListener('click', () => {
        upgradeBlock.classList.add('upgrade--win');
        setTimeout(() => {
            upgradeBtn.classList.add('upgrade__btn--hide');
            upgradeBtns.classList.add('upgrade__btns--show');
            upgradeWin.classList.add('upgrade__win--open');
        }, 7000);
        
    });

    upgradeSellBtn && upgradeSellBtn.addEventListener('click', () => {
        if (upgradeBlock.classList.contains('upgrade--win')) {
            upgradeBlock.classList.remove('upgrade--win');
        }
        upgradeBtn.classList.remove('upgrade__btn--hide');
        upgradeBtns.classList.remove('upgrade__btns--show');
        upgradeWin.classList.remove('upgrade__win--open')
    });

    upgradeRepeatBtn && upgradeRepeatBtn.addEventListener('click', () => {
        if (upgradeBlock.classList.contains('upgrade--win')) {
            upgradeBlock.classList.remove('upgrade--win');
        }
        if (upgradeBlock.classList.contains('upgrade--fail')) {
            upgradeBlock.classList.remove('upgrade--fail');
        }
        if (upgradeBtn.classList.contains('upgrade__btn--hide')) {
            upgradeBtn.classList.remove('upgrade__btn--hide');
            upgradeBtns.classList.remove('upgrade__btns--show');
        }
        if (upgradeWin.classList.contains('upgrade__win--open')) {
            upgradeWin.classList.remove('upgrade__win--open')
        }
        void upgradeBlock.offsetWidth;
        upgradeBlock.classList.add('upgrade--fail');

        setTimeout(() => {
            upgradeFail.classList.add('upgrade__fail--open');
            upgradeBtn.classList.add('upgrade__btn--hide');
            upgradeFailBtns.classList.add('upgrade__btns--show');
        }, 9000);
        
    });

    upgradeCloseBtn && upgradeCloseBtn.addEventListener('click', () => {
        if (upgradeBlock.classList.contains('upgrade--fail')) {
            upgradeBlock.classList.remove('upgrade--fail');
        }
        upgradeBtn.classList.remove('upgrade__btn--hide');
        upgradeFailBtns.classList.remove('upgrade__btns--show');
        upgradeFail.classList.remove('upgrade__fail--open')
    });
    // END Upgrade
    const contractBtn = document.querySelector('.js-contract-btn');
    const contractContainer = document.querySelector('.js-contract-container');

    contractBtn && contractBtn.addEventListener('click', () => {
        contractContainer.classList.add('contract__container--create-anim');
        const contractModal = document.querySelector("[data-modal-name='contract-skin']");
        setTimeout(() => {
            contractModal.classList.add('modal--open');
            document.body.style.overflow = 'hidden';
        }, 1100);
        setTimeout(() => {
            contractContainer.classList.remove('contract__container--create-anim');
        }, 1200);
    });
    // Create a contract

    // END Create a contract

    // Click outside
    document.addEventListener('mousedown', (e) => {
        const target = e.target;
        if (!headerNav.contains(target) && !menuBurgerBtn.contains(target)) {
            closeMenu();
        }

        if (!target.closest('.js-select')) {
            const selects = document.querySelectorAll('.js-select.select--open');
            selects && selects.forEach(select => {
                closeSelectMenu(select);
            })
        }
        if (!target.closest('.js-skin') || (!target.closest('.js-chance-table') && !target.closest('.js-chance-btn'))) {
            const tables = document.querySelectorAll('.js-chance-table.skin__table--open');
            tables && tables.forEach(table => {
                table.classList.remove('skin__table--open');
            })
        }

        if (!target.closest('.js-modal-dialog') && target.closest('.js-modal')) {
            closeModal(target.closest('.js-modal'));
        }

        if (filters && !filters.contains(target) && !filtersBtn.contains(target) && filtersContainer.classList.contains('cases-filters--open-filters')) {
            filtersContainer.classList.remove('cases-filters--open-filters');
        }
    });
    // END Click outside

    // Double range slider
    let minRangeValueGap = 1;
    const range = document.querySelector(".js-range-track");
    const minval = document.querySelector(".js-range-min");
    const maxval = document.querySelector(".js-range-max");
    const rangeInput = document.querySelectorAll(".js-range-slider input");

    let minRange, maxRange, minPercentage, maxPercentage;

    const minRangeFill = () => {
        range.style.left = (rangeInput[0].value / rangeInput[0].max) * 100 + "%";
    };
    const maxRangeFill = () => {
        range.style.right =
            100 - (rangeInput[1].value / rangeInput[1].max) * 100 + "%";
    };
    const MinVlaueBubbleStyle = () => {
        minPercentage = (minRange / rangeInput[0].max) * 100;
        minval.style.left = "calc(.3rem + " + minPercentage + "%)";
        minval.style.transform = `translate(-50% - ${minPercentage / 2}%, -100%)`;
    };
    const MaxVlaueBubbleStyle = () => {
        maxPercentage = 100 - (maxRange / rangeInput[1].max) * 100;
        maxval.style.right = "calc(.1rem + " + maxPercentage + "%)";
        maxval.style.transform = `translate(50% + ${maxPercentage / 2}%, -100%)`;
    };

    const setMinValueOutput = () => {
        minRange = parseInt(rangeInput[0].value);
        minval.innerHTML = rangeInput[0].value;
    };
    const setMaxValueOutput = () => {
        maxRange = parseInt(rangeInput[1].value);
        maxval.innerHTML = rangeInput[1].value;
    };

    if (rangeInput.length) {
        setMinValueOutput();
        setMaxValueOutput();
        minRangeFill();
        maxRangeFill();
        MinVlaueBubbleStyle();
        MaxVlaueBubbleStyle();
    }

    rangeInput && rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            setMinValueOutput();
            setMaxValueOutput();

            minRangeFill();
            maxRangeFill();

            MinVlaueBubbleStyle();
            MaxVlaueBubbleStyle();

            if (maxRange - minRange < minRangeValueGap) {
            if (e.target.className === "min") {
                rangeInput[0].value = maxRange - minRangeValueGap;
                setMinValueOutput();
                minRangeFill();
                MinVlaueBubbleStyle();
                e.target.style.zIndex = "2";
            } else {
                rangeInput[1].value = minRange + minRangeValueGap;
                e.target.style.zIndex = "2";
                setMaxValueOutput();
                maxRangeFill();
                MaxVlaueBubbleStyle();
            }
            }
        });
    });
    // END Double range slider

})

function fix100vh() {
    const vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function setTooltipPosition() {
    const miniSkinTooltip = document.querySelectorAll('.js-mini-skin-tooltip');
    miniSkinTooltip.forEach(tooltip => {
        const tooltipRight = tooltip.getBoundingClientRect().right;
        const tooltipLeft = tooltip.getBoundingClientRect().left;
        const windowWidth = document.documentElement.clientWidth;

        if ((windowWidth - tooltipRight < 100) && (!tooltip.classList.contains('tooltip--right'))) {
            tooltip.classList.remove('tooltip--center', 'tooltip--left');
            tooltip.classList.add('tooltip--right');
            return;
        } 

        if ((tooltipLeft < 100) && (!tooltip.classList.contains('tooltip--left'))) {
            tooltip.classList.remove('tooltip--center', 'tooltip--right');
            tooltip.classList.add('tooltip--left');
            return;
        }
        
        if ((windowWidth - tooltipRight >= 100) && (tooltipLeft >= 100) && !tooltip.classList.contains('tooltip--center')) {
            tooltip.classList.remove('tooltip--left', 'tooltip--right');
            tooltip.classList.add('tooltip--center');
        }
    });
}

function toggleTableOverlay() {
    const skinTable = document.querySelector('.js-skin-table');
    const skinTableWrap = document.querySelector('.js-skin-table-wrap');
    if (!!skinTableWrap && (skinTableWrap.scrollHeight > skinTable.clientHeight) && !skinTable.classList.contains('skin-table--overlay')) {
        skinTable.classList.add('skin-table--overlay');
    } else if (!!skinTableWrap && (skinTableWrap.scrollHeight <= skinTable.clientHeight) && skinTable.classList.contains('skin-table--overlay')) {
        skinTable.classList.remove('skin-table--overlay');
    }
}