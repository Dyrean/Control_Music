import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Ubuntu Mono', monospace;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    #main {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    #app {
        width: 100%;
        height: 100%;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    a {
        text-decoration: none;
    }
    
    * {
        box-sizing: border-box;
    }
`;
