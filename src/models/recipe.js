import { getStringNoLocale, setStringNoLocale } from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { getAndParse, stringifyAndSet } from "../util/pods";

export const recipeStruct = {
  name: { // STRING
    predicate: FOAF.name,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
  tags: { // STRING LIST
    predicate: FOAF.focus,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
  steps: { // STRING LIST
    predicate: FOAF.plan,
    parse: getAndParse(getStringNoLocale),
    set: stringifyAndSet(setStringNoLocale)
  },
  ingredients: { // THING
    predicate: FOAF.maker,
    parse: getAndParse(getStringNoLocale),
    set: stringifyAndSet(setStringNoLocale)
  }
}