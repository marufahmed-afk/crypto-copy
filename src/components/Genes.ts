// tslint:disable:forin
import {
  BodyType,
  EyeType,
  MouthType,
  ExpressionType,
  PatternType,
  NoseType,
  DropshadowType,
} from './GizzyBot';

let map: any = null;
let initialized = false;

export const Genes = async () => {
  if (initialized === true) {
    return map;
  }
  map = {};

  var t0 = performance.now();

  for (const b in BodyType) {
    for (const p in PatternType) {
      const svg = await fetch(`/assets/gizzyAttributes/body/${b}-${p}.svg`);

      map[`${b}-${p}`] = await svg.text();
    }
  }

  for (const et in EyeType) {
    const svg = await fetch(`/assets/gizzyAttributes/eye/${et}.svg`);
    map[`${et}`] = await svg.text();

    console.log(svg, 'svgg');
  }

  for (const mt in MouthType) {
    const svg = await fetch(`/assets/gizzyAttributes/mouth/${mt}.svg`);
    map[`${mt}`] = await svg.text();
  }

  for (const nt in NoseType) {
    const svg = await fetch(`/assets/gizzyAttributes/nose/${nt}.svg`);
    map[`${nt}`] = await svg.text();
  }

  for (const ext in ExpressionType) {
    const svg = await fetch(`/assets/gizzyAttributes/expression/${ext}.svg`);
    map[`${ext}`] = await svg.text();
  }

  for (const ds in DropshadowType) {
    const svg = await fetch(`/assets/gizzyAttributes/dropshadow/${ds}.svg`);
    map[`${ds}`] = await svg.text();
  }

  var t1 = performance.now();

  console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');

  initialized = true;
  return map;
};
