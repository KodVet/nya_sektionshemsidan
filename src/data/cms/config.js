const collections = Object.values(import.meta.glob('./collections/*.js', {eager:true, import: 'default'}))
collections.push(collections.splice(collections.indexOf(collections.find(collection => collection.name === 'settings')), 1)[0])
import settings from './settings.json'
const config =
{
    ...settings,

    collections: collections
}
export default config