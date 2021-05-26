import * as React from 'react';
import { Container } from 'semantic-ui-react';
import * as c from '../attributes/colors';
import { isNonNull } from '../utils';
import { Genes } from './Genes';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
} from 'react-html-parser';

export enum BodyType {
  body01 = 'body01',
  body02 = 'body02',
  body03 = 'body03',
  body04 = 'body04',
}

export enum PatternType {
  default = 'default',
}

export enum MouthType {
  mouth01 = 'mouth01',
  mouth02 = 'mouth02',
  mouth03 = 'mouth03',
  mouth04 = 'mouth04',
}

export enum ExpressionType {
  expression01 = 'expression01',
  expression02 = 'expression02',
  expression03 = 'expression03',
  expression04 = 'expression04',
}

export enum EyeType {
  eyes01 = 'eyes01',
  eyes02 = 'eyes02',
  eyes03 = 'eyes03',
  eyes04 = 'eyes04',
}

export enum NoseType {
  nose01 = 'nose01',
  nose02 = 'nose02',
  nose03 = 'nose03',
  nose04 = 'nose04',
}

export enum DropshadowType {
  dropshadow01 = 'dropshadow01',
}

interface IGizzybotFeatures {
  gizzyBody?: string;
  gizzyMouth?: string;
  gizzyNose?: string;
  gizzyDropshadow?: string;
  gizzyExpression?: string;
  gizzyEye?: string;
  genes?: string;
}

interface IGizzybotFeatures {
  colors?: string[];
  body?: BodyType;
  pattern?: PatternType;
  expression?: ExpressionType;
  mouth?: MouthType;
  nose?: NoseType;
  dropshadow?: DropshadowType;
  eye?: EyeType;
  isSpecial?: boolean;
}

export const GizzyBot: React.FC<IGizzybotFeatures> = ({
  body,
  mouth,
  nose,
  dropshadow,
  eye,
  pattern,
  expression,
  colors,
}) => {
  const [cryptogizzyState, setCryptogizzyState] =
    React.useState<IGizzybotFeatures>({
      gizzyBody: '',
      gizzyMouth: '',
      gizzyNose: '',
      gizzyDropshadow: '',
      gizzyExpression: '',
      gizzyEye: '',
      genes: '',
    });

  const { genes } = cryptogizzyState;

  const [svgState, setSvgState] = React.useState('');

  // const [gizzyArr, setGizzyArr] = React.useState(['dd']);

  React.useEffect(() => {
    const fetchGenes = async () => {
      const genes = await Genes();

      console.log(genes, 'GEnes');

      setCryptogizzyState({ ...cryptogizzyState, genes: genes });
    };

    fetchGenes();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log('GIzzy array');
  }, [svgState]);

  const getBody = (
    gizzyBody1: any,
    gizzyMouth1: any,
    gizzyNose1: any,
    gizzyDropshadow1: any,
    gizzyExpression1: any,
    gizzyEye1: any
  ) => {
    // console.log(gizzyBody1, gizzyMouth1, gizzyExpression1, gizzyEye1, 'TEST');

    const Mouth = gizzyMouth1
      .toString()
      .replace('<svg', '<g')
      .replace('/svg>', '/g>');

    const Eye = gizzyEye1
      .toString()
      .replace('<svg', '<g')
      .replace('/svg>', '/g>');

    const Nose = gizzyNose1
      .toString()
      .replace('<svg', '<g')
      .replace('/svg>', '/g>');

    const Expression = gizzyExpression1
      .toString()
      .replace('<svg', '<g')
      .replace('/svg>', '/g>');

    // const Dropshadow = gizzyDropshadow1
    //   .toString()
    //   .replace('<svg', '<g')
    //   .replace('/svg>', '/g>');

    const GizzyBody = gizzyBody1
      .toString()
      .replace('<svg', '<g')
      .replace('/svg>', '/g>');

    const result = gizzyDropshadow1
      .toString()
      .replace(
        '</svg>',
        GizzyBody + Eye + Mouth + Expression + Nose + '</svg>'
      );

    // setSvgState(result);

    return result;
  };

  const detectgizzyColors = (svgText: string) => {
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
    return (
      <img src={'/assets/gizzyAttributes/nullgizzy.svg'} alt='null gizzy' />
    );
  }

  let gizzyBody1 = genes[`${body}-${pattern}`];
  let gizzyMouth1 = genes[`${mouth}`];
  let gizzyNose1 = genes[`${nose}`];
  let gizzyDropshadow1 = genes[`${dropshadow}`];
  let gizzyExpression1 = genes[`${expression}`];
  let gizzyEye1 = genes[`${eye}`];

  const bodyColors = detectgizzyColors(gizzyBody1);
  console.log(bodyColors, 'bodycolors');
  const eyeColors = detectgizzyColors(gizzyEye1);
  console.log(eyeColors, 'eyecolors');
  const mouthColors = detectgizzyColors(gizzyMouth1);
  console.log(mouthColors, 'mouthcolors');

  if (isNonNull(bodyColors[0])) {
    console.log(
      new RegExp(c.Primary[bodyColors[0]], 'g'),
      'regex',
      c.Primary[bodyColors[0]]
    );
    gizzyBody1 = gizzyBody1.replace(
      new RegExp(c.Primary[bodyColors[0]], 'g'),
      colors && colors[0]
    );
  }

  if (isNonNull(bodyColors[1])) {
    gizzyBody1 = gizzyBody1.replace(
      new RegExp(c.Secondary[bodyColors[1]], 'g'),
      colors && colors[1]
    );
  }

  if (isNonNull(eyeColors[3])) {
    gizzyEye1 = gizzyEye1.replace(
      new RegExp(c.EyeColor[eyeColors[3]], 'g'),
      colors && colors[3]
    );
  }

  if (isNonNull(bodyColors[2])) {
    gizzyBody1 = gizzyBody1.replace(
      new RegExp(c.Tertiary[bodyColors[2]], 'g'),
      colors && colors[2]
    );
  }

  if (isNonNull(mouthColors[0])) {
    gizzyMouth1 = gizzyMouth1.replace(
      new RegExp(c.Primary[mouthColors[0]], 'g'),
      colors && colors[0]
    );
  }

  if (gizzyBody1) {
    const t0 = performance.now();
    getBody(
      gizzyBody1,
      gizzyMouth1,
      gizzyNose1,
      gizzyDropshadow1,
      gizzyExpression1,
      gizzyEye1
    );
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
  }

  return (
    <Container style={{ position: 'relative' }}>
      {gizzyBody1 === null || gizzyMouth1 === null || gizzyEye1 === null ? (
        <div style={{ position: 'absolute' }}>
          <img src={'/assets/gizzyAttributes/nullgizzy.svg'} alt='null gizzy' />
        </div>
      ) : (
        <>
          {/* <div style={{ position: 'absolute' }}>
            <div
              className='pos-absolute'
              dangerouslySetInnerHTML={{ __html: gizzyBody1 }}
            />
            <div
              className='pos-absolute'
              dangerouslySetInnerHTML={{ __html: gizzyMouth1 }}
            />
            <div
              className='pos-absolute'
              dangerouslySetInnerHTML={{ __html: gizzyExpression1 }}
            />
            <div
              className='pos-absolute'
              dangerouslySetInnerHTML={{ __html: gizzyEye1 }}
            />
          </div> */}

          <div
            dangerouslySetInnerHTML={{
              __html:
                gizzyBody1 &&
                getBody(
                  gizzyBody1,
                  gizzyMouth1,
                  gizzyNose1,
                  gizzyDropshadow1,
                  gizzyExpression1,
                  gizzyEye1
                ),
            }}
          ></div>
          {/* <div>
            {ReactHtmlParser(
              gizzyBody1 &&
                getBody(gizzyBody1, gizzyMouth1, gizzyExpression1, gizzyEye1)
            )}
          </div> */}
        </>
      )}
    </Container>
  );
};
