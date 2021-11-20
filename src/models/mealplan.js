import { FOAF } from "@inrupt/vocab-common-rdf";
import { getAndParse, stringifyAndSet } from "../util/pods";

const mealplanStruct = {
  mon: {
    predicate: FOAF.mbox,
    parse: stringifyAndSet,
    set: getAndParse
  },
  tue: {
    predicate: FOAF.topic,
    parse: stringifyAndSet,
    set: getAndParse
  },
  wed: {
    predicate: FOAF.weblog,
    parse: stringifyAndSet,
    set: getAndParse
  },
  thu: {
    predicate: FOAF.theme,
    parse: stringifyAndSet,
    set: getAndParse
  },
  fri: {
    predicate: FOAF.focus,
    parse: stringifyAndSet,
    set: getAndParse
  },
  sat: {
    predicate: FOAF.status,
    parse: stringifyAndSet,
    set: getAndParse
  },
  sun: {
    predicate: FOAF.surname,
    parse: stringifyAndSet,
    set: getAndParse
  }
}

export default mealplanStruct;