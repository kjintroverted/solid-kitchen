import styled from 'styled-components';

// https://poolors.com/379968-f0f0ef-c7a487-5b5348
export const THEME = {
  light: '#f0f0ef',
  dark: '#5b5348',
  primary: '#379968',
  secondary: '#c7a487'
}

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${ props => props.justify };
  height: 100%;
`

export const Spacer = styled.span`
  flex: 1;
`

export const Main = styled.div`
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
  width: 25vw;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .self-end {
    align-self: flex-end;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`