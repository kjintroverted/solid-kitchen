import { getStringNoLocale, setStringNoLocale } from "@inrupt/solid-client";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";

export default {
  firstName: {
    predicate: FOAF.firstName,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
  lastName: {
    predicate: FOAF.lastName,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
  nickname: {
    predicate: FOAF.nick,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
  email: {
    predicate: VCARD.email,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
  pic: {
    predicate: VCARD.photo,
    parse: getStringNoLocale,
    set: setStringNoLocale
  }
}