import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles'

// https://poolors.com/379968-f0f0ef-c7a487-5b5348
export const THEME = {
  light: '#f0f0ef',
  dark: '#5b5348',
  primary: '#379968',
  secondary: '#c7a487'
}

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: THEME.primary,
    },
    secondary: {
      main: THEME.secondary,
    }
  }
})

export const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${ props => props.justify };
  align-items: ${ props => props.align };
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${ props => props.justify };
  align-items: ${ props => props.align };
  & * {
    margin: 0px 5px;
  }
  & .flex-50 {
    flex: .5;
  }
  & .flex-100 {
    flex: 1;
  }
  & .flex-200 {
    flex: 2;
  }
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
  margin-bottom: .5em;
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
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Card = styled.div`
  width: 90%;
  min-height: 100px;
  background-color: white;
  box-shadow: rgb(91 83 72 / 10%) 2px 2px 10px;
  border-radius: 3px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top: .5em;
`