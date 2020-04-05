import {Box, Text} from "grommet";
import React from "react";

const diagramBorder = {
  color: 'rgba(0,0,0,0.2)',
  width: '2px'
}

const DiagramItem = ({active, id, children}) => (
  <Box direction="row" gap="large" justify="center" width="9rem" id={id} border={diagramBorder}
       background={active ? 'neutral-1' : 'light-3'}
       pad="small" round="2px">
    <Text weight="bold">{children}</Text>
  </Box>
);

export default DiagramItem
