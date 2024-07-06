const { program } = require('commander');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact
} = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      if (!id) {
        console.log('Please provide --id option for get action.');
        return;
      }
      const contactById = await getContactById(id);
      if (contactById) {
        console.log('Contact:', contactById);
      } else {
        console.log('Contact not found.');
      }
      break;

    case 'add':
      if (!name || !email || !phone) {
        console.log('Please provide --name, --email and --phone options for add action.');
        return;
      }
      const newContact = await addContact(name, email, phone);
      console.log('Contact added:', newContact);
      break;

    case 'remove':
      if (!id) {
        console.log('Please provide --id option for remove action.');
        return;
      }
      const removedContacts = await removeContact(id);
      console.log('Contact removed. Remaining contacts:');
      console.table(removedContacts);
      break;

    default:
      console.warn('Unknown action. Available actions: list, get, add, remove.');
  }
}

program
  .option('-a, --action <type>', 'Action: list, get, add, remove')
  .option('-i, --id <type>', 'Contact ID for get or remove action')
  .option('-n, --name <type>', 'Name for add action')
  .option('-e, --email <type>', 'Email for add action')
  .option('-p, --phone <type>', 'Phone for add action')
  .parse(process.argv);

const options = program.opts();

invokeAction(options);
