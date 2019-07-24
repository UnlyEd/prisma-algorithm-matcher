/**
 * Basic interface to use dynamic objects, like : user["name"] = "Toto"
 */
export default interface IFilter {
  [key: string]: any
}
