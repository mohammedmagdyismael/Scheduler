import styled from 'styled-components';
import Rect from '../shimmerEffect/Rect';

export const LoadingButton = styled(Rect)`
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  background: ${props => (props.disabled ? '#f1f4f6 !important' : '#f1f4f6')};
  color: ${props => (props.disabled ? '#484848 !important' : ' #484848')};
  border-radius: 8px;
  width: fit-content;
  cursor: ${props => (props.disabled ? 'unset' : 'pointer')};
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  ${props => (props.extendButtonStyle ? props.extendButtonStyle : '')};
`;

export const ButtonText = styled.p`
  text-align: center;
  margin: 0px 5px;
`;
