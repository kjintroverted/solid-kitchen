import { getStringNoLocale, setStringNoLocale } from "@inrupt/solid-client";
import { FOAF, VCARD, RDF } from "@inrupt/vocab-common-rdf";

export const ingredientStruct = {
  qty: { // STRING
    predicate: RDF.value,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
  item: { // STRING
    predicate: FOAF.name,
    parse: getStringNoLocale,
    set: setStringNoLocale
  },
}