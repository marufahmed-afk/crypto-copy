import * as React from 'react';

import { Button, Container, Grid } from 'semantic-ui-react';

import {
  BodyType,
  Cryptokitty,
  EyeType,
  ExpressionType,
  MouthType,
  PatternType,
} from './Cryptokitty';

import * as c from '../cattributes/colors';
import { randomEnumValue, randomKey } from '../utils';

import * as _ from 'lodash';

export const About = () => {
  // tslint:disable-next-line:member-ordering

  const [state, setState] = React.useState({
    body: randomEnumValue(BodyType),
    eye: randomEnumValue(EyeType),
    eyeColor: randomKey(c.EyeColor),
    mouth: randomEnumValue(MouthType),
    pattern: randomEnumValue(PatternType),
    expression: randomEnumValue(ExpressionType),
    primary: randomKey(c.Primary),
    secondary: randomKey(c.Secondary),
    tertiary: randomKey(c.Tertiary),
  });

  const onFieldChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const randomKitty = () => {
    setState({
      body: randomEnumValue(BodyType),
      eye: randomEnumValue(EyeType),
      eyeColor: randomKey(c.EyeColor),
      mouth: randomEnumValue(MouthType),
      pattern: randomEnumValue(PatternType),
      expression: randomEnumValue(ExpressionType),
      primary: randomKey(c.Primary),
      secondary: randomKey(c.Secondary),
      tertiary: randomKey(c.Tertiary),
    });
  };

  // for (let index = 0; index < 5; index++) {
  //   randomKitty();
  // }

  const {
    body,
    pattern,
    eye,
    mouth,
    expression,
    primary,
    secondary,
    tertiary,
    eyeColor,
  } = state;

  return (
    <Container style={{ maxWidth: 1200, padding: 20 }}>
      <Grid>
        <Grid.Row style={{ height: 300 }}>
          <Grid.Column width={4}>
            <Cryptokitty
              key={2}
              body={body}
              mouth={mouth}
              expression={expression}
              eye={eye}
              pattern={pattern}
              colors={[
                c.Primary[primary],
                c.Secondary[secondary],
                c.Tertiary[tertiary],
                c.EyeColor[eyeColor],
              ]}
            />
          </Grid.Column>
        </Grid.Row>

        {/* <Grid.Row>
          <Button onClick={randomKitty}> Random gizzy </Button>
        </Grid.Row>

        <Grid.Row>
          <div className='ui form'>
            <div className='fields'>
              <label>Body</label>
              {_.map(Object.keys(BodyType), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      value={k}
                      onClick={onFieldChange}
                      type='radio'
                      name='body'
                      checked={body === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div>

            <div className='fields'>
              <label>Pattern</label>
              {_.map(Object.keys(PatternType), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      value={k}
                      onClick={onFieldChange}
                      type='radio'
                      name='pattern'
                      checked={pattern === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div>

            <div className='fields'>
              <label>Eyes</label>
              {_.map(Object.keys(EyeType), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      value={k}
                      onClick={onFieldChange}
                      type='radio'
                      name='eye'
                      checked={eye === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div>
            <div className='fields'>
              <label>Mouth</label>
              {_.map(Object.keys(MouthType), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      value={k}
                      onClick={onFieldChange}
                      type='radio'
                      name='mouth'
                      checked={mouth === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div>
            <div className='fields'>
              <label>Expression</label>
              {_.map(Object.keys(ExpressionType), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      value={k}
                      onClick={onFieldChange}
                      type='radio'
                      name='expression'
                      checked={expression === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div>
            <div className='fields'>
              <label>Primary Color</label>
              {_.map(Object.keys(c.Primary), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      onClick={onFieldChange}
                      value={k}
                      type='radio'
                      name='primary'
                      checked={primary === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div>
            <div className='fields'>
              <label>Secondary</label>
              {_.map(Object.keys(c.Secondary), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      value={k}
                      onClick={onFieldChange}
                      type='radio'
                      name='secondary'
                      checked={secondary === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div> */}
        {/*
            <div className='fields'>
              <label>Tertiary</label>
              {_.map(Object.keys(c.Tertiary), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      value={k}
                      onClick={onFieldChange}
                      type='radio'
                      name='tertiary'
                      checked={tertiary === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div>
            <div className='fields'>
              <label>Eye</label>
              {_.map(Object.keys(c.EyeColor), (k) => (
                <div className='field' key={k}>
                  <div className='ui radio checkbox'>
                    <input
                      value={k}
                      onClick={onFieldChange}
                      type='radio'
                      name='eyeColor'
                      checked={eyeColor === k}
                    />
                    <label>{k}</label>
                  </div>
                </div>
              ))}
            </div> */}
        {/* </div>
        </Grid.Row> */}
      </Grid>
    </Container>
  );
};
