import React from 'react';
import { ButtonV2 } from 'react-api-preview';
import 'twin.macro';

function App(): JSX.Element {
    return (
        <div tw="h-screen bg-black text-white">
            Hello world
            <ButtonV2 />
        </div>
    );
}

export default App;
