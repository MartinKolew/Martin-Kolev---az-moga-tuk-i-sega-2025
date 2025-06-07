document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('ticketModal');
    const openModalButtons = [
        document.getElementById('openTicketModalNav'),
        document.getElementById('openTicketModalHero'),
        document.getElementById('openTicketModalWhy'), 
        document.getElementById('openTicketModalQuote'),
        document.getElementById('openTicketModalStandardPage'), 
        document.getElementById('openTicketModalStudentPage')

    ].filter(btn => btn != null); 

    const closeModalButton = modal.querySelector('.close-button');
    const closeModalFinalButton = document.getElementById('closeModalFinalButton');

    const modalStep1 = document.getElementById('modal-step-1');
    const modalStep2 = document.getElementById('modal-step-2');
    const modalStep3 = document.getElementById('modal-step-3');

    const ticketOptionButtons = modalStep1.querySelectorAll('.ticket-option');
    const purchaseForm = document.getElementById('purchase-form');
    
    const selectedTicketTypeDisplay = document.getElementById('selected-ticket-type-display');
    const selectedTicketPriceDisplay = document.getElementById('selected-ticket-price-display');
    const qrCodeImage = document.getElementById('qrCodeImage');

    const downloadTicketButton = document.getElementById('downloadTicketButton');

    let selectedTicketInfo = { type: '', price: 0 };
    let openedByButton = null; 

    const openModal = (event) => {
        resetModal();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; 
        modalStep1.querySelector('button.ticket-option')?.focus();
        if (event) {
            openedByButton = event.currentTarget;
        }
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        openedByButton?.focus(); 
        openedByButton = null;
    };

    const showStep = (stepToShow) => {
        [modalStep1, modalStep2, modalStep3].forEach(step => step.style.display = 'none');
        stepToShow.style.display = 'block';
    };

    const resetModal = () => {
        selectedTicketInfo = { type: '', price: 0 };
        if (purchaseForm) purchaseForm.reset();
        showStep(modalStep1);
    };

    openModalButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', openModal);
        }
    });
    
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }
    if (closeModalFinalButton) {
        closeModalFinalButton.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    ticketOptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedTicketInfo.type = button.dataset.type;
            selectedTicketInfo.price = parseInt(button.dataset.price);

            if(selectedTicketTypeDisplay) selectedTicketTypeDisplay.textContent = selectedTicketInfo.type;
            if(selectedTicketPriceDisplay) selectedTicketPriceDisplay.textContent = selectedTicketInfo.price;
            
            showStep(modalStep2);
            modalStep2.querySelector('input#fullName')?.focus();
        });
    });

    if (purchaseForm) {
        purchaseForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const fullName = fullNameInput ? fullNameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';

            if (fullName && email) { 
                console.log('Purchase details:', {
                    ticketType: selectedTicketInfo.type,
                    price: selectedTicketInfo.price,
                    fullName,
                    email
                });

                const qrData = `Билет: ${selectedTicketInfo.type}, Име: ${fullName}, Email: ${email}, Цена: ${selectedTicketInfo.price}лв`;
                if(qrCodeImage) qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
                
                showStep(modalStep3);
                modalStep3.querySelector('#downloadTicketButton')?.focus();
            } else {
                alert('Моля, попълнете всички полета.');
            }
        });
    }

    if (downloadTicketButton) {
        downloadTicketButton.addEventListener('click', () => {
            alert('Билетът е "свален" (демонстрация).\nВ реално приложение тук ще се генерира PDF или изображение.');
            console.log('Downloading ticket (mock)...');
        });
    }
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
            const isExpanded = mainNav.classList.contains('nav-open');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
});     