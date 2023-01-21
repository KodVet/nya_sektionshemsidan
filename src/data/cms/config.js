const collections = import.meta.glob('./collections/*.js', {eager:true, import: 'default'})
import settings from './settings.json'
const config =
{
    ...settings,

    collections: Object.values(collections)
}
export default config