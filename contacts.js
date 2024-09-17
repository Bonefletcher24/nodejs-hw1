const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Получение списка контактов
async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  }
  
  // Получение контакта по ID
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(c => c.id === contactId);
    return contact || null;
  }
  
  // Добавление контакта
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
      id: (contacts.length + 1).toString(),
      name,
      email,
      phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  
  // Удаление контакта
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(c => c.id === contactId);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  }
  
  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
  };
  

