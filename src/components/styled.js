import styled from 'styled-components';

// https://poolors.com/057b89-c6e7f8-f36e99-1f0f06
export const THEME = {
  light: '#c6e7f8',
  dark: '#1f0f06',
  primary: '#057b89',
  secondary: '#f36e99'
}

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Spacer = styled.span`
  flex: 1;
`

export const Back = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: ${ THEME.light };
  color: ${ THEME.dark };
`

export const HeaderBar = styled.div`
  position: relative;
  width: 100%;
  height: 5em;
  display: flex;
  align-items: center;
  background: ${ THEME.primary };
  color: ${ THEME.light };
  & * {
    margin: 0em .5em;
  }
`

export const BigBar = styled.div`
  position: relative;
  width: 100%;
  height: 12em;
  display: flex;
  align-items: center;
  background: ${ THEME.primary };
  color: ${ THEME.light };
  & * {
    margin: 0em .5em;
  }
  & input {
    color: ${ THEME.light };
    font-size: larger;
  }
  & .material-icons {
    cursor: pointer;
  }
`

export const BigIconHeader = styled.span`
  font-size: 10em;
  margin: inherit;
`

export const Pane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`