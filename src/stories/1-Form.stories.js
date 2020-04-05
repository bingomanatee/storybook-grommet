import React, {useState, Component} from 'react';
import {action} from '@storybook/addon-actions';
import {Form, FormField, Box, Button, Heading, Diagram, Text, Grommet, Stack} from 'grommet';
import metro from './themes/metro.json';
import BasicForm from './forms/basic/BasicForm';
import _ from 'lodash';

const forGrommet = (story) => (
  <Grommet theme={metro}>
    {story()}
  </Grommet>
);

const Dialog = ({children}) => (
  <Box margin="large" pad="large" justify="center" align="center" elevation="large" background="rgb(255,255,204)">
    {children}
  </Box>
)

const diagramBorder = {
  color: 'rgba(0,0,0,0.2)',
  width: '2px'
}

export default {
  title: 'Grommet Form',
  decorators: [forGrommet]
};

class FormComponent extends Component {
  constructor(p) {
    super(p);
    this.state = {
      value: {username: 'default', email: ''},
      hasErrors: false,
      errors: {},
      phase: 'entering'
    };
    this.setValue = this.setValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /*

   shouldComponentUpdate(nextProps, nextState) {
      // note - this is only a compensation for something storybook related.
      return JSON.stringify(this.state.errors) !== JSON.stringify(nextState.errors);
    }
  */

  usernameErrors() {
    const {value} = this.state;
    const {username} = value;
    if (!username) {
      return 'required';
    }
    if (typeof username !== 'string') {
      return 'non-string';
    }

    if (!/^[\w_]+$/.test(username)) {
      return 'usernames can only be letters, numbers and underscore';
    }
    return false;
  }

  onSubmit(value) {
    this.setState({value, phase: 'processing'},
      () => {
        setTimeout(() => {
          this.setState({phase: 'complete'})
        }, 2000)
      }
    )
  }

  emailErrors() {
    const {value} = this.state;
    const {email} = value;
    if (!email) {
      return 'required';
    }
    if (typeof email !== 'string') {
      return 'non-string';
    }

    if (!/^[\w_]+@[\w]+\.[\w]+$/.test(email)) {
      return 'not an email address';
    }
    return false;
  }

  componentDidMount() {
    this.validate();
  }

  validate() {
    const errors = {
      username: this.usernameErrors(),
      email: this.emailErrors()
    };
    const hasErrors = !_.every(Array.from(Object.values(errors)), (m) => !m);
    // note - this delayed execution is only a compensation for something storybook related.
    requestAnimationFrame(() => {
      this.setState({errors, hasErrors})
    });
  }

  setValue(value) {
    // for some quirky reason you can't replace the value of "value" or bad things happen
    this.setState({value: Object.assign(this.state.value, value)},
      () => {
        this.validate();
      })
  }

  render() {
    const {value, errors, hasErrors, phase} = this.state;
    return <>
      <Stack interactiveChild="first" guidingChild="first">
        <Box pad="large" >
          <BasicForm value={value} errors={errors} hasErrors={hasErrors} onSubmit={this.onSubmit} setValue={this.setValue}/>
        </Box>
        {phase === 'processing' ? <Dialog><Heading level="2" weight="bold">Processing</Heading>
          <Text>Please wait</Text>
        </Dialog> : ''}
      </Stack>
      <Stack>
        <Diagram
          connections={[
            {
              fromTarget: 'diagram-entering',
              toTarget: 'diagram-processing',
              thickness: '2px',
              color: 'accent-1',
            },
            {
              fromTarget: 'diagram-processing',
              toTarget: 'diagram-complete',
              thickness: '2px',
              color: 'accent-1',
              type: 'rectilinear',
            },
          ]}
        />
        <Box direction="row" gap="large" justify="center">
          <Box direction="row" gap="large" justify="center" width="9rem" id="diagram-entering" border={diagramBorder}
               background={phase === 'entering' ? 'neutral-1' : 'light-3'}
               pad="small" round="2px">
            <Text weight="bold">Entering</Text>
          </Box>
          <Box direction="row" gap="large" justify="center" width="9rem" id="diagram-processing" border={diagramBorder}
               background={phase === 'processing' ? 'neutral-1' : 'light-3'}
               pad="small" round="2px">
            <Text weight="bold">Processing</Text>
          </Box>
          <Box direction="row" gap="large" justify="center" width="9rem" id="diagram-complete" border={diagramBorder}
               background={phase === 'complete' ? 'neutral-1' : 'light-3'}
               pad="small" round="2px">
            <Text weight="bold">Complete</Text>
          </Box>
        </Box>
      </Stack>
    </>
  }
}

export const SampleForm = () => (<FormComponent/>);
