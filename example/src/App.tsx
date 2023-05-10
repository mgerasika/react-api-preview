import React from "react";

//!!!Warning wrong!!!
// import { Avatar, Button } from 'react-api-preview' - problem with tree-shaking - bundle over 1-2mbs

// !!!Right!!!
import { ButtonV2 } from "react-api-preview/dist/general-ui/button-v2/button-v2.component";

function App() {
  return (
    <div>
      <ButtonV2 name="hello" variant="primary">
        Primary
      </ButtonV2>
    </div>
  );
}

export default App;
