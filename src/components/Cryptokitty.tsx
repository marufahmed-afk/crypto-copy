import * as React from 'react';
import { Container } from 'semantic-ui-react';
import * as c from '../cattributes/colors';
import { isNonNull } from '../utils';
import { Genes } from './Genes';

export enum BodyType {
  body = 'body',
}

export enum PatternType {
  default = 'default',
}

export enum MouthType {
  mouth = 'mouth',
}

export enum ExpressionType {
  expression = 'expression',
}

export enum EyeType {
  eyes = 'eyes',
}

interface ICryptokittyState {
  kittyImage?: string;
  kittyMouth?: string;
  kittyExpression?: string;
  kittyEye?: string;
  genes?: string;
}

interface ICryptokittyFeatures {
  colors?: string[];
  body?: BodyType;
  pattern?: PatternType;
  expression?: ExpressionType;
  mouth?: MouthType;
  eye?: EyeType;
  isSpecial?: boolean;
}

export const Cryptokitty: React.FC<ICryptokittyFeatures> = ({
  body,
  mouth,
  eye,
  pattern,
  expression,
  colors,
}) => {
  const [cryptoKittyState, setCryptoKittyState] =
    React.useState<ICryptokittyState>({
      kittyImage: '',
      kittyMouth: '',
      kittyExpression: '',
      kittyEye: '',
      genes: '',
    });

  const { genes } = cryptoKittyState;

  const [svgState, setSvgState] = React.useState('');

  const [gizzyArr, setGizzyArr] = React.useState(['dd']);

  React.useEffect(() => {
    const fetchGenes = async () => {
      const genes = await Genes();

      // console.log(genes, 'GEnes');

      setCryptoKittyState({ ...cryptoKittyState, genes: genes });
    };

    fetchGenes();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log('GIzzy array');
  }, [svgState]);

  // const getImage = async () => {
  //   const svgMouth = await fetch(`/assets/images/crazy.svg`);
  //   const svgBody = await fetch(`/assets/images/body.svg`);

  //   const svgMouth2 = await svgMouth.text();
  //   const svgBody2 = await svgBody.text();

  //   const Mouth = svgMouth2
  //     .toString()
  //     .replace('<svg', '<g')
  //     .replace('/svg>', '/g>');

  //   const result = svgBody2.toString().replace('</svg>', Mouth + '</svg>');

  //   return result;
  // };

  const getImage = (
    kittyImage1: any,
    kittyMouth1: any,
    kittyExpression1: any,
    kittyEye1: any
  ) => {
    // console.log(kittyImage1, kittyMouth1, kittyExpression1, kittyEye1, 'TEST');

    const Mouth = kittyMouth1
      .toString()
      .replace('<svg', '<g')
      .replace('/svg>', '/g>');

    const Expression = kittyExpression1
      .toString()
      .replace('<svg', '<g')
      .replace('/svg>', '/g>');

    const Eye = kittyEye1
      .toString()
      .replace('<svg', '<g')
      .replace('/svg>', '/g>');

    const result = kittyImage1
      .toString()
      .replace('</svg>', Mouth + Expression + Eye + '</svg>');

    // setSvgState(result);

    return result;
  };

  const detectKittyColors = (svgText: string) => {
    //console.log(svgText);
    const colors: any = [null, null, null, null];
    for (const color in c.Primary) {
      if (svgText?.indexOf(c.Primary[color]) > -1) {
        console.log('GOT IN');
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
    return <img src={'../cattributes/nullcat.svg'} alt='null cat' />;
  }

  let kittyImage1 = genes[`${body}-${pattern}`];
  let kittyMouth1 = genes[`${mouth}`];
  let kittyExpression1 = genes[`${expression}`];
  let kittyEye1 = genes[`${eye}`];

  const bodyColors = detectKittyColors(kittyImage1);
  console.log(bodyColors, 'bodycolors');
  const eyeColors = detectKittyColors(kittyEye1);
  console.log(eyeColors, 'eyecolors');
  const mouthColors = detectKittyColors(kittyMouth1);
  console.log(mouthColors, 'mouthcolors');

  if (isNonNull(bodyColors[0])) {
    console.log(
      new RegExp(c.Primary[bodyColors[0]], 'g'),
      'regex',
      c.Primary[bodyColors[0]]
    );
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

  if (kittyImage1) {
    const t0 = performance.now();
    getImage(kittyImage1, kittyMouth1, kittyExpression1, kittyEye1);
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
  }

  return (
    <Container style={{ position: 'relative' }}>
      {kittyImage1 === null || kittyMouth1 === null || kittyEye1 === null ? (
        <div style={{ position: 'absolute' }}>
          <img src={'../cattributes/nullcat.svg'} alt='null cat' />
        </div>
      ) : (
        <>
          {/* <div style={{ position: 'absolute' }}>
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
              dangerouslySetInnerHTML={{ __html: kittyExpression1 }}
            />
            <div
              className='pos-absolute'
              dangerouslySetInnerHTML={{ __html: kittyEye1 }}
            />
          </div> */}

          <div
            dangerouslySetInnerHTML={{
              __html:
                kittyImage1 &&
                getImage(kittyImage1, kittyMouth1, kittyExpression1, kittyEye1),
            }}
          ></div>
        </>
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
