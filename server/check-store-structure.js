import { getStore } from './database.js';

async function checkStoreData() {
    console.log('=== Checking Store Data Structure ===');

    const storeData = await getStore('demo');
    console.log('\nFull store data keys:', Object.keys(storeData));

    console.log('\n--- editor-pages-storage ---');
    let pagesStorage = storeData['editor-pages-storage'];
    if (pagesStorage) {
        console.log('Type:', typeof pagesStorage);

        // If it's a string, parse it
        if (typeof pagesStorage === 'string') {
            console.log('Is string, parsing...');
            pagesStorage = JSON.parse(pagesStorage);
        }

        console.log('Keys after parse:', Object.keys(pagesStorage));
        console.log('Has state?:', !!pagesStorage.state);
        if (pagesStorage.state) {
            console.log('State keys:', Object.keys(pagesStorage.state));
            console.log('Pages count:', pagesStorage.state.pages?.length || 0);
            if (pagesStorage.state.pages?.length > 0) {
                console.log('First page ID:', pagesStorage.state.pages[0].id);
            }
        }
    } else {
        console.log('❌ Not found');
    }

    console.log('\n--- editor-store-settings-storage ---');
    let settingsStorage = storeData['editor-store-settings-storage'];
    if (settingsStorage) {
        console.log('Type:', typeof settingsStorage);

        // If it's a string, parse it
        if (typeof settingsStorage === 'string') {
            console.log('Is string, parsing...');
            settingsStorage = JSON.parse(settingsStorage);
        }

        console.log('Keys after parse:', Object.keys(settingsStorage));
        console.log('Has state?:', !!settingsStorage.state);
        if (settingsStorage.state) {
            console.log('State keys:', Object.keys(settingsStorage.state));
        }
    } else {
        console.log('❌ Not found');
    }

    console.log('\n=== END ===');
    process.exit(0);
}

checkStoreData();
