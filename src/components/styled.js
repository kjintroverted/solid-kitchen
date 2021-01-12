import styled from 'styled-components';

// https://poolors.com/c11886-77f6f2-f6c9ee-4a6073
export const THEME = {
  light: '#f6c9ee',
  dark: '#4a6073',
  primary: '#77f6f2',
  secondary: '#c11886'
}

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
  background: ${ THEME.secondary };
  color: ${ THEME.primary };
  & * {
    margin: 0em .5em;
  }
`