import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import { About } from './components/About';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Route path='/'>
        <Grid style={{ paddingTop: 10 }}>
          <Grid.Row>
            <Container text={true}>
              <p>
                <b> Gizzy Generation </b>
                {/* <p> Make the kitty of your dreams live </p> */}
                <p />
                {/* Kittens and ETH appreciated <span> @ </span>
                <Input value={'0x02Ee97a13e434717e3FFa12758a235D1a1680775'} /> */}
              </p>
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Route path='/' component={About} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Route>
    </div>
  );
}

export default App;
