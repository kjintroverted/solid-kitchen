import { FOAF } from "@inrupt/vocab-common-rdf";
import { getAndParse, stringifyAndSet } from "../util/pods";

const mealplanStruct = {
  monday: {
    predicate: FOAF.mbox,
    parse: stringifyAndSet,
    set: getAndParse
  },
  tuesday: {
    predicate: FOAF.topic,
    parse: stringifyAndSet,
    set: getAndParse
  },
  wednesday: {
    predicate: FOAF.weblog,
    parse: stringifyAndSet,
    set: getAndParse
  },
  thursday: {
    predicate: FOAF.theme,
    parse: stringifyAndSet,
    set: getAndParse
  },
  friday: {
    predicate: FOAF.focus,
    parse: stringifyAndSet,
    set: getAndParse
  },
  saturday: {
    predicate: FOAF.status,
    parse: stringifyAndSet,
    set: getAndParse
  },
  sunday: {
    predicate: FOAF.surname,
    parse: stringifyAndSet,
    set: getAndParse
  }
}

export default mealplanStruct;