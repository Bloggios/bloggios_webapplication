import React from "react";
import styled from "styled-components";
import {bgBlackRounded} from "../../asset/svg";
import {colors} from "../../styles/Theme";
import FooterConfiguration from "../../asset/configurations/static/FooterConfiguration.json";
import {useNavigate} from "react-router-dom";

const FooterSections = () => {
  const navigate = useNavigate();
  const { data } = FooterConfiguration;

  return (
    <Wrapper>
      <InfoSection>
        <img src={bgBlackRounded} alt="Bloggios" />
        <h4>Bloggios</h4>
        <span>The power of connection, powered by Software</span>
      </InfoSection>

      <LinksSection>
        {data.map((item) => (
          <LinkArea key={item.id}>
            <Header>{item.section}</Header>
            <ul>
              {item.links.map((link) => (
                <li key={link.id} onClick={() => navigate(link.path)}>
                  {link.label}
                </li>
              ))}
            </ul>
          </LinkArea>
        ))}
      </LinksSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InfoSection = styled.div`
  width: 34%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;

  & img {
    height: 50px;
    aspect-ratio: 1/1;
  }

  & h4 {
    font-size: clamp(1rem, 0.8963rem + 0.6383vw, 1.375rem);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    letter-spacing: 1px;
    margin-top: 10px;
  }

  & span {
    font-size: clamp(0.75rem, 0.7154rem + 0.2128vw, 0.875rem);
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    letter-spacing: 1px;
    color: ${colors.white80};
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const LinksSection = styled.div`
  width: 66%;
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 10px;
  overflow-x: auto;

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const LinkArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    list-style: none;

    & li {
      font-size: clamp(0.75rem, 0.6809rem + 0.4255vw, 1rem);
      color: ${colors.white80};
      cursor: pointer;

      &:hover,
      &:active {
        color: ${colors.white100};
      }
    }
  }

`;

const Header = styled.h4`
  font-size: clamp(0.875rem, 0.8059rem + 0.4255vw, 1.125rem);
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  letter-spacing: 1px;
`;

export default FooterSections;
