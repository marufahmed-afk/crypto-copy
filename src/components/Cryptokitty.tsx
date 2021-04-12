import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import * as c from '../cattributes/colors';
import { isNonNull, randomEnumValue } from '../utils';
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
  // constructor(props) {
  // 	super(props);
  // 	this.state = {};
  // 	const body = props.body;
  // 	const pattern = props.pattern;
  // 	const mouth = props.mouth;
  // 	const eye = props.eye;

  // 	const colors = props.colors;
  // 	this.detectKittyColors = this.detectKittyColors.bind(this);
  // 	this.render = this.render.bind(this);
  // }

  const [
    cryptoKittyState,
    setCryptoKittyState,
  ] = React.useState<ICryptokittyState>({
    kittyImage: '',
    kittyMouth: '',
    kittyEye: '',
    genes: '',
  });

  const { kittyImage, kittyMouth, kittyEye, genes } = cryptoKittyState;

  React.useEffect(() => {
    console.log('hello use effect');
    const fetchGenes = async () => {
      const genes = await Genes();
      console.log(genes, 'GENES');
      setCryptoKittyState({ ...cryptoKittyState, genes: genes });
    };

    fetchGenes();
  }, []);

  //   const detectKittyColors = (svgText: string) => {
  //     const colors = [null, null, null, null];
  //     for (const color in c.Primary) {
  //       if (svgText.indexOf(c.Primary[color]) > -1) {
  //         colors[0] = color;
  //       }
  //     }
  //     for (const color in c.Secondary) {
  //       if (svgText.indexOf(c.Secondary[color]) > -1) {
  //         colors[1] = color;
  //       }
  //     }
  //     for (const color in c.Tertiary) {
  //       if (svgText.indexOf(c.Tertiary[color]) > -1) {
  //         colors[2] = color;
  //       }
  //     }

  //     for (const color in c.EyeColor) {
  //       if (svgText.indexOf(c.EyeColor[color]) > -1) {
  //         colors[3] = color;
  //       }
  //     }

  //     return colors;
  //   };

  if (genes === undefined) {
    return <img src={'src/cattributes/nullcat.svg'} />;
  }

  let kittyImage1 = genes[`${body}-${pattern}`];
  let kittyMouth1 = genes[`${mouth}`];
  let kittyEye1 = genes[`${eye}`];

  console.log('kitty images', kittyImage1, kittyMouth1);

  //   const bodyColors = detectKittyColors(kittyImage);
  //   const eyeColors = detectKittyColors(kittyEye);
  //   const mouthColors = detectKittyColors(kittyMouth);

  //   if (isNonNull(bodyColors[0])) {
  //     kittyImage1 = kittyImage1.replace(
  //       new RegExp(c.Primary[bodyColors[0]], 'g'),
  //       colors[0]
  //     );
  //     // setCryptoKittyState({...cryptoKittyState,kittyImage:kittyImage1});
  //   }

  //   if (isNonNull(bodyColors[1])) {
  //     kittyImage1 = kittyImage1.replace(
  //       new RegExp(c.Secondary[bodyColors[1]], 'g'),
  //       colors[1]
  //     );
  //     // setCryptoKittyState({...cryptoKittyState,kittyImage:kittyImage1});
  //   }

  //   if (isNonNull(eyeColors[3])) {
  //     kittyEye1 = kittyEye1.replace(
  //       new RegExp(c.EyeColor[eyeColors[3]], 'g'),
  //       colors[3]
  //     );
  //     // setCryptoKittyState({...cryptoKittyState,kittyEye:kittyEye1});
  //   }

  //   if (isNonNull(bodyColors[2])) {
  //     kittyImage1 = kittyImage1.replace(
  //       new RegExp(c.Tertiary[bodyColors[2]], 'g'),
  //       colors[2]
  //     );
  //     // setCryptoKittyState({...cryptoKittyState,kittyImage:kittyImage1});
  //   }

  //   if (isNonNull(mouthColors[0])) {
  //     kittyMouth1 = kittyMouth1.replace(
  //       new RegExp(c.Primary[mouthColors[0]], 'g'),
  //       colors[0]
  //     );
  //     // setCryptoKittyState({...cryptoKittyState,kittyMouth:kittyMouth1});
  //   }
  // tslint:disable:jsx-no-multiline-js

  return (
    <Container style={{ position: 'relative' }}>
      {kittyImage1 === null || kittyMouth1 === null || kittyEye1 === null ? (
        <div style={{ position: 'absolute' }}>
          <img src={'src/cattributes/nullcat.svg'} />
        </div>
      ) : (
        <div style={{ position: 'absolute' }}>
          <div dangerouslySetInnerHTML={{ __html: kittyImage1 }} />
          <div dangerouslySetInnerHTML={{ __html: kittyMouth1 }} />
          <div dangerouslySetInnerHTML={{ __html: kittyEye1 }} />
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
