export default function(props: any, path: string[], fallback: any) {
  let currentLeg = props;

  for (let leg of path) {
    if (currentLeg === undefined || currentLeg === null || currentLeg[leg] === undefined) {
      return fallback;
    }

    currentLeg = currentLeg[leg];
  }

  return currentLeg;
}
