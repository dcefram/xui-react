export default function(props: any, list: string[]) {
  let result: any = props instanceof Array ? [] : {};

  for (let key in props) {
    if (list.indexOf(key) === -1) {
      result[key] = props[key];
    }
  }

  return result;
}
