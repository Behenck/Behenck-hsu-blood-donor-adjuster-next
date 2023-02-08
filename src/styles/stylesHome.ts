import styled from 'styled-components'

export const Main = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  
  background-color: #abd3d6;
`

export const Window = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 980px;
  border-radius: 1rem;
  background-color: #f3f4f6;

  div {
    img {
      object-fit: "cover";
      width: 100%;
      height: 100%;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
    }
  }

  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`

export const AdjusterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 3.5rem 4rem;
  gap: 4.5rem;

  h1 {
    color: #374151;
  }
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const Input = styled.input`
  display: flex;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  padding: 0.875rem 1rem;
  background-color: #e2e8f0;

  transition: all 0.2s;

  &:hover {
    border: 1px solid #90a4ae;
  }
`

export const Select = styled.select`
  display: flex;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  padding: 0.875rem 1rem;
  background-color: #e2e8f0;

  transition: all 0.2s;

  &:hover {
    border: 1px solid #90a4ae;
  }

  option {
    padding: 1rem;
  }
`

export const Button = styled.button`
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: #91D2D7;
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;

  transition: all .2s;

  &:hover {
    background-color: #7ac4c9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Copyright = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;

  p {
    font-size: 0.75rem;
    color: #374151;
  }
`