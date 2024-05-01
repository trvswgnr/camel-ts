// Generated by Melange

import * as Caml_external_polyfill from "../melange.js/caml_external_polyfill.mjs";
import * as Stdlib__Obj from "./obj.mjs";

function register(name, v) {
  Caml_external_polyfill.resolve("caml_register_named_value")(name, v);
}

function register_exception(name, exn) {
  var slot = (exn.TAG | 0) === Stdlib__Obj.object_tag ? exn : exn[0];
  Caml_external_polyfill.resolve("caml_register_named_value")(name, slot);
}

export {
  register ,
  register_exception ,
}
/* No side effect */