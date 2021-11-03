import { addStringNoLocale, addUrl, getStringNoLocale, getStringNoLocaleAll, getUrlAll, setStringNoLocale } from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { ingredientStruct } from "./ingredient";

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
    parse: getStringNoLocaleAll,
    set: addStringNoLocale
  },
  ingredientRefs: { // THING
    predicate: FOAF.maker,
    struct: ingredientStruct,
    parse: getUrlAll,
    set: addUrl
  }
}