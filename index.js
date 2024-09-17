const contacts = require('./contacts');
const argv = require('yargs').argv;


// Тестируем функцию listContacts
contacts.listContacts().then(console.table);

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
        const contactsList = await contacts.listContacts();
        console.table(contactsList);
        break;
  
      case 'get':
        const contact = await contacts.getContactById(id);
        console.log(contact);
        break;
  
      case 'add':
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
        break;
  
      case 'remove':
        const removedContact = await contacts.removeContact(id);
        console.log(removedContact);
        break;
  
      default:
        console.warn('Unknown action type!');
    }
  }
  
  invokeAction(argv);
  