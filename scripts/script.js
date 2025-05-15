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
    const notificationsCloseBtns = document.querySelectorAll('.js-notifications-close');
    notificationsCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const notificationItem = btn.closest('.js-notification')
            notificationItem.classList.remove('notification--open')
        })
    })

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
            !!supportBody && supportBody.classList.toggle('support__body--open');
        });
    })

    !!supportBtnClose && supportBtnClose.addEventListener('click', () => {
        supportBody.classList.remove('support__body--open');
    });
    // END Display/hide support

    // Display/hide support attach loader
    const supportAttach = document.querySelector('.js-support-attach');
    let loaderAttach = document.createElement("div");
    loaderAttach.classList.add('loader');
    supportAttach && supportAttach.addEventListener('click', () => {
        supportAttach.classList.add('hide');
        supportAttach.after(loaderAttach);
        setTimeout(() => {
            loaderAttach.remove();
            supportAttach.classList.remove('hide');
        }, 2000);
    });
    // END Display/hide support attach loader

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
                btn.setAttribute('aria-expanded', !expanded);
                content.style.maxHeight = '0';
            }
        });
    });
    // END Accordions

    // Display/hide provably more text
    const provablyMoreBtn = document.querySelector('.js-provably-more-btn');
    const provablyMore = document.querySelector('.js-provably-more');
    const provablyMoreText = document.querySelector('.js-provably-more-text');

    !!provablyMoreBtn && provablyMoreBtn.addEventListener('click', () => {
        if (provablyMore.style.maxHeight === '' || provablyMore.style.maxHeight === '0px') {
            provablyMore.style.maxHeight = provablyMoreText.scrollHeight + 'px';
            provablyMoreBtn.textContent = "Скрыть подробности";
        } else {
            provablyMore.style.maxHeight = '0';
            provablyMoreBtn.textContent = "Узнать подробнее";
        }
    });
    // END Display/hide provably more text

    // Chat scroll
    const supportMessages = document.querySelector('.js-support-messages');

    function scrollToBottom() {
        supportMessages.scrollTop = supportMessages.scrollHeight;
    }

    const observer = new MutationObserver(() => {
        scrollToBottom();
    });
    !!supportMessages && observer.observe(supportMessages, { childList: true, subtree: true });
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

    // Create a contract
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

    // Range slider
    const rangeSliders = document.querySelectorAll(".js-range-slider");
    const rangeInputs = document.querySelectorAll(".js-range-slider input");

    const rangeStyle = () => {
        rangeSliders.forEach(slider => {
            const range = slider.querySelector(".js-range-track");
            const rangeVal = slider.querySelector(".js-range-value");
            const rangeInput = slider.querySelectorAll(".js-range-slider input");
            const percentage = `${(rangeInput[0].value / rangeInput[0].max) * 100}%`;
            rangeVal && (rangeVal.style.left = percentage);
            range.style.width = percentage;

            if(slider.classList.contains('referral__range-slider')) {
                rangeVal.innerText = `${rangeInput[0].value}%`;
            }
        });
    };

    if (!!rangeInputs.length) {
        rangeStyle();
    }

    rangeInputs && rangeInputs.forEach((input) => {
        input.addEventListener("input", () => {
            rangeStyle();
        });
    });

    // END Range slider

    // Double range slider
    let dMinRangeValueGap = 1;
    const dRange = document.querySelector(".js-d-range-track");
    const dMinval = document.querySelector(".js-d-range-min");
    const dMaxval = document.querySelector(".js-d-range-max");
    const dRangeInput = document.querySelectorAll(".js-d-range-slider input");

    let dMinRange, dMaxRange, dMinPercentage, dMaxPercentage;

    const minRangeFill = () => {
        dRange.style.left = (dRangeInput[0].value / dRangeInput[0].max) * 100 + "%";
    };
    const maxRangeFill = () => {
        dRange.style.right =
            100 - (dRangeInput[1].value / dRangeInput[1].max) * 100 + "%";
    };
    const MinVlaueBubbleStyle = () => {
        dMinPercentage = (dMinRange / dRangeInput[0].max) * 100;
        dMinval.style.left = "calc(.3rem + " + dMinPercentage + "%)";
        dMinval.style.transform = `translate(-50% - ${dMinPercentage / 2}%, -100%)`;
    };
    const MaxVlaueBubbleStyle = () => {
        dMaxPercentage = 100 - (dMaxRange / dRangeInput[1].max) * 100;
        dMaxval.style.right = "calc(.1rem + " + dMaxPercentage + "%)";
        dMaxval.style.transform = `translate(50% + ${dMaxPercentage / 2}%, -100%)`;
    };

    const setMinValueOutput = () => {
        dMinRange = parseInt(dRangeInput[0].value);
        dMinval.innerHTML = dRangeInput[0].value;
    };
    const setMaxValueOutput = () => {
        dMaxRange = parseInt(dRangeInput[1].value);
        dMaxval.innerHTML = dRangeInput[1].value;
    };

    if (dRangeInput.length) {
        setMinValueOutput();
        setMaxValueOutput();
        minRangeFill();
        maxRangeFill();
        MinVlaueBubbleStyle();
        MaxVlaueBubbleStyle();
    }

    dRangeInput && dRangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            setMinValueOutput();
            setMaxValueOutput();

            minRangeFill();
            maxRangeFill();

            MinVlaueBubbleStyle();
            MaxVlaueBubbleStyle();

            if (dMaxRange - dMinRange < dMinRangeValueGap) {
            if (e.target.className === "min") {
                dRangeInput[0].value = dMaxRange - dMinRangeValueGap;
                setMinValueOutput();
                minRangeFill();
                MinVlaueBubbleStyle();
                e.target.style.zIndex = "2";
            } else {
                dRangeInput[1].value = dMinRange + dMinRangeValueGap;
                e.target.style.zIndex = "2";
                setMaxValueOutput();
                maxRangeFill();
                MaxVlaueBubbleStyle();
            }
            }
        });
    });
    // END Double range slider

    // Open case
    const caseContainer = document.querySelector(".js-case-container");
    const caseContainerMagic = document.querySelector(".js-case-container-magic");
    const openCaseBtn = document.querySelector(".js-open-case");
    const caseHero = document.querySelector(".js-case-hero");
    const caseRoulette = document.querySelector(".js-case-hero-roulette");

    !!openCaseBtn && openCaseBtn.addEventListener("click", () => {
        if(!!caseContainer) {
            caseContainer.classList.add("open");
            setTimeout(() => {
                caseHero.style.display = 'none';
                caseRoulette.style.display = 'block';
            }, 300);
        } else if (!!caseContainerMagic) {
            caseContainerMagic.classList.add("open");
            setTimeout(() => {
                caseHero.style.display = 'none';
                caseRoulette.style.display = 'block';
            }, 3300);
        }
    });
    //END Open case

    // Open win cards
    const openWinRareBtn = document.querySelector(".js-open-win-rare");
    const winRare = document.querySelector(".js-win-rare");
    const closeWinRareBtn = document.querySelector(".js-close-win-rare");
    const winRareVideo = document.querySelector(".js-win-rare-video");
    const winRareItems = document.querySelectorAll(".js-win-rare-item");
    
    !!openWinRareBtn && openWinRareBtn.addEventListener('click', () => {
        winRare.classList.add('win-rare--open');
        document.body.style.overflow = 'hidden';
        // Фикс для Safari (иногда видео не растягивается)
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            winRareVideo.style.objectFit = 'cover';
            winRareVideo.setAttribute('playsinline', '');
            winRareVideo.setAttribute('webkit-playsinline', '');
        }
        winRareVideo.volume = 0.5;
        winRareVideo.play();
    });

    !!closeWinRareBtn && closeWinRareBtn.addEventListener('click', () => {
        winRare.classList.remove('win-rare--open');
        document.body.style.overflow = '';
        winRareItems.forEach(item => {
            if (item.classList.contains('win-rare__item--open')) {
                item.classList.remove('win-rare__item--open');
            }
        });
    });

    !!winRareItems && winRareItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('win-rare__item--open')) {
                item.classList.toggle('win-rare__item--open');
            }
        });
    });
    // END Open win card
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