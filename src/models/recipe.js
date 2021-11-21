import { getStringNoLocale, setStringNoLocale } from "@inrupt/solid-client";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { getAndParse, stringifyAndSet } from "solid-core";

export const recipeStruct = {
  name: { // STRING
    predicate: FOAF.name,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
  tags: { // STRING LIST
    predicate: FOAF.focus,
    parse: getAndParse,
    set: stringifyAndSet
  },
  steps: { // STRING LIST
    predicate: FOAF.plan,
    parse: getAndParse,
    set: stringifyAndSet
  },
  ingredients: { // THING
    predicate: FOAF.maker,
    parse: getAndParse,
    set: stringifyAndSet
  }
}