const Errors = require('./Errors');
const global = require('../globalFunctions');

/**
 * Domain object for a difficult moment for a client.
 * This domain object is validated with regex.
 *
 * Both description and lust are required.
 */
class Difficult_Moment {
    constructor(description, prevention, lust){
        if(!(
            description && /^(.|\s){0,280}$/.test(description) &&
            prevention && /^(.|\s){0,280}$/.test(prevention) &&
            lust && /^[0-6]{0,2}$/.test(lust)
        )) {
            return Errors.badRequest();
        }

        this._prevention = global.checkEmoji(prevention);
        this._description = global.checkEmoji(description);
        this._lust = lust;
    }
}

module.exports = Difficult_Moment;