import {Box} from "grommet";
import React from "react";

export default ({children}) => (
  <Box direction="row" pad="small" justify="between" fill="horizontal">
    {children}
  </Box>
)
