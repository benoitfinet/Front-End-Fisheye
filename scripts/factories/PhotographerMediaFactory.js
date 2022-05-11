import { PhotographerMedia } from "../models/PhotographerMedia.js";

export class PhotographerMediaFactory {
    constructor(data, type) {
        if (type === 'json') {
            return new PhotographerMedia(data)
        } else {
            throw 'Unknown type format'
        }
    }
}