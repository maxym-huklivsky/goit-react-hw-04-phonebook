import styled from '@emotion/styled';

export const ContactItem = styled.li`
  :not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

export const ContactInfo = styled.p`
  display: inline-block;
  margin: 0 10px 0 0;
`;

export const RemoveContBtn = styled.button`
  font-size: 12px;
  background-color: transparent;
  border: 1px solid grey;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  :hover,
  :focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
