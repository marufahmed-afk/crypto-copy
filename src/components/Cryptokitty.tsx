import * as React from 'react';
import { Container } from 'semantic-ui-react';
import * as c from '../cattributes/colors';
import { isNonNull } from '../utils';
import { Genes } from './Genes';

export enum BodyType {
  mainecoon = 'mainecoon',
  cymric = 'cymric',
  laperm = 'laperm',
  munchkin = 'munchkin',
  sphynx = 'sphynx',
  ragamuffin = 'ragamuffin',
  himalayan = 'himalayan',
  chartreux = 'chartreux',
}

export enum PatternType {
  spock = 'spock',
  tigerpunk = 'tigerpunk',
  calicool = 'calicool',
  luckystripe = 'luckystripe',
  jaguar = 'jaguar',
  totesbasic = 'totesbasic',
}

export enum MouthType {
  whixtensions = 'whixtensions',
  dali = 'dali',
  saycheese = 'saycheese',
  beard = 'beard',
  tongue = 'tongue',
  happygokitty = 'happygokitty',
  pouty = 'pouty',
  soserious = 'soserious',
  gerbil = 'gerbil',
  poutmouth='poutmouth'
}

export enum EyeType {
  wingtips = 'wingtips',
  fabulous = 'fabulous',
  otaku = 'otaku',
  raisedbrow = 'raisedbrow',
  simple = 'simple',
  crazy = 'crazy',
  thicccbrowz = 'thicccbrowz',
  googly = 'googly',
}

interface ICryptokittyState {
  kittyImage?: string;
  kittyMouth?: string;
  kittyEye?: string;
  genes?: string;
}

interface ICryptokittyFeatures {
  colors?: string[];
  body?: BodyType;
  pattern?: PatternType;
  mouth?: MouthType;
  eye?: EyeType;
  isSpecial?: boolean;
}

export const Cryptokitty: React.FC<ICryptokittyFeatures> = ({
  body,
  mouth,
  eye,
  pattern,
  colors,
}) => {

  const [
    cryptoKittyState,
    setCryptoKittyState,
  ] = React.useState<ICryptokittyState>({
    kittyImage: '',
    kittyMouth: '',
    kittyEye: '',
    genes: '',
  });

  const { genes } = cryptoKittyState;

  React.useEffect(() => {
    const fetchGenes = async () => {
      const genes = await Genes();

      setCryptoKittyState({ ...cryptoKittyState, genes: genes });
    };

    fetchGenes();
    // eslint-disable-next-line
  }, []);

  const detectKittyColors = (svgText: string) => {
    //console.log(svgText);
    const colors: any = [null, null, null, null];
    for (const color in c.Primary) {
      if (svgText?.indexOf(c.Primary[color]) > -1) {
        colors[0] = color;
      }
    }
    for (const color in c.Secondary) {
      if (svgText?.indexOf(c.Secondary[color]) > -1) {
        colors[1] = color;
      }
    }
    for (const color in c.Tertiary) {
      if (svgText?.indexOf(c.Tertiary[color]) > -1) {
        colors[2] = color;
      }
    }

    for (const color in c.EyeColor) {
      if (svgText?.indexOf(c.EyeColor[color]) > -1) {
        colors[3] = color;
      }
    }

    return colors;
  };

  if (genes === undefined) {
    return <img src={'src/cattributes/nullcat.svg'} alt='null cat' />;
  }

  let kittyImage1 = genes[`${body}-${pattern}`];
  let kittyMouth1 = genes[`${mouth}`];
  let kittyEye1 = genes[`${eye}`];

  const bodyColors = detectKittyColors(kittyImage1);
  console.log(bodyColors, 'bodycolors');
  const eyeColors = detectKittyColors(kittyEye1);
  console.log(eyeColors, 'eyecolors');
  const mouthColors = detectKittyColors(kittyMouth1);
  console.log(mouthColors, 'mouthcolors');

  if (isNonNull(bodyColors[0])) {
    kittyImage1 = kittyImage1.replace(
      new RegExp(c.Primary[bodyColors[0]], 'g'),
      colors && colors[0]
    );
  }

  if (isNonNull(bodyColors[1])) {
    kittyImage1 = kittyImage1.replace(
      new RegExp(c.Secondary[bodyColors[1]], 'g'),
      colors && colors[1]
    );
  }

  if (isNonNull(eyeColors[3])) {
    kittyEye1 = kittyEye1.replace(
      new RegExp(c.EyeColor[eyeColors[3]], 'g'),
      colors && colors[3]
    );
  }

  if (isNonNull(bodyColors[2])) {
    kittyImage1 = kittyImage1.replace(
      new RegExp(c.Tertiary[bodyColors[2]], 'g'),
      colors && colors[2]
    );
  }

  if (isNonNull(mouthColors[0])) {
    kittyMouth1 = kittyMouth1.replace(
      new RegExp(c.Primary[mouthColors[0]], 'g'),
      colors && colors[0]
    );
  }

  return (
    <Container style={{ position: 'relative' }}>
      {kittyImage1 === null || kittyMouth1 === null || kittyEye1 === null ? (
        <div style={{ position: 'absolute' }}>
          <img src={'src/cattributes/nullcat.svg'} alt='null cat' />
        </div>
      ) : (
        <div style={{ position: 'absolute' }}>
          <div
            className='pos-absolute'
            dangerouslySetInnerHTML={{ __html: kittyImage1 }}
          />
          <div
            className='pos-absolute'
            dangerouslySetInnerHTML={{ __html: kittyMouth1 }}
          />
          <div
            className='pos-absolute'
            dangerouslySetInnerHTML={{ __html: kittyEye1 }}
          />
        </div>
      )}
    </Container>
  );
};

// const styles: React.CSSProperties = {
//   fixed: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '300px',
//     width: '300px',
//   },
// };
