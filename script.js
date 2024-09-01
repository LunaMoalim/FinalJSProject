"use strict";

// ======== משתנים גלובליים =========
const contacts = [
    { id: 1, name: 'Hanna Berry', phone: '123-456-7890', address: '123 Elm Street',  notes: 'Friend from college', photo: 'images/hanna.jpg' },
    { id: 2, name: 'Louis Hilton', phone: '234-567-8901', address: '456 Oak Avenue',  notes: 'Work colleague', photo: 'images/louis.jpg' },
    { id: 3, name: 'Pia Parker', phone: '345-678-9012', address: '789 Pine Road',  notes: '', photo: 'images/pia.jpg' },
    { id: 4, name: 'David Davison', phone: '456-789-0123', address: '101 Maple Street', notes: '', photo: 'images/david.jpg' }
];

const contactList = document.getElementById('contactList');
const popup = document.getElementById('popup');
const contactForm = document.getElementById('contactForm');
const closePopupBtn = document.getElementById('closePopupBtn');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const addContactBtn = document.getElementById('addContactBtn');
const deleteAllContactsBtn = document.getElementById('deleteAllContactsBtn');
const footerEffectBtn = document.getElementById('footerEffectBtn');

// ======== פונקציות עזר =========

/**
 * מציגה את אנשי הקשר ברשימה
 * @param {string} query - מונח החיפוש
 */
function renderContacts(query = '') {
    contactList.innerHTML = '';

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredContacts.length === 0) {
        contactList.innerHTML = '<p>אין רשומות.</p>';
    } else {
        filteredContacts.forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.innerHTML = `
                <img src="${contact.photo}" alt="${contact.name}'s photo">
                <span>${contact.name} (${contact.phone})</span>
                <div>
                    <button class="edit-btn" data-id="${contact.id}">Edit</button>
                    <button class="delete-btn" data-id="${contact.id}">Delete</button>
                </div>
            `;
            contactList.appendChild(contactItem);
        });
    }
// Ensure footer stays at the bottom
 adjustFooterPosition();

}

/**
 * מחזירה איש קשר לפי מזהה
 * @param {number} id - מזהה איש הקשר
 * @returns {object} - איש הקשר
 */
function getContactById(id) {
    return contacts.find(contact => contact.id === id);
}

/**
 * מוסיפה איש קשר חדש לרשימה
 * @param {object} contact - פרטי איש הקשר
 */
function addContact(contact) {
    contact.id = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    contacts.push(contact);
    renderContacts();
}

/**
 * מעדכנת איש קשר קיים ברשימה
 * @param {object} updatedContact - פרטי איש הקשר המעודכנים
 */
function updateContact(updatedContact) {
    const index = contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
        contacts[index] = updatedContact;
        renderContacts();
    }
}

/**
 * מוחקת איש קשר לפי מזהה
 * @param {number} id - מזהה איש הקשר
 */
function deleteContact(id) {
    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
        contacts.splice(index, 1);
        renderContacts();
    }
}

/**
 * מוחקת את כל אנשי הקשר מהרשימה
 */
function deleteAllContacts() {
    contacts.length = 0;
    renderContacts();
}

/**
 * מציגה את חלון הפופ-אפ עם פרטי איש קשר
 * @param {object} contact - פרטי איש הקשר
 */
function showPopup(contact) {
    document.getElementById('contactId').value = contact.id || '';
    document.getElementById('photo').value = contact.photo || '';
    document.getElementById('name').value = contact.name || '';
    document.getElementById('phone').value = contact.phone || '';
    document.getElementById('address').value = contact.address || '';
    document.getElementById('notes').value = contact.notes || '';
    popup.classList.remove('hidden');
}

/**
 * מסתיר את חלון הפופ-אפ
 */
function hidePopup() {
    popup.classList.add('hidden');
}

/**
 * שומר את פרטי איש הקשר (הוספה או עדכון)
 */
function saveContact() {
    const id = parseInt(document.getElementById('contactId').value, 10);
    const photo = document.getElementById('photo').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;

    if (name && phone) {
        const contact = { id, photo, name, phone, address, notes };
        if (id) {
            updateContact(contact);
        } else {
            addContact(contact);
        }
        hidePopup();
    } else {
        alert('שם ומספר טלפון הם שדות חובה.');
    }
 function adjustFooterPosition() {
        const mainContent = document.querySelector('main');
        const footer = document.querySelector('footer');
        const windowHeight = window.innerHeight;
        const mainContentHeight = mainContent.offsetHeight;
        const footerHeight = footer.offsetHeight;
    
        if (mainContentHeight + footerHeight < windowHeight) {
            document.body.style.paddingBottom = `${footerHeight}px`;
        } else {
            document.body.style.paddingBottom = '0';
        }
    }
}


// ======== אירועים =========

/**
 * אירוע חיפוש אנשי קשר
 */
searchInput.addEventListener('input', (event) => {
    renderContacts(event.target.value);
});

/**
 * אירוע הוספת איש קשר חדש
 */
addContactBtn.addEventListener('click', () => {
    showPopup({});
});

/**
 * אירוע מחיקת כל אנשי הקשר
 */
deleteAllContactsBtn.addEventListener('click', () => {
    if (confirm('האם אתה בטוח שברצונך למחוק את כל הרשומות?')) {
        deleteAllContacts();
    }
});

/**
 * אירוע השפעת כפתור footer
 */
footerEffectBtn.addEventListener('click', () => {
    document.body.classList.toggle('effect');
});

/**
 * אירועים עבור כפתורי הרשומות (עדכון ומחיקה)
 */
contactList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('edit-btn')) {
        const contactId = parseInt(target.getAttribute('data-id'), 10);
        const contact = getContactById(contactId);
        if (contact) {
            showPopup(contact);
        }
    } else if (target.classList.contains('delete-btn')) {
        const contactId = parseInt(target.getAttribute('data-id'), 10);
        if (confirm('האם אתה בטוח שברצונך למחוק את הרשומה הזו?')) {
            deleteContact(contactId);
        }
    }
});

/**
 * אירועים למעבר מעל ויציאה מעל רשומות אנשי קשר
 */
contactList.addEventListener('mouseover', (event) => {
    const item = event.target.closest('.contact-item');
    if (item) {
        item.classList.add('hover');
    }
});

contactList.addEventListener('mouseout', (event) => {
    const item = event.target.closest('.contact-item');
    if (item) {
        item.classList.remove('hover');
    }
});

/**
 * אירוע סגירת הפופ-אפ
 */
closePopupBtn.addEventListener('click', hidePopup);
cancelBtn.addEventListener('click', hidePopup);

/**
 * אירוע שליחת טופס הפופ-אפ
 */
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveContact();
});

// הצגת אנשי הקשר בעת טעינת הדף
renderContacts();
// עדכון מיקום ה-footer בעת שינוי גובה החלון
window.addEventListener('resize', adjustFooterPosition);
