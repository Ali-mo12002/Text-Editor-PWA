import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 2, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('content updated');
  const jateDb = await openDB('jate', 2);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({content, id: 2});
  const result = await request;
  
  if (!result) {
    console.error('putDb not implemented')
  } else {
    console.log('Data saved to the database', result);
  }
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log(' content fetched');
  

  const jateDb = await openDB('jate', 2);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(2);
  const result = await request;
 
  if (!result) {
    console.error('getDb not implemented');
  } else {
    console.log('result.value', result);
    return result.content;
  }
}
initdb();