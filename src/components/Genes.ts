// tslint:disable:forin
import {
  BodyType,
  EyeType,
  MouthType,
  ExpressionType,
  PatternType,
} from './Cryptokitty';

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
      const svg = await fetch(`/assets/cattributes/body/${b}-${p}.svg`);

      map[`${b}-${p}`] = await svg.text();
    }
  }

  for (const et in EyeType) {
    const svg = await fetch(`/assets/cattributes/eye/${et}.svg`);
    map[`${et}`] = await svg.text();

    console.log(svg, 'svgg');
  }

  for (const mt in MouthType) {
    const svg = await fetch(`/assets/cattributes/mouth/${mt}.svg`);
    map[`${mt}`] = await svg.text();
  }

  for (const ext in ExpressionType) {
    const svg = await fetch(`/assets/cattributes/expression/${ext}.svg`);
    map[`${ext}`] = await svg.text();
  }

  var t1 = performance.now();

  console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');

  initialized = true;
  return map;
};
