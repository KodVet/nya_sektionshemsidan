
import config from './config.yml?raw'
export function get() {
    return {
        body: config
    }
}