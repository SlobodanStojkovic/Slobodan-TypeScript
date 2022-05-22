/* ========================================== */
//type Predicate is a function that verifies if a specific argument it recieves is going to be of a more specific type or not. Example vvv
/* 
type Alien = {
  fly: () => {};
};

type Human = {
  speak: () => {};
};

function isHuman(entity: Human | Alien): entity is Human {
  return (entity as Human).speak !== undefined;
}
 */
/* ========================================== */
/* INTERSECTION TYPE 
type Human = {
  name: string;
}

type Alien = {
  fly: () = > void
}

type Hybrid = Human & Alien;  //& is intersection KEYWORD

const Josh: Hybrid = {
  name: "Josh",
  fly: () => {}
}
*/
/* ========================================== */
/* RETURN TYPE
type MyFunc = () => string

type MyReturn = ReturnType<MyFunc>  it will reach to MyFunc, get the RETURN and set it to this type
*/

/* ========================================== */

/* 
//function overloading - provides us ability to make multiple function type definitions of the same name to have multiple type definitions for create action, and it allows this function to recieve different parametar types, depending on parametar types it recieves
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return {
    type,
    payload,
  };
}
*/
