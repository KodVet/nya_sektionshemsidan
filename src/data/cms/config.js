let collections = Object.values(import.meta.glob(['./collections/*.json'], {eager: true, import: 'default'}))
import metaSettings from './collections/metaCollections/settings'
import metaCollections from './collections/metaCollections/Collections'
// collections.push(metaSettings)
import settings from './settings.json'
// console.log(settings)
for (const collection of collections) {
    if (collection.type === "Folder") {
        delete collection.files
    }
}

const config = {
    ...settings,
    collections: [
        ...collections,
        metaSettings,
        // metaFileCollections,
        // metaFolderCollections,
        metaCollections
    ]
}
export default config