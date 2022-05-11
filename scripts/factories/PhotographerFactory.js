import { Photographer } from "../models/Photographer.js";

export class PhotographerFactory {
    constructor(data, type) {
        if (type === 'json') {
            return new Photographer(data)
        } else {
            throw 'Unknown type format'
        }
    }
}