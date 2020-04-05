import {Box, Button, Form, FormField, Text, TextInput} from "grommet";
import React from "react";
import Row from '../../utils/Row';

export default ({value, errors, setValue, hasErrors, onSubmit}) => {
  return (<Form value={value}
                onChange={setValue}
                errors={errors}
                onSubmit={({value}) => {
                  onSubmit(value);
                }}
  >
    <Row>
      <Text basis="1/2" weight="bold">User Name</Text>
      <Box basis="1/2">
        <FormField name="username" label="User Name">
        </FormField>
      </Box>
    </Row>
    <Row>
      <Text basis="1/2" weight="bold">E-mail</Text>
      <Box basis="1/2">
        <FormField name="email" type="email" label="Email Address"/>
      </Box>
    </Row>
    <Row>
      <Box basis="1/2">

      </Box>
      <Box basis="1/2" direction="row" justify="center">
        <Button type="submit" fill={false} primary={true} plain={false}>Submit</Button>
      </Box>
    </Row>
  </Form>);
};
