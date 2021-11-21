import { FOAF } from "@inrupt/vocab-common-rdf";
import { getAndParse, stringifyAndSet } from "solid-core";

const mealplanStruct = {
  mon: {
    predicate: FOAF.mbox,
    parse: getAndParse,
    set: stringifyAndSet
  },
  tue: {
    predicate: FOAF.topic,
    parse: getAndParse,
    set: stringifyAndSet
  },
  wed: {
    predicate: FOAF.weblog,
    parse: getAndParse,
    set: stringifyAndSet
  },
  thu: {
    predicate: FOAF.theme,
    parse: getAndParse,
    set: stringifyAndSet
  },
  fri: {
    predicate: FOAF.focus,
    parse: getAndParse,
    set: stringifyAndSet
  },
  sat: {
    predicate: FOAF.status,
    parse: getAndParse,
    set: stringifyAndSet
  },
  sun: {
    predicate: FOAF.surname,
    parse: getAndParse,
    set: stringifyAndSet
  }
}

export default mealplanStruct;